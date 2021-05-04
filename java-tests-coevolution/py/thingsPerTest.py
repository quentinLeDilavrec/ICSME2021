from neo4j import GraphDatabase
import sys
import csv

class HelloWorldExample:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def print_greeting(self, message):
        with self.driver.session() as session:
            ins = session.read_transaction(self._f, message)

    @staticmethod
    def _f(tx, message):
        result = tx.run(
                        """
MATCH (a:Range)
WHERE a.qualifiedName is not null
WITH a SKIP $skip LIMIT 20000
CALL apoc.neighbors.tohop(a,"<TARGET|SOURCE>",100) YIELD node
WITH node as r, a
MATCH (:Tool {name:"RefactoringMiner"})-[]-(refact:Evolution)-[:BEFORE]->(r)
CALL apoc.path.expandConfig(a,{
        relationshipFilter:"<TARGET|SOURCE>",
        minLevel:0, maxLevel:100,
        bfs:false,
        limit:1,
        terminatorNodes:[r]
     }) YIELD path
WITH distinct a, min(length(path)) as l, refact, 
    min(size([x in nodes(path) where "Dependency" in labels(x) AND x.type="call"])) as cl, 
    [x in collect(distinct r.path) | x CONTAINS "src/test/java" ] as isTest
WITH a, collect(l) as l, collect(cl) as cl, collect(refact) as refacts, collect(isTest) as isTest
RETURN distinct a.repository as repository, a.commitId as commitId, a.qualifiedName as qual,
[x in refacts | x.type] as refacts,l, cl, isTest""",
        skip=20000*int(message))
        
        with open("thingsPerTestBatched2_"+message+".csv", 'w',newline='') as csvfile:
            writer = csv.writer(csvfile,delimiter=";",quotechar='"', quoting=csv.QUOTE_MINIMAL)
            #writer.writerow(result.keys())
            for x in result:
                writer.writerow(x)
       # return [result.keys()]+[list(x) for x in result]
    

    def compute(self,ins,dels,upds):
        r=[[]]*(max([max([x[0] for x in ins]),max([x[0] for x in dels])])+1)
        for x in ins:
            r[x[0]]=[x[1],0,0]

        for x in dels:
            if len(r[x[0]])==0:
                r[x[0]]=[0,x[1],0]
            else:
                r[x[0]][1]=x[1]

        for x in upds:
            if len(r[x[0]])==0:
                r[x[0]]=[0,0,x[1]]
            else:
                r[x[0]][2]=x[1]
        return [",".join([str(y) for y in x]) for x in r if len(x)>0]


if __name__ == "__main__":
    greeter = HelloWorldExample("bolt://localhost:6689", "neo4j", "password")
    greeter.print_greeting(sys.argv[1])
    greeter.close()

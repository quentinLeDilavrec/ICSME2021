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
WITH {`Serializing`:-4,`App compiling`:-3,`Tests compiling`:-2,`Tests execution`:-1, `false`:0} as ind
MATCH (r:Repository)
WITH distinct r.repository as repo, ind SKIP $skip LIMIT 10
MATCH (t0:Range)<-[e0:EQ_TEST]-(t1:Range),
		p=(t1)<-[:EQ_TEST*0..15]-(t2:Range),
		(t2)<-[e2:EQ_TEST]-(t3:Range)
WHERE ind[toString(t1.failWhen)]<ind[toString(t0.failWhen)] AND t0.repository = repo AND t1.repository = repo AND t2.repository = repo AND t3.repository = repo
  AND ind[toString(t2.failWhen)]<ind[toString(t0.failWhen)] //AND ((t0)-[:TARGET]-() OR (t1)-[:TARGET]-()) AND ((t2)-[:TARGET]-() OR (t3)-[:TARGET]-())
  AND ind[toString(t1.failWhen)]<ind[toString(t3.failWhen)]
  AND ind[toString(t2.failWhen)]<ind[toString(t3.failWhen)]
  AND ALL(t in nodes(p) WHERE ind[toString(t.failWhen)]<ind[toString(t0.failWhen)] AND ind[toString(t.failWhen)]<ind[toString(t3.failWhen)])
WITH distinct t0, t1, t2, t3, apoc.agg.minItems(p,length(p),1).items[0] as p
WITH distinct t0, t1, t2, t3, apoc.coll.toSet([x in nodes(p) | x.failWhen]) as broken, [x in relationships(p) | CASE WHEN properties(x).size is null THEN 1 ELSE properties(x).size+2 END] as p, [t0.commitId]+[x in nodes(p) | x.commitId]+[t3.commitId] as commitId
RETURN distinct t0.repository as repo, commitId,
t0.failWhen as before, broken, t3.failWhen as after, p""",
                skip=10*int(message))
        
        with open("delayedBatchAll_"+message+".csv", 'w',newline='') as csvfile:
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
        with open(0, 'r',newline='') as csvfile:
            reader = csv.reader(csvfile,delimiter=";",quotechar='"', quoting=csv.QUOTE_MINIMAL)
            #writer.writerow(result.keys())
            for x in reader:
                r = 0
                for y in csv.reader(x[-1][1:-1], delimiter=','):
                    for z in y:
                        if z=='' or z==" ":
                            continue
                        r+=int(z)
                print("'"+x[3]+"'","'"+x[5]+"'",r)

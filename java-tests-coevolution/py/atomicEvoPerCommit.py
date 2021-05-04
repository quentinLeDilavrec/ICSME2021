from neo4j import GraphDatabase
import sys

class HelloWorldExample:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def print_greeting(self, message):
        with self.driver.session() as session:
            ins = session.read_transaction(self._ins, message)

        with self.driver.session() as session:
            dels = session.read_transaction(self._del, message)

        with self.driver.session() as session:
            upds = session.read_transaction(self._upd, message)

        print("\n".join(self.compute(ins,dels,upds)))

    @staticmethod
    def _del(tx, message):
        result = tx.run(
                        """
MATCH (del:Evolution {type:"DEL"})-[:BEFORE]->(:Range)-[]->(f:FileSnapshot)
WITH distinct f, count(distinct del) as del
MATCH (f)-[]-(b:Commit)
WITH distinct b, sum(distinct del) as del
MATCH (b:Commit)<-[:PARENT]-(a:Commit)
WHERE a.tryAnalyze = true
RETURN distinct id(a), del"""
                        , skip=int(message))

        return [list(x) for x in result]


    @staticmethod
    def _upd(tx, message):
        result = tx.run(
                        """
MATCH (ins:Evolution {type:"UPD"})-[:AFTER]->(:Range)-[]->(f:FileSnapshot)
WITH distinct f, count(distinct ins) as ins
MATCH (f)-[]-(a:Commit)
RETURN distinct id(a), sum(distinct ins) as ins"""
                        , skip=int(message))

        return [list(x) for x in result]
    
    @staticmethod
    def _ins(tx, message):
        result = tx.run(
                        """
MATCH (ins:Evolution {type:"INS"})-[:AFTER]->(:Range)-[]->(f:FileSnapshot)
WITH distinct f, count(distinct ins) as ins
MATCH (f)-[]-(a:Commit)
RETURN distinct id(a), sum(distinct ins) as ins"""
                        , skip=int(message))

        return [list(x) for x in result]
    

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
    greeter.print_greeting(0)
    greeter.close()

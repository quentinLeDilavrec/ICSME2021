from neo4j import GraphDatabase
import sys

class HelloWorldExample:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def print_greeting(self, message):
        with self.driver.session() as session:
            greeting = session.read_transaction(self._create_and_return_greeting, message)
            print("\n".join(self.compute(greeting)))

    @staticmethod
    def _create_and_return_greeting(tx, message):
        result = tx.run(
                        """
MATCH (a:Commit)-[:PARENT]->(b:Commit)
WHERE a.tryAnalyze = true and b.tryAnalyze=true
OPTIONAL MATCH (a)-[:PARENT_RELEASE]->(x)
RETURN id(a), id(b), id(x)"""
                        , skip=int(message))
        return [list(x) for x in result]
    

    def compute(self,t):
        return [",".join([str(x) for x in r]) for r in t]
        others=[]
        releases = []
        ii = 0
        todo=[]
        for i in t:
            if i[2] is not None:
                releases.append({"start":i[0], "curr":[i[0]], "count":set(), "end":i[2]})
                todo.append(ii)
                ii=ii+1
            if i[0]>=len(others):
                others += [[]]*(i[0]-len(others)+1)
            others[i[0]].append(i[1])
        while len(todo)>0:
            new_todo=[]
            ii=0
            for i in todo:
                r = releases[i]
                curr = r["curr"]
                if r["end"] in curr:
                    continue
                new_curr = []
                for crr in curr:
                    nxt=others[crr]
                    if nxt is None or len(nxt)==0:
                        print("!!")
                        print(r)
                        continue
                    r["count"].add(crr)
                    new_curr+=nxt

                r["curr"] = list(set(new_curr)-r["count"])
                if len(new_curr)>0:
                    new_todo.append(i)
            print(releases)
            todo = list(set(new_todo))

        return [str(len(r["count"])) for r in releases]


if __name__ == "__main__":
    greeter = HelloWorldExample("bolt://localhost:6689", "neo4j", "password")
    greeter.print_greeting(0)
    greeter.close()

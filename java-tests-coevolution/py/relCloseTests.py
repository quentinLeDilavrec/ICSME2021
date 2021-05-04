from neo4j import GraphDatabase
import sys

class HelloWorldExample:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def print_greeting(self, message):
        with self.driver.session() as session:
            greeting = session.write_transaction(self._create_and_return_greeting, message)
            print("\n".join(greeting))

    @staticmethod
    def _create_and_return_greeting(tx, message):
        result = tx.run("""
        MATCH (b:Commit)<-[:PARENT]-(a:Commit),
            (bt:Range)-[:IS_RANGE_IN]-(:FileSnapshot)-[:IS_SNAPSHOT_IN]-(b),
                (at:Range)-[:IS_RANGE_IN]-(:FileSnapshot)-[:IS_SNAPSHOT_IN]-(a)
                WHERE bt.qualifiedName is not null AND at.qualifiedName is not null
                AND bt.qualifiedName = at.qualifiedName
                MERGE (bt)<-[:EQ_TEST]-(at)"""
                        , skip=int(message))
        return [",".join([str(x) for x in list(x)]) for x in result]
    

if __name__ == "__main__":
    greeter = HelloWorldExample("bolt://localhost:6689", "neo4j", "password")
    greeter.print_greeting(0)
    greeter.close()

from neo4j import GraphDatabase

class HelloWorldExample:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def print_greeting(self, message):
        with self.driver.session() as session:
            greeting = session.write_transaction(self._create_and_return_greeting, message)
            print(greeting)

    @staticmethod
    def _create_and_return_greeting(tx, message):
        result = tx.run("MATCH (r:Repository) "
                        "RETURN count(distinct r)", message=message)
        return result.single()[0]


if __name__ == "__main__":
    greeter = HelloWorldExample("bolt://localhost:6689", "neo4j", "password")
    greeter.print_greeting("hello, world")
    greeter.close()

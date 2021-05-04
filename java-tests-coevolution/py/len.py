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
WITH ["https://github.com/sbtourist/Journal.IO",
"https://github.com/pmerienne/trident-ml",
"https://github.com/twitter/hbc",
"https://github.com/neuland/jade4j",
"https://github.com/wwadge/bonecp",
"https://github.com/ocpsoft/prettytime",
"https://github.com/kevinsawicki/http-request",
"https://github.com/NanoHttpd/nanohttpd",
"https://github.com/wg/lettuce",
"https://github.com/Aconex/scrutineer",
"https://github.com/MongoLink/mongolink",
"https://github.com/DigitalPebble/storm-crawler",
"https://github.com/JSQLParser/JSqlParser",
"https://github.com/ptitfred/magrit",
"https://github.com/jsonld-java/jsonld-java",
"https://github.com/twitter/hraven",
"https://github.com/beckchr/staxon",
"https://github.com/tbuktu/ntru",
"https://github.com/tehapo/Clara",
"https://github.com/joshsh/sesametools",
"https://github.com/hoijui/JavaOSC",
"https://github.com/dimovelev/metrics-sampler",
"https://github.com/helun/Ektorp",
"https://github.com/tobyweston/simple-excel",
"https://github.com/addthis/metrics-reporter-config",
"https://github.com/jDTOBinder/jDTO-Binder",
"https://github.com/jadler-mocking/jadler",
"https://github.com/myGrid/RightField",
"https://github.com/kungfoo/geohash-java",
"https://github.com/MoriTanosuke/glacieruploader",
"https://github.com/openshift/openshift-java-client",
"https://github.com/springtestdbunit/spring-test-dbunit",
"https://github.com/ralfstx/minimal-json",
"https://github.com/sonatype/sonatype-aether",
"https://github.com/Esri/spatial-framework-for-hadoop",
"https://github.com/jericks/geometrycommands",
"https://github.com/gemserk/animation4j",
"https://github.com/alexkasko/unsafe-tools",
"https://github.com/lukas-krecan/JsonUnit",
"https://github.com/metamx/java-util",
"https://github.com/SamirTalwar/Rekord",
"https://github.com/scribble/scribble-java",
"https://github.com/lantunes/mojave",
"https://github.com/SonarSource/sonar-update-center",
"https://github.com/apache/james-mime4j",
"https://github.com/dmcg/okey-doke",
"https://github.com/d-plaindoux/suitcase",
"https://github.com/treasure-data/td-client-java",
"https://github.com/calrissian/mango"] as repos,
        {`Serializing`:-4,`App compiling`:-3,`Tests compiling`:-2,`Tests execution`:-1, `false`:0} as ind, 0 as lev, 0 as screw
        MATCH (fe:Evolution)-[]-(fi:Impact)-[fimp:IMPACT]-(r:Range)-[rimp:IMPACT]-(ri:Impact)-[]-(re:Evolution)
        WHERE ind[coalesce(fimp.failWhen,"false")] < ind[toString(r.failWhen)] AND ind[coalesce(fimp.failWhen,"false")] < ind[coalesce(rimp.failWhen,"false")]
        WITH distinct r, fi, ri, apoc.coll.toSet(collect(distinct fe)) as fe, apoc.coll.toSet(collect(distinct re)) as re// LIMIT 100
        WITH distinct r, fi, ri, apoc.coll.sortNodes(fe,"hash") as fe, apoc.coll.sortNodes(re,"hash") as re, [x IN fe WHERE NOT x IN re] as left, apoc.coll.intersection(fe,re) as both, apoc.coll.union(fe,re) as uni
        WHERE size(left)=0 AND size(uni)>=2 AND size(both)>0
        WITH distinct fe,re,r SKIP 2 LIMIT 1
        WITH r, fe, re, [x in fe WHERE (x)-[]-(:Tool {name:"RefactoringMiner"})] as fr, [x in re WHERE (x)-[]-(:Tool {name:"RefactoringMiner"})] as rr
        WITH r as t, apoc.coll.toSet(fr+rr) as refs
        UNWIND refs as ref
        MATCH (:Tool {name:"RefactoringMiner"})-[]-(ref:Evolution)-[:BEFORE]->(r)
        CALL apoc.path.expandConfig(t,{
                relationshipFilter:"<TARGET|SOURCE>",
                    minLevel:0, maxLevel:100,
                        bfs:false,
                            limit:1,
                                terminatorNodes:[r]
                                }) YIELD path
        WITH r,ref, min(length(path)) as l
        RETURN l""",
                skip=10*int(message))
        
        with open("lenBatch_"+message+".csv", 'w',newline='') as csvfile:
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

WITH $data as data
UNWIND data as initTest

MERGE (r:Range {range:[toInteger(initTest.start),toInteger(initTest.end)], start:toInteger(initTest.start), end:toInteger(initTest.end), 
                path:initTest.file, repository:initTest.repository, commitId:initTest.commitId})
ON MATCH SET r.isTest = true, r.failureLog = initTest.report.what, r.failWhen = COALESCE(initTest.report.`when`, false), r.failWhere = initTest.report.`where`
ON CREATE SET r.isTest = true, r.failureLog = initTest.report.what, r.failWhen = COALESCE(initTest.report.`when`, false), r.failWhere = initTest.report.`where`
RETURN ID(r)
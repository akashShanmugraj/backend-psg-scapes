CREATE KEYSPACE c22z2 WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3}

CREATE TABLE cr19z101 ( rollNumber text, totalPercentage int, classesPresent int, totalClassesHeld int, classesExempted int, classesMedicallyExempted int, ABclassStamps list<text>, PRIMARY KEY (rollNumber));

CREATE TABLE cr19z102 ( rollNumber text, totalPercentage int, classesPresent int, totalClassesHeld int, classesExempted int, classesMedicallyExempted int, ABclassStamps list<text>, PRIMARY KEY (rollNumber));

CREATE TABLE cr19z103 ( rollNumber text, totalPercentage int, classesPresent int, totalClassesHeld int, classesExempted int, classesMedicallyExempted int, ABclassStamps list<text>, PRIMARY KEY (rollNumber));

CREATE TABLE cr19g105 ( rollNumber text, totalPercentage int, classesPresent int, totalClassesHeld int, classesExempted int, classesMedicallyExempted int, ABclassStamps list<text>, PRIMARY KEY (rollNumber));

CREATE TABLE schedule ( days text, p1 text, p2 text, p3 text, p4 text, p5 text, p6 text, p7 text, p8 text, p9 text, p10 text, PRIMARY KEY(days));

CREATE TABLE schedule ( userID text, name text, department text, role text, keyspaceAccess list<text>, PRIMARY KEY(userID));

CREATE KEYSPACE systeminfo WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2}

CREATE TABLE userinfo ( userID text, name text, department text, role text, emailaddress text, password text, keyspaceAccess list<text>, PRIMARY KEY(userID));

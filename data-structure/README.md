# Data Structure for PSG Scapes
### in Apache Cassandra


## Centralized Structure
Every department is a keyspace like *department_cse*, *department_ece*. A keyspace is analogous to a `database` in RDBMS.

In *department_cse*, each class code is a table. Class code is derived from first 4 charcters of a students roll number in the class, like below

| Class   | Rollnumber Prefix | Table Name|
|---------|-------------------|-----------|
|CSE-G1|*22Z2-(XX)*|`c22z2`|
|CSE-G2|*22Z3-(XX)*|`c22z3`|
|CSE-AIML|*22N2-(XX)*|`c22n2`|

In each class table, rollnumber stands as primary key and has course codes with prefix 'CR' as columns

For table `c22z2`,

| Roll Number | CR19Z101 | CR19Z102 | CR19G105 | ... |
|-------------|----------|----------|----------|----|
|'22z201'|<cell_structure>|<cell_structure>|<cell_structure>|...|
|'22z202'|<cell_structure>|<cell_structure>|<cell_structure>|...|
|'22z203'|<cell_structure>|<cell_structure>|<cell_structure>|...|
|...|...|...|...|...|

Students get `SELECT` access on this whole keyspace and Professors get access 

A `<cell_structure>` is a pre-determined datatype which is a array of attendace related paticulars for a student for that course.
It is defined as below:

`<cell_structure> = [totalPercentage, classesPresent, totalClassesHeld, classesExempted, classesMedicallyExempted, <ABclassStamp>, <ABclassStamp>, <ABclassStamp>, ...]`

`<ABclassStamp>` is also a pre-determined datatype for  identifying all classes the student was not present

`<ABclassStamp>` = N-DD-MM-YYYY

*where N stands for nth class*

## DeCentralized Structure
Each class in a department is a keyspace, analogous to database in RDBMS
| Class   | Rollnumber Prefix | Keyspace Name|
|---------|-------------------|--------------|
|CSE-G1   |*22Z2-(XX)*        |`c22z2`       |
|CSE-G2   |*22Z3-(XX)*        |`c22z3`       |
|CSE-AIML |*22N2-(XX)*        |`c22n2`       |

In keyspace `c22z2`, every course taken is a table.

Consider the course *19Z104 - Problem Solving and Python Programing* given to `c22z2`.
In the table `cr19z104`,

| Roll Number | totalPercentage |classesPresent | totalClassesHeld | classesExempted | classesMedicallyExempted| ABclassStamps |
|-------------|-----------------|---------------|------------------|-----------------|-------------------------|--------------|
|'22z201'     |100              |34             |34                |0                |0                        |[]            |
|'22z202'     |88               |30             |34                |0                |0                        |['2-02-01-2023','1-11-01-2023']             |
|'22z203'     |94               |30             |34                |1                |1                        |[]            |
|...          |...              |...            |...               |...              |...                      |...           |


`<ABclassStamps>` is a pre-determined datatype for identifying all classes the student was not present

`<ABclassStamp> = [<N-DD-MM-YYYY>, ..]`

*where N stands for nth class on that day*

Apart from each coursetable, an additional `schedule` table exists, which contains information regarding the latest time-schedule for a class.

| Period | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|--------|---|---|---|---|---|---|---|---|---|----|----|
|time    |X-Y|X-Y|X-Y|X-Y|X-Y|X-Y|X-Y|X-Y|X-Y|X-Y |X-Y |
|Monday  |LIB|19Z101|LIB|19G105|19Z103|19Z102|19Z104| | | | |
|Tuesday |19Z102|19G105|LIB|19Z104|19Z112|19Z112|19Z112|19Z112| | | |
|...|...|...|...|...|...|...|...|...|...|...|...|

## systeminfo Structure
The `systeminfo` keyspace is the core container which stores important admin information like privileges, credentials etc

A `userinfo` table lists personal information and the privileges of the user briefly.
|User|Name|Department|Role|Keyspace Access                       |
|----|----|----------|----|--------------------------------------|
|p2316|Murugananthan M|Chemistry|Professor|['22Z2', '22N2', '21C3', '20P1', ... ]|
|s22z255|S Akash|Computer Science and Engineering|Student|[]|

A `usercredential` which contains usernames and passwords for authentication. To reduce time in production, this table can be forked from existing credential table too.
|username|email|password|
|----|----|----------|
|p2316|murugananthanm@psgtech.ac.in|**********|
|s22z255|22z255@psgtech.ac.in|*********************|

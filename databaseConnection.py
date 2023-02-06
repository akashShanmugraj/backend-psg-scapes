import mysql.connector
# database = mysql.connector.connect(host= 'sql.freedb.tech', port= 3306, username= 'freedb_devakash', password= 'V$H2zMgtBR*zqVa', database = 'freedb_psg-scapes')
# cursor = database.cursor()


class Attendance:
    def __init__(self, classCode, user, password):
        self.classCode = classCode
        self.database = mysql.connector.connect(host='localhost', port=3306, username=user,
                                           password=password, database = f'c{classCode}')
        self.cursor = self.database.cursor()

    def getAttendance(self, courseCode,defaulters = False, rollNumber = None):
        self.database.connect()

        executableQuery = ''
        if not defaulters and not rollNumber:
            executableQuery = f'SELECT * FROM cr{courseCode};'
        elif not defaulters and rollNumber:
            executableQuery = f'SELECT * FROM cr{courseCode} WHERE rollNumber = {rollNumber}'
        elif not rollNumber and defaulters:
            executableQuery = f'SELECT * FROM cr{courseCode} WHERE totalPercentage < 75'
        else:
            return -1

        self.cursor.execute(executableQuery)
        self.database.close()

        return self.database.fetchall() #TODO: Output Parser might be required

    def punchAttendace(self, rollNumber, hourStamps):
        self.database.connect()

        # Ensure that hourStamps has the datastructure [<classStamp>, <courseCode>, <presenceBoolean>]
        for hour in hourStamps:
            classStamp, courseCode, presenceBoolean = hour

            # Fetching old values for updation
            self.cursor.execute(f'SELECT * FROM c{self.classCode}.cr{courseCode} WHERE rollnumber = {rollNumber};')

            # Unpacking parameters from known nested data variables
            RollNumber, totalPercentage, classesPresent, totalClassesHeld, classesExempted, classesMedicallyExempted, ABclassStamps = \
            self.cursor.fetchall()[0]


            # Comparing presenceBoolean for determining attendance action
            if presenceBoolean:
                classesPresent += 1

            elif not presenceBoolean:
                ABclassStamps.append(classStamp)
            totalClassesHeld += 1

            # Pushing updates to data source
            totalPercentage = int((classesPresent+classesExempted+classesMedicallyExempted)/totalClassesHeld)
            self.cursor.execute(f'UPDATE c{self.classCode}.cr{courseCode} SET totalPercentage = {totalPercentage}, classesPresent = {classesPresent}, classesExempted = {classesExempted}, classesMedicallyExempted = {classesMedicallyExempted}, ABclassStamps = {ABclassStamps}')
            self.database.close()
            return 1

    def grantAttendanceMOD(self, rollNumber, courseCode, absentClassStamp,  isExemption = False, isMedExemption = False):
        self.database.connect()

        # Unpacking parameters from known nested data variables
        self.cursor.execute(f'SELECT * FROM c{self.classCode}.cr{courseCode} WHERE rollnumber = {rollNumber};')
        RollNumber, totalPercentage, classesPresent, totalClassesHeld, classesExempted, classesMedicallyExempted, ABclassStamps = cursor.fetchall()[0]

        for classes in absentClassStamp:
            ABclassStamps.remove(classes)

        if isExemption and not isMedExemption:
            classesExempted += 1
        elif isMedExemption and not isExemption:
            classesMedicallyExempted += 1
        elif not isExemption and not isMedExemption:
            classesPresent += len(absentClassStamp)
        else:
            raise SystemError('Cannot account for both medical and non-medical exemption at the same time')

        totalPercentage = int((classesPresent+classesExempted+classesMedicallyExempted)/totalPercentage)

        self.cursor.execute(f'UPDATE c{self.classCode}.cr{courseCode} SET totalPercentage = {totalPercentage}, classesPresent = {classesPresent}, classesExempted = {classesExempted}, classesMedicallyExempted = {classesMedicallyExempted}, ABclassStamps = {ABclassStamps}')
        self.database.close()

        return 1


# display a NOTE to user while uploading to ensure that API call follows the below structure


apiGET = '''Period, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
time,X-Y,X-Y,X-Y,X-Y,X-Y,X-Y,X-Y,X-Y,X-Y,X-Y,X-Y
Monday,LIB,19Z101,19Z103,19G105,19Z104,19Z102,LIB, , , , '''

# apiGET = ''


class Parser:
    def inputParser(self, parsableInput) -> list:
        # give self.apiGET as argument
        self.csvinputLines = []
        self.inputLines = parsableInput.split('\n')
        for line in self.inputLines[1:]:
            tempList = line.split(',')
            self.csvinputLines.append(tempList)
        return self.csvinputLines
    
    def constructQuery(self, classCode, parsedCSV):        
        self.queryList = []
        self.queryTemplate = f"INSERT INTO {classCode} ('Period', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11') VALUES("
        for row in parsedCSV:
            query = self.queryTemplate
            for cell in row:
                query += f"'{cell}',"
            query = query[:-1] + ');'
            self.queryList.append(query)
        return (self.queryList)


processedInput = Parser.inputParser(Parser, apiGET)
outPut = Parser.constructQuery(Parser, '22z255', processedInput)
print(outPut)

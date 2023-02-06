from flask import Flask,request
import mysql.connector as mysql

app = Flask(__name__)
db = mysql.connect(host= 'sql.freedb.tech', port= 3306, username= 'freedb_devakash', password= 'V$H2zMgtBR*zqVa', database = 'freedb_psg-scapes')
cursor = db.cursor()
db.connect()

@app.route('/')
def hello_world():
    return 'Nothing is found here. Kindly redirect to /parser route to access the parser'

@app.route('/square', methods = ['POST'])
def square():
    v = request.get_data().decode().replace("'", "")
    vv = str(int(v)**2)
    return vv

@app.route('/<int:number>/')
def num(number):
    return str(number**2)

@app.route('/desctable', methods = ['POST'])
def getTableDESC():
    tableName = request.get_data().decode().replace("'", "")
    cursor.execute(f'DESCRIBE c{tableName}')
    output = cursor.fetchall()
    return output

@app.route('/getalltable', methods = ['POST'])
def getTableSELECT():
    tableName = request.get_data().decode().replace("'", "")
    cursor.execute(f'SELECT * FROM c{tableName};')
    output = cursor.fetchall()
    return output


# @app.route('/csvtocql', methods = ['POST'])
# def parseCSV():
#     csvInput = request.get_data().decode().replace("'", "")
#     # return csvInput
#     # pasringclass = Parser

#     out = Parser.inputParser(Parser, csvInput)
#     return out

if __name__ == '__main__':
    app.run(debug=True, port = 5000, host = '0.0.0.0')

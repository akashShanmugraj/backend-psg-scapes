from flask import Flask,request

app = Flask(__name__)

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

# @app.route('/csvtocql', methods = ['POST'])
# def parseCSV():
#     csvInput = request.get_data().decode().replace("'", "")
#     # return csvInput
#     # pasringclass = Parser

#     out = Parser.inputParser(Parser, csvInput)
#     return out

if __name__ == '__main__':
    app.run(debug=True, port = 5000, host = '0.0.0.0')

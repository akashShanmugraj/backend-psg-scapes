class Attendance:
    def __init__(self):
        print('init')
    def sum(self,a,b):
        print(a+b)

attCl = Attendance
attCl.sum(Attendance,10, 20)
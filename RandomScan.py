import random as rn
import time as t
th = 0.1
while True:
    x = rn.random()
    if x < th:
        print(th)
        print("Start Scan")
        break
    else:
        print("Not starting")
        t.sleep(1)
        th += 0.1

x = rn.random(1,15)
y = rn.random(15,30)
z = rn.random(30,45)

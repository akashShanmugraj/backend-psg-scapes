from datetime import datetime

sysdate = str(datetime.now().date())

print('Assuming name of the logfile to be "system.log"')

logfile = open("system.log")
logs = logfile.readlines()

queryAudits = []
otherAudits = []

for entry in logs:
    if "INFO" in entry:
        if "devakash" in entry: # other developing user-roles will be added once available
            queryAudits.append(entry)
        elif "[Native-Transport-Requests-1]" in entry:
            otherAudits.append(entry)
    else:
        otherAudits.append(entry)

allAudits = queryAudits + otherAudits
outFile = open(f"{sysdate}.log", "w")
outFile.writelines(allAudits)
print(f"Log file formatted and exported as {sysdate}.log")

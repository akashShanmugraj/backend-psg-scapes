
# Audit Logging Parser

Simple tool build in Python to parse log files from Apache Cassandra.

This tool prioritizes user activities (*currently only user role being `devakash`*) and either excludes or re-orders other types of logs.

It does not exclude essential logs like *WARN* which is crucial during times of debugging.

Future versions would facilitate improved input of log files by user and offer a better way storing log files on a day-to-day basis 


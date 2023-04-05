import app from './server.js'
import mongodb from "mongodb"
import Attedance from "./server/attendance.js"

const MongoClient = mongodb.MongoClient
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"

const port = 2023

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await Attedance.injectDB(client)
        app.listen(port, () => {
            console.log("listening on port 8000")
        })
    } )
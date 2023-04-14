import app from './server.js'
import mongodb from "mongodb"
import authentication from "./auth/auth.js"

const MongoClient = mongodb.MongoClient
const uri = "mongodb://127.0.0.1:27017/test"

const port = 8000

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
        await authentication.injectConnection(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    } )
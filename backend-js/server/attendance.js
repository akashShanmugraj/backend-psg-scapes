import mongodb from "mongodb"
const ObjectID = mongodb.ObjectID

let database

export default class Attendance {
    static async injectDB(conn) {
        if (database) {
            return
        }

        try {
            database = await conn.db("c22z2").collection("timetable")
        } catch (e) {
            console.error(`Unable to establish connection, ref: ${e}`)
        }
    }

    static async getAllAttendance() {
        try {
            const timetableData = await database.find({})
            return timetableData.toArray()
        } catch (e) {
            console.error("Unable to get attendance")
            return {error: e}
        }
    }
    static async getDayAttendance(day) {
        try {
            const timetableDataOneDay = await database.find({day: day})
            return timetableDataOneDay
        } catch (e) {
            console.error(e)

        }
    }
}
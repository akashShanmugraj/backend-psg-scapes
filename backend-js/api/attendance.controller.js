import Attendance from "../server/attendance.js";

export default class AttendanceController {
    static async apiGetOneAttendance(req, res, next) {
        try {
            let day = req.params.day
            let timeTableData = await Attendance.getDayAttendance(day)
            if (!timeTableData) {
                res.status(404).json({error: "Invalid Parameter"})
                return
            }
            res.json(timeTableData)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: e})
        }
    }
    static async apiGetAllAttendance(req, res, next) {
        try {
            let timeTableData = await Attendance.getAllAttendance()
            if (!timeTableData) {
                res.status(404).json({error: "Unknown error, refer console"})
                return
            }
            res.json(timeTableData)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: e})
        }
    }
}
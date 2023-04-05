import express from "express"
import AttendanceControl from './attendance.controller.js'

const router = express.Router()

router.route("/c22z2/all").get(AttendanceControl.apiGetAllAttendance)
router.route("/c22z2/:day").get(AttendanceControl.apiGetOneAttendance)
router.route("/").get((req, res) => res.send("this is psg-scapes api"))

export default router
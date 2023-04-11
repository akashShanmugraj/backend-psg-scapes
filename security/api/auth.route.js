import express from "express"
import AuthControl from './auth.controller.js'

const router = express.Router()

router.route("/").get((req, res) => res.send("this is psg-scapes api"))
router.route("/users").get(AuthControl.apiGetAllUsers)
router.route("/users/byrollnumber").post(AuthControl.apiGetOneUserbyRollnumber)

export default router
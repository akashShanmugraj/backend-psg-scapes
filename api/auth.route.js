import express from "express"
import AuthControl from './auth.controller.js'
import tokenManager from "../auth/tokens.js"

const router = express.Router()

router.route("/").get((req, res) => res.send("this is psg-scapes api"))
router.route("/users").get(AuthControl.apiGetAllUsers)
router.route("/users/byrollnumber").post(AuthControl.apiGetOneUserbyRollnumber)
router.route("/auth/login").post(tokenManager.loginToken)
router.route("/auth/renew").post(tokenManager.generateToken)
router.route("/auth/help").get(tokenManager.authHelp)
router.route('/auth/verify/text').post(tokenManager.verifyText)

export default router
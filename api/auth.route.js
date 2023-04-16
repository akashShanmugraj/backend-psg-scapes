import express from "express";
import AuthControl from './auth.controller.js';
import tokenManager from "../auth/tokens.js";


const router = express.Router()

router.route("/").post((req, res) => {res.send("this is psg-scapes api")})
router.route("/test").get((req, res) => {
    const requestObject = {
        "req.app": req.app,
        "req.baseurl":req.baseUrl,
        "req.body": req.body,
        "req.cookie": req.cookie,
        "req.hostname":req.hostname,
        "req.ipv6":req.ipv6,
        "req.params":req.params,
        "req.path": req.path,
        "req.protocol": req.protocol,
        "req.query":req.query,
        "req.route":req.route,
        "req.tlsInsecure":req.tlsInsecure,
        "req.auth":req.auth
    }

    res.send(requestObject)
})
router.route("/users").get(tokenManager.verifyToken, AuthControl.apiGetAllUsers)
router.route("/users/byrollnumber").post(AuthControl.apiGetOneUserbyRollnumber)
router.route("/auth/login").post(tokenManager.loginToken)
router.route("/auth/renew").post(tokenManager.generateToken)
router.route("/auth/help").get((req,res) => res.sendfile('authhelp.html'))
router.route('/auth/verify/text').post(tokenManager.verifyText)

export default router
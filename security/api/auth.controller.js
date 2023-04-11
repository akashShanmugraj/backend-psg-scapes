import authentication from "../auth/auth.js";

export default class AuthenticationController{
    static async apiGetAllUsers(req, res, next) {
        try {
            res.json(await authentication.getAllUsers())
        } catch (e) {
            console.error(e)
        }
    }

    static async apiGetOneUserbyRollnumber(req, res, next) {
        try {
            res.json(await authentication.getOneUserbyRollnumber(req.body.rollnum))
        } catch (e) {
            console.error(e)
        }
    }
}
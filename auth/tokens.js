import jwt from 'jsonwebtoken';
import authentication from './auth.js';
import encryption from './encrypt.js';

export default class tokenManager {
    static async generateToken(req, res, next) {
        try {
            const rollnumber = req.headers.rollnumber
            const oldToken = req.headers.token
            const encryptedauthenticationText = req.headers.auth

            const userData = await authentication.getOneUserbyRollnumber(rollnumber)
            const password = await userData[0]['password']
            const authenticationText = await encryption.decrypt(encryptedauthenticationText, password)
            console.log(`oldToken is ${oldToken} \n oldToken from authtext is ${authenticationText['token']}`)
            if ( authenticationText['token'] === oldToken ) {
                const newToken = jwt.sign({"rollnumber": rollnumber}, 
                password, 
                {expiresIn:'1m'}
                )
                
                const encryptedAuthenticationText = await encryption.encrypt(
                    JSON.stringify({"rollnumber": rollnumber, "token":newToken}), 
                    userData[0]['password']
                    )
                
                res.send({"token":newToken, 'authenticationText':encryptedAuthenticationText, "info": 'New token expires in 1 minute'})

            } 
            else {
                res.status(400).send('Mismatching tokens')
            }
        } catch (e) {
            console.error(e)
        }
    }

    static async loginToken(req, res, next) {
        try {
            const tutorcode = req.headers.tutorcode
            const rollnumber = req.headers.rollnumber
            const password = req.headers.password
            const actualtutorcode = await authentication.getTutorCode()
            const userData = await authentication.getOneUserbyRollnumber(rollnumber)

            // const authenticationText = JSON.stringify({"rollnumber": rollnum, "token":newToken})
            if (tutorcode === actualtutorcode && password === userData[0]["password"]) {

                const newToken = jwt.sign({"rollnumber":userData[0]['rollnumber']}, 
                    userData[0]['password'],
                    {expiresIn:'1m'}
                )

                const encryptedAuthenticationText = await encryption.encrypt(
                    JSON.stringify({"rollnumber": rollnumber, "token":newToken}), 
                    userData[0]['password']
                    )
                res.send({"token":newToken, 'authenticationText':encryptedAuthenticationText, 'info': 'New Token expires in 1 minute'})
            }
            else {
                if (tutorcode !== actualtutorcode) {
                    res.send('Invalid Tutor Code').status(400) 
                }
                else {
                    res.send('Invalid Password').status(400) 
                }
                
            }
        } catch (e) {
            console.error(e)
        }
    }

    static async authHelp(req, res, next) {
        res.sendFile('C:/Users/akash/Documents/experimental-backend-psg-scapes/security/backend-psg-scapes/auth/authhelp.html')
    }

    static async verifyText(req, res, next) {
        const authText = req.headers.auth
        const password = req.headers.password
        let decryptedObject = await encryption.decrypt(authText, password)
        res.send(JSON.stringify(decryptedObject))
    }

    static async verifyToken(req, res, next) {
        const token = req.headers.token
        const rollnumber = req.headers.rollnumber
        const userData = await authentication.getOneUserbyRollnumber(rollnumber)
        const password = await userData[0]['password']
        try {
            jwt.verify(token, password)
            console.log('verified')
        } catch (e) {
            if (e.name === 'JsonWebTokenError') {
                res.status(403).send('invalid-token')
            }
            else if (e.name === 'TokenExpiredError') {
                res.status(498).send('expired-token')
            }
            else {
                console.log(e)
            }
        }

    }
}
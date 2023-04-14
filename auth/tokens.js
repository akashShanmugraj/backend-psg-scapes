import jwt from 'jsonwebtoken';
import authentication from './auth.js';
import encryption from './encrypt.js';

export default class tokenManager {
    static async generateToken(req, res, next) {
        try {
            const rollnumber = req.body.rollnumber
            const password = await authentication.getOneUserbyRollnumber(rollnumber)[0]['password']
            const oldToken = req.headers.token
            const encryptedauthenticationText = req.headers.auth
            const authenticationText = await encryption.decrypt(encryptedauthenticationText, password)
            if ( authenticationText['token'] === oldToken ) {
                const newToken = jwt.sign({"rollnumber": rollnumber}, 
                password, 
                {expiresIn:'2h'}
                )
                
                const encryptedAuthenticationText = await encryption.encrypt(
                    JSON.stringify({"rollnumber": rollnum, "token":newToken}), 
                    userData[0]['password']
                    )
                
                res.send({"token":newToken, 'authenticationText':encryptedAuthenticationText})

            } 
        } catch (e) {
            console.error(e)
        }
    }

    static async loginToken(req, res, next) {
        try {
            const tutorcode = req.headers.tutorcode
            const rollnumber = req.headers.rollnum
            const password = req.headers.password
            const actualtutorcode = await authentication.getTutorCode()
            console.log(actualtutorcode)
            console.log(tutorcode)
            console.log(rollnumber)
            const userData = await authentication.getOneUserbyRollnumber(rollnumber)

            // const authenticationText = JSON.stringify({"rollnumber": rollnum, "token":newToken})
            if (tutorcode === actualtutorcode && password === userData[0]["password"]) {
                console.log(userData[0]['rollnumber'])
                console.log(`Retrieved user data was ${userData[0]["_id"]}\n\n`)

                const newToken = jwt.sign({"rollnumber":userData[0]['rollnumber']}, 
                    userData[0]['password'],
                    {expiresIn:'2h'}
                )

                const encryptedAuthenticationText = await encryption.encrypt(
                    JSON.stringify({"rollnumber": rollnumber, "token":newToken}), 
                    userData[0]['password']
                    )
                res.send({"token":newToken, 'authenticationText':encryptedAuthenticationText})
            }
            else {
                res.send('Invalid Tutor Code').status(400)
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

        return encryption.decrypt(authText, password)
    }
}
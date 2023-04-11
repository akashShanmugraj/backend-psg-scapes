let authConnection

export default class authentication {
    static async injectConnection(connectionObject) {
        try {
            authConnection = await connectionObject.db('auth-token').collection('users')
        } catch (e) {
            console.error(e)
        }

    }

    static async getAllUsers(){
        try {
            const userdata = await authConnection.find({})
            return userdata.toArray()
        } catch (e) {
            console.error(e)
        }

    }
    
    static async getOneUserbyRollnumber(rollnum) {
        try {
            const userdata = await authConnection.find({rollnumber:rollnum})
            return userdata.toArray()
        } catch (e) {
            console.error(e)
        }       

    }
}
let authConnection

export default class authentication {
    static async injectConnection(connectionObject) {
        try {
            authConnection = await connectionObject
        } catch (e) {
                console.error(e)
        }

    }

    static async getAllUsers(){
        try {
            const userdata = await authConnection.db('admin').collection('users').find({})
            return userdata.toArray()
        } catch (e) {
            console.error(e)
        }

    }
    
    static async getOneUserbyRollnumber(rollnum) {
        try {
            const userdata = await authConnection.db('admin').collection('users').find({rollnumber:rollnum})
            return userdata.toArray()
        } catch (e) {
            console.error(e)
        }       

    }

    // ! has error in fetching data
    static async getTutorCode() {
        try {
            const userdata = await authConnection.db('admin').collection('info').find({})
            return "1122"
        } catch (e) {
            console.error(e)
        }
    }
}
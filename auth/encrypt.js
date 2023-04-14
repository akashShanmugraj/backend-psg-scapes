import { createCipheriv, randomBytes, createDecipheriv, createHash } from 'crypto';
/// Cipher
const message = '{"username":"akash0shanmugaraj", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIyejI1NSIsImlhdCI6MTY4MTQ0MjcyOSwiZXhwIjoxNjgxNDQyNzg5fQ._EAltOCmQw1eDo9gPvs_GTAn2my17eOfLmGdOc8blz4"}'

const key = randomBytes(32);
const iv = randomBytes(16);
const initialVector = Buffer.alloc(16, 252);

/// Encrypt
class encryption {

    static async encrypt(datatoencrypt,encryptionkey){
        // TODO: passwords stored in the database must already be hashed with sha256
        // const hashencryptionkey =  createHash('sha256').update(String(encryptionkey)).digest('base64').substr(0, 32);
        console.log(`Password ${encryptionkey}`)
        
        const cipher = createCipheriv('aes256', encryptionkey, initialVector);
        const encryptedMessage = cipher.update(datatoencrypt, 'utf8', 'hex') + cipher.final('hex');
        return encryptedMessage
    }

    static async decrypt(datatodecrypt,encryptionkey){
        // TODO: passwords stored in the database must already be hashed with sha256
        console.log(`Password ${encryptionkey}`)
        
        const decipher = createDecipheriv('aes256', encryptionkey, initialVector);
        const decryptedMessage = decipher.update(datatodecrypt, 'hex', 'utf-8') + decipher.final('utf8');
        return decryptedMessage;
    }

    static async generateRandomBytes(length) {
        return randomBytes(length)
    }
}

export default encryption
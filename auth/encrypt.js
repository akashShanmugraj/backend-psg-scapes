import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
/// Cipher
const message = '{"username":"akash0shanmugaraj", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIyejI1NSIsImlhdCI6MTY4MTQ0MjcyOSwiZXhwIjoxNjgxNDQyNzg5fQ._EAltOCmQw1eDo9gPvs_GTAn2my17eOfLmGdOc8blz4"}'

const key = randomBytes(32);
const iv = randomBytes(16);

const cipher = createCipheriv('aes256', key, iv);

/// Encrypt

const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
console.log(`Encrypted: ${encryptedMessage}`);

/// Decrypt

const decipher = createDecipheriv('aes256', key, iv);
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');
console.log(`Deciphered: ${JSON.parse(decryptedMessage)}`);
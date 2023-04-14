import { createCipheriv, randomBytes, createDecipheriv, createHash } from 'crypto';
/// Cipher
const message = '{"username":"akash0shanmugaraj", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIyejI1NSIsImlhdCI6MTY4MTQ0MjcyOSwiZXhwIjoxNjgxNDQyNzg5fQ._EAltOCmQw1eDo9gPvs_GTAn2my17eOfLmGdOc8blz4"}'

const password = '07NOV04'
let key_in_bytes = createHash('sha256').update(password).digest('base64').substr(0, 32);
const iv = randomBytes(16);

// const cipher = createCipheriv('aes256', key_in_bytes, iv);

/// Encrypt

// const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
// console.log(`Encrypted: ${encryptedMessage}`);

const newmessage = "95b232c9507aa7eed7d3643545fdc15f8536abc26a9835d8f8c757566c294bc23b0eb7adff8b2d715a442710429d9f581419411254c2789a8bca408c58c791731b672e6e44bcf0f8e09eb40bc34ae33abb42f20094680bef36f4ef97382da462892caa0667c41328b4274778fe78cbc6be77a343cdc5135e824fe06d1e0d4ee7967d22171e39af4d416e88026037d4c58c6ccc4370838ad1f35900318bbb7c266060b901c2a44c116fa3299b6161d0fe9a1a89ad9821df95f8c35401a736e2a4"
const newKey = "e8mMH5EqhKliqu8+5hUtZq38Q09mx3s6"
/// Decrypt
// key_in_bytes = createHash('sha256').update(password).digest('base64').substr(0, 32);

const decipher = createDecipheriv('aes256', newKey, Buffer.alloc(16, 252));
const decryptedMessage = decipher.update(newKey, 'hex', 'utf-8') + decipher.final('utf8');
console.log(`Deciphered: ${decryptedMessage}`);
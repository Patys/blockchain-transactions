const secp256k1 = require('secp256k1');
const crypto = require('crypto');

const generateWallet = () => {
  // generate privateKey
  let privateKey
  do {
    privateKey = crypto.randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey))

  // generate publicKey
  const publicKey = secp256k1.publicKeyCreate(privateKey);

  console.log('Generated keys: \nPublic key: ', publicKey.toString('hex'), '\nPrivate key: ', privateKey.toString('hex'))
  return { publicKey: publicKey.toString('hex'), privateKey: privateKey.toString('hex') };
}

const sign = (data, privateKey) => {
  const hashedData = crypto.createHash('sha256').update(JSON.stringify(data)).digest().toString('hex')
  const signedMsg = secp256k1.sign(Buffer.from(hashedData, 'hex'), Buffer.from(privateKey, 'hex'));

  if (signedMsg) {
    return signedMsg.signature.toString('hex');
  } else {
    console.error('Cannot sign');
    return null;
  }
}

const verify = (data, signature, publicKey) => {
  return secp256k1.verify(Buffer.from(data, 'hex'), Buffer.from(signature, 'hex'), Buffer.from(publicKey, 'hex'));
}

const randomHash = () => {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
  generateWallet,
  sign,
  verify,
  randomHash
}

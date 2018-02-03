const crypto = require('crypto');
const cryptoHelper = require('./cryptoHelper')

class Transaction {
  construct() {
    this.id = null // as a hash
    this.hash = null // hash
    this.sign = null
    this.data = null // transaction
  }

  calculateHash() {
    const data = this.id + this.sign + this.type + JSON.stringify(this.data)
    return crypto.createHash('sha256').update(data).digest().toString('hex')
  }

  isValid() {
    if(!this.id || !this.hash || !this.sign || !this.data)  {
      console.error('Missing data')
      return false
    }
    if(this.hash !== this.calculateHash()) {
      console.log('Wrong hash')
      return false
    }

    const data = crypto.createHash('sha256').update(JSON.stringify(this.data)).digest().toString('hex')
    if(!cryptoHelper.verify(data, this.sign, this.data.from)) return false
    return true
  }
}

module.exports = Transaction

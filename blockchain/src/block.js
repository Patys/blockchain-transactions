const crypto = require('crypto');
class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.data = flatten([data])
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    const data = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce
    return crypto.createHash('sha256').update(data).digest().toString('hex')
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join('0')) {
      this.nonce += 1
      this.hash = this.calculateHash()
    }
    console.log('Blocked ', this.index, ' mined: ', this.hash)
  }
}

module.exports = Block

const flatten = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);

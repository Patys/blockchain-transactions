const CryptoJS = require("crypto-js")

class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.data = data
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return CryptoJS.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
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

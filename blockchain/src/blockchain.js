const Block = require('./block');

class Blockchain {
  constructor() {
    this.blockchain = []
    this.blockchain.push(this.generateGenesisBlock())
    this.difficulty = 4
  }

  generateGenesisBlock() {
    return new Block(0, '0', new Date().toISOString(), { info: 'Genesis Block' })
  }

  addBlock(data) {
    const previousHash = this.getLatestBlock().hash
    const index = this.blockchain.length
    const timestamp = new Date().toISOString()
    const newBlock = new Block(index, previousHash, timestamp, data)
    newBlock.mineBlock(this.difficulty)

    if (this.isValidBlock(newBlock, this.getLatestBlock())) {
      this.blockchain.push(newBlock)
    } else console.error('invalid block!')
  }

  isValidBlock(newBlock, previousBlock) {
    if (newBlock.index !== previousBlock.index + 1) {
      console.error('invalid index')
      return false
    }
    if (newBlock.previousHash !== previousBlock.hash) {
      console.error('current and previous hash dont match')
      return false
    }
    if (newBlock.hash !== newBlock.calculateHash()) {
      console.error('recalculated hash is wrong')
      return false
    }
    return true
  }

  isChainValid() {
    for (var i = 1; i < this.blockchain.length; i++) {
      if (!this.isValidBlock(this.blockchain[i], this.blockchain[i - 1])) return false
    }
    return true
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1]
  }
}

module.exports =  Blockchain

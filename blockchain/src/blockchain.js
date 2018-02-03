const Block = require('./block');
const Transaction = require('./transaction')
const TransactionBuilder = require('./transactionBuilder')
const CryptoHelper = require('./cryptoHelper')

class Blockchain {
  constructor() {
    this.blockchain = []
    this.transactions = []
    this.blockchain.push(this.generateGenesisBlock())
    this.difficulty = 4
  }

  generateGenesisBlock() {
    const transaction = TransactionBuilder.createTransaction(
      '03dad29afbb7c77b12dc850ea5ad544496333dd6c8ac82d514d5a5488821417c34',
      '03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273a158b824b519a6',
      15,
      '464131fc203711a6f99de539ddc4edc393b80bcd0a72851c0d3f7b7813d7d9d7')
    return new Block(0, '0', new Date().toISOString(), transaction)
  }

  addBlock() {
    const previousHash = this.getLatestBlock().hash
    const index = this.blockchain.length
    const timestamp = new Date().toISOString()

    const data = this.getTransactionsToBlock()
    if(data.length === 0) {
      console.error('No transactions in block');
      return
    }

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
    if (!this.areAllTransactionsValid(newBlock.data)) {
      console.error('invalid transactions')
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

  areAllTransactionsValid(transactions) {
    let isOk = true
    transactions.forEach(transaction => {
      if(!this.checkTransaction(TransactionBuilder.fromJSON(transaction))) {
        isOk = false
        return
      }
    })
    return isOk
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1]
  }

  getTransactionsToBlock() {
    const transactions = []

    if(this.transactions.length > 0) {
      transactions.push(this.getFirstTransaction())
      this.removeFirstTransactionFromPending()
    } else {
      console.info('No pending transactions')
    }
    return transactions
  }

  removeFirstTransactionFromPending() {
    this.transactions.shift()
  }

  getLatestTransaction() {
    return this.transactions[this.blockchain.length - 1]
  }

  getFirstTransaction() {
    return this.transactions[0]
  }

  addTransaction(newTransaction) {
    if (this.checkTransaction(newTransaction)) {
      this.transactions.push(newTransaction)

      console.info(`Transaction added: ${newTransaction.id}`)
    } else {
      console.error(`Cannot add transaction`);
    }
  }

  checkTransaction(transaction) {
    if(!transaction) {
      console.error(`No transaction`);
      return false
    }
    console.error(`Check transaction '${transaction.id}'`);

    if(!transaction.isValid()) {
      console.error(`Transaction '${transaction.id}' is invalid`);
      return false
    }

    if(this.getMoney(transaction.data.from) < transaction.data.amount) {
      console.error(`Not enough money on address ${transaction.data.from}`);
      return false
    }

    if(this.blockchain.find(block => block.data.find(data => data.id === transaction.id))) {
      console.error(`Transaction '${transaction.id}' is in blockchain`);
      return false
    }

    return true;
  }

  getMoney(address) {
    const incomes = this.blockchain.reduce((sum, block) => {
      if(!block) return sum
      return sum + block.data.reduce((sum1, transaction) => {
        if(transaction.data.to === address) return sum1 + transaction.data.amount
        else return sum1
      }, 0)
    }, 0)

    const outcomes = this.blockchain.reduce((sum, block) => {
      if(!block) return sum
      return sum + block.data.reduce((sum1, transaction) => {
        if(transaction.data.from === address) return sum1 + transaction.data.amount
        else return sum1
      }, 0)
    }, 0)

    console.log('SUM', incomes, outcomes)

    const sum = incomes - outcomes

    if (sum < 0) console.error('Address has less then 0 money')

    return sum
  }
}

module.exports =  Blockchain

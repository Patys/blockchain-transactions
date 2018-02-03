const Transaction = require('./transaction')
const cryptoHelper = require('./cryptoHelper')

  /*
{
  from: 'addressFrom',
  to: 'addressTo',
  amount: 'amount',
}
  */

const createTransaction = (from, to, amount, privateKey) => {
  const order = {
    from,
    to,
    amount
  }
  const transaction = new Transaction()
  transaction.id = cryptoHelper.randomHash()
  transaction.data = order
  transaction.sign = cryptoHelper.sign(order, privateKey)
  transaction.hash = transaction.calculateHash() // hash

  if(!transaction.isValid()) {
    console.log('Transaction is invalid')
    return null
  }

  return transaction
}

const fromJSON = (json) => {
  const jsonTransaction = json
  const order = {
    from: jsonTransaction.data.from,
    to: jsonTransaction.data.to,
    amount: jsonTransaction.data.amount
  }
  const transaction = new Transaction()
  transaction.id = jsonTransaction.id
  transaction.data = order
  transaction.sign = jsonTransaction.sign
  transaction.hash = jsonTransaction.hash

  if(!transaction.isValid()) {
    console.log('Transaction is invalid')
    return null
  }

  return transaction
}

module.exports = {
  createTransaction,
  fromJSON
}

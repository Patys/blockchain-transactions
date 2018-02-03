const Blockchain = require('./blockchain/src/blockchain')
const TransactionBuilder = require('./blockchain/src/transactionBuilder')
const CryptoHelper = require('./blockchain/src/cryptoHelper')

const patyscoin = new Blockchain

const wallet1 = CryptoHelper.generateWallet()
const wallet2 = CryptoHelper.generateWallet()


// from, to, amount, privateKey
const transaction = TransactionBuilder.createTransaction(
  '03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273a158b824b519a6',
  wallet2.publicKey,
  5,
  '7ea444fa781c50949e683661da43a8f90143ce85b842c096bf77a936da7d554a'
)
const transaction1 = TransactionBuilder.createTransaction(
  '03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273a158b824b519a6',
  wallet2.publicKey,
  5,
  '7ea444fa781c50949e683661da43a8f90143ce85b842c096bf77a936da7d554a'
)
const transaction3 = TransactionBuilder.createTransaction(
  '03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273a158b824b519a6',
  wallet2.publicKey,
  5,
  '7ea444fa781c50949e683661da43a8f90143ce85b842c096bf77a936da7d554a'
)
const transaction4 = TransactionBuilder.createTransaction(
  '03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273a158b824b519a6',
  wallet2.publicKey,
  5,
  '7ea444fa781c50949e683661da43a8f90143ce85b842c096bf77a936da7d554a'
)
const transaction2 = TransactionBuilder.createTransaction(
  '03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273a158b824b519a6',
  wallet2.publicKey,
  15,
  '7ea444fa781c50949e683661da43a8f90143ce85b842c096bf77a936da7d554a'
)

patyscoin.addTransaction(transaction)
patyscoin.addTransaction(transaction1)
patyscoin.addTransaction(transaction1)
patyscoin.addTransaction(transaction)
patyscoin.addTransaction(transaction2)
patyscoin.addTransaction(transaction3)
patyscoin.addTransaction(transaction4)
patyscoin.addTransaction(transaction2)
patyscoin.addTransaction(transaction1)
patyscoin.addTransaction(transaction)
patyscoin.addTransaction(transaction2)

patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()
patyscoin.addBlock()

console.log(JSON.stringify(patyscoin))

/*
Generated keys:
Public key:  03dad29afbb7c77b12dc850ea5ad544496333dd6c8ac82d514d5a5488821417c34
Private key:  464131fc203711a6f99de539ddc4edc393b80bcd0a72851c0d3f7b7813d7d9d7
Generated keys:
Public key:  03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273a158b824b519a6
Private key:  7ea444fa781c50949e683661da43a8f90143ce85b842c096bf77a936da7d554a
Generated keys:
Public key:  034fd0fd13576339789ba497a65a60d61aad2940e9c542d556bd6b0e0c7ccf3358
Private key:  fe4c5526d240f6a5427ba9f71edf875fb2628bf3a662ff8542e88020d83050d3
Check transaction '3caa2ef9c57821dc7d4bcb6f7605ce684477c19b632206ac6b60e9ceaedd3
649'
SUM 0 0
Address has less then 0 money
Not enough money on address 03bf53fe19b27a825d0bcc96cc357324237df0e459b10cdcd273
a158b824b519a6
Cannot add transaction
No pending transactions
No transactions in block


*/

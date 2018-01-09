const Blockchain = require('./blockchain/src/blockchain')

const patyscoin = new Blockchain

patyscoin.addBlock({ ownerID: 1, amount: 100 })
patyscoin.addBlock({ ownerID: 2, amount: 132 })
patyscoin.addBlock({ ownerID: 1, amount: -5 })

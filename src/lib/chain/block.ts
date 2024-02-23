import { keccak256, toUtf8Bytes } from 'ethers'
import { MerkleTree } from 'merkletreejs'
import type Transaction from './transaction'
import { BlockArgsType } from './types'

export default class Block {
  index: number
  createdAt: number
  difficulty: number
  prevHash: string
  message: string | null
  transactions: Transaction[]
  merkelRoot: string
  hash: string | null = null
  nonce: number | null = null

  constructor({
    index,
    difficulty,
    prevHash,
    message,
    transactions,
  }: BlockArgsType) {
    this.index = index
    this.createdAt = Date.now()
    this.difficulty = difficulty
    this.prevHash = prevHash
    this.message = message || null
    this.transactions = transactions
    this.merkelRoot = this.calculateMerkelRoot()
  }

  calculateMerkelTree() {
    const leaves = this.transactions.map(tx => tx.calculateHash())
    return new MerkleTree(leaves, keccak256)
  }

  calculateMerkelRoot() {
    const tree = this.calculateMerkelTree()
    return tree.getRoot().toString('hex')
  }

  calculateHash(nonce: number | null) {
    if (nonce === null) throw new Error('nonce must be given a numerical value')

    return keccak256(
      toUtf8Bytes(
        [
          this.merkelRoot,
          this.index,
          this.createdAt,
          this.difficulty,
          this.prevHash,
          nonce,
          this.message,
        ].join(''),
      ),
    )
  }

  async mine() {
    return new Promise((resolve, reject) => {
      if (this.nonce !== null || this.hash !== null)
        reject('Block has already been mined')

      let nonce = 0
      let hash = this.calculateHash(nonce)

      while (!hash.startsWith('0'.repeat(this.difficulty))) {
        nonce++
        hash = this.calculateHash(nonce)
      }
      this.nonce = nonce
      this.hash = hash
      this.transactions.forEach(tx => {
        tx.setStatus('success')
      })
      resolve(this.hash)
    })
  }

  verifyTransactions() {
    if (!this.transactions.every(tx => tx.verify())) return false

    const tree = this.calculateMerkelTree()
    const isValid = this.transactions.every(tx => {
      const proof = tree.getProof(tx.hash)
      return tree.verify(proof, tx.hash, tree.getRoot())
    })

    return isValid
  }

  verify() {
    if (this.nonce === null) return false

    return (
      this.verifyTransactions() && this.hash === this.calculateHash(this.nonce)
    )
  }
}

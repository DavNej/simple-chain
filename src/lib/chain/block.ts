import { keccak256, toUtf8Bytes } from 'ethers'
import { MerkleTree } from 'merkletreejs'
import type { BlockArgsType, TransactionMapType } from './types'

export default class Block {
  index: number
  createdAt: number
  difficulty: number
  prevHash: string
  message: string | null
  transactions: TransactionMapType
  merkelRoot: string | null = null
  hash: string | null = null
  nonce: number | null = null
  private _tree: MerkleTree | null = null

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
  }

  async mine() {
    return new Promise((resolve, reject) => {
      if (this.nonce !== null || this.hash !== null)
        reject('Block has already been mined')

      const transactions = new Map()

      for (const tx of this.transactions.values()) {
        const hash = tx.addToBlock(this.index)
        transactions.set(hash, tx)
      }

      this.transactions = transactions
      this._calculateMerkelTree(Array.from(transactions.keys()))

      if (!this._verifyTransactions())
        reject("Block's Transactions are invalid")

      let nonce = 0
      let hash = this._calculateHash(nonce)

      while (!hash.startsWith('0'.repeat(this.difficulty))) {
        nonce++
        hash = this._calculateHash(nonce)
      }

      this.nonce = nonce
      this.hash = hash
      this.transactions.forEach(tx => {
        tx.setStatus('success')
      })
      resolve(this.hash)
    })
  }

  verify() {
    if (this.nonce === null) return false

    return (
      this._verifyTransactions() &&
      this.hash === this._calculateHash(this.nonce)
    )
  }

  private _calculateMerkelTree(leaves: string[]) {
    this._tree = new MerkleTree(leaves, keccak256)
    this.merkelRoot = this._tree.getRoot().toString('hex')
    return this._tree
  }

  private _calculateHash(nonce: number) {
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

  private _verifyTransactions() {
    if (!this._tree || !this.merkelRoot) return false

    for (const tx of this.transactions.values()) {
      if (!tx.verify()) return false
    }

    for (const tx of this.transactions.values()) {
      if (!tx.hash) return false
      const proof = this._tree.getProof(tx.hash)
      if (!proof) return false
      const isValid = this._tree.verify(proof, tx.hash, this._tree.getRoot())
      if (!isValid) return false
    }

    return true
  }
}

import Block from './block'

export const genesisBlockArgs = {
  index: 0,
  difficulty: 0,
  prevHash:
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  message: 'I am THE genesis block 💫',
  transactions: [],
}

export default class Chain {
  chain: Map<number, Block>
  difficulty: number = 1
  corruptedBlock: number | null = null

  constructor() {
    this.chain = new Map()
  }

  async initialize() {
    const genesisBlock = new Block(genesisBlockArgs)
    await genesisBlock.mine()
    this.addBlock(genesisBlock)
  }

  get size(): number {
    return this.chain.size
  }

  get lastBlock(): Block {
    const _lastBlock = this.chain.get(this.size - 1)
    if (_lastBlock) return _lastBlock
    throw new Error(`Chain is empty`)
  }

  setDifficulty(newDifficulty: number) {
    this.difficulty = newDifficulty
  }

  addBlock(block: Block) {
    if (!this._blockCanBeAdded(block)) {
      throw new Error(`Block ${block.index} is invalid ⛔️`)
    }

    this.chain.set(this.size, block)
  }

  _blockCanBeAdded(block: Block): boolean {
    if (block.index === 0) return true

    return (
      block.index === this.size &&
      block.prevHash === this.lastBlock.hash &&
      block.difficulty === this.difficulty &&
      block.verify()
    )
  }

  verify(): boolean {
    const genesisBlock = this.chain.get(0)
    if (!genesisBlock) return false

    if (genesisBlock.hash !== genesisBlock.calculateHash(genesisBlock.nonce)) {
      this.corruptedBlock = 0
      return false
    }

    for (let i = 1; i < this.chain.size; i++) {
      const currentBlock = this.chain.get(i)
      const previousBlock = this.chain.get(i - 1)

      if (!currentBlock || !previousBlock) return false
      if (
        currentBlock.index !== i ||
        currentBlock.prevHash !== previousBlock.hash ||
        !currentBlock.verify()
      ) {
        this.corruptedBlock = i
        return false
      }
    }

    return true
  }
}

import { ethers } from 'ethers'

export function generateAddress(): string {
  const wallet = ethers.Wallet.createRandom()
  return wallet.deriveChild(Math.floor(Math.random() * 100)).address
}

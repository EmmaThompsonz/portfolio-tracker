import { useState, useCallback } from 'react'
import { ethers } from 'ethers'

interface WalletState {
  address: string | null
  isConnected: boolean
  balance: string | null
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: null
  })

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const balance = await provider.getBalance(address)
        
        setWallet({
          address,
          isConnected: true,
          balance: ethers.formatEther(balance)
        })
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('MetaMask is not installed')
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      balance: null
    })
  }, [])

  return {
    wallet,
    connectWallet,
    disconnectWallet
  }
}
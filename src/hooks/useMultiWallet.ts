import { useState, useCallback } from 'react'

export interface WalletEntry {
  address: string
  label?: string
  addedAt: Date
}

export const useMultiWallet = () => {
  const [wallets, setWallets] = useState<WalletEntry[]>([])

  const addWallet = useCallback((address: string, label?: string) => {
    const newWallet: WalletEntry = {
      address,
      label: label || `Wallet ${wallets.length + 1}`,
      addedAt: new Date()
    }
    
    setWallets(prev => [...prev, newWallet])
  }, [wallets.length])

  const removeWallet = useCallback((address: string) => {
    setWallets(prev => prev.filter(wallet => wallet.address !== address))
  }, [])

  const updateWalletLabel = useCallback((address: string, label: string) => {
    setWallets(prev => 
      prev.map(wallet => 
        wallet.address === address 
          ? { ...wallet, label }
          : wallet
      )
    )
  }, [])

  return {
    wallets,
    addWallet,
    removeWallet,
    updateWalletLabel
  }
}
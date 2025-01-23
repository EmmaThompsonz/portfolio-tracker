import { useState, useEffect } from 'react'
import { fetchEthereumPrice, TokenPrice } from '../services/priceService'

export const usePrices = () => {
  const [ethPrice, setEthPrice] = useState<TokenPrice | null>(null)
  const [loading, setLoading] = useState(false)

  const updatePrices = async () => {
    setLoading(true)
    try {
      const price = await fetchEthereumPrice()
      setEthPrice(price)
    } catch (error) {
      console.error('Failed to update prices:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    updatePrices()
    const interval = setInterval(updatePrices, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  return {
    ethPrice,
    loading,
    updatePrices
  }
}
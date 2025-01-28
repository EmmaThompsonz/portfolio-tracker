import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { getWalletTokens, Token } from '../services/tokenService'
import { fetchTokenPrices, TokenPrice } from '../services/priceService'

interface PortfolioOverviewProps {
  address: string
  ethBalance: string
}

export const PortfolioOverview = ({ address, ethBalance }: PortfolioOverviewProps) => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [prices, setPrices] = useState<TokenPrice[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true)
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const walletTokens = await getWalletTokens(provider, address)
          setTokens(walletTokens)

          const tokenIds = ['ethereum', ...walletTokens.map(t => t.symbol.toLowerCase())]
          const tokenPrices = await fetchTokenPrices(tokenIds)
          setPrices(tokenPrices)
        }
      } catch (error) {
        console.error('Failed to load portfolio:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [address])

  const calculateTotalValue = () => {
    let total = 0
    
    // Add ETH value
    const ethPrice = prices.find(p => p.symbol === 'eth')
    if (ethPrice) {
      total += parseFloat(ethBalance) * ethPrice.current_price
    }

    // Add token values
    tokens.forEach(token => {
      const price = prices.find(p => p.symbol === token.symbol.toLowerCase())
      if (price) {
        total += parseFloat(token.balanceFormatted) * price.current_price
      }
    })

    return total
  }

  const totalValue = calculateTotalValue()

  if (loading) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading portfolio...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Portfolio Overview
        </h3>
        
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900">
            ${totalValue.toFixed(2)}
          </div>
          <p className="text-sm text-gray-500">Total Value</p>
        </div>

        <div className="space-y-4">
          {/* ETH Holdings */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">ETH</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Ethereum</p>
                <p className="text-sm text-gray-500">{ethBalance} ETH</p>
              </div>
            </div>
            <div className="text-right">
              {prices.find(p => p.symbol === 'eth') && (
                <>
                  <p className="text-sm font-medium text-gray-900">
                    ${(parseFloat(ethBalance) * prices.find(p => p.symbol === 'eth')!.current_price).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${prices.find(p => p.symbol === 'eth')!.current_price.toFixed(2)} per ETH
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Token Holdings */}
          {tokens.map(token => {
            const price = prices.find(p => p.symbol === token.symbol.toLowerCase())
            const value = price ? parseFloat(token.balanceFormatted) * price.current_price : 0

            return (
              <div key={token.address} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {token.symbol.slice(0, 3)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{token.name}</p>
                    <p className="text-sm text-gray-500">
                      {parseFloat(token.balanceFormatted).toFixed(4)} {token.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${value.toFixed(2)}
                  </p>
                  {price && (
                    <p className="text-xs text-gray-500">
                      ${price.current_price.toFixed(4)} per {token.symbol}
                    </p>
                  )}
                </div>
              </div>
            )
          })}

          {tokens.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <p>No ERC-20 tokens found in this wallet</p>
              <p className="text-xs mt-1">Only checking common tokens (USDC, USDT, DAI)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
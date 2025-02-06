import { useState } from 'react'
import { usePrices } from '../hooks/usePrices'
import { useMultiWallet } from '../hooks/useMultiWallet'
import { PortfolioOverview } from './PortfolioOverview'
import { AddWalletModal } from './AddWalletModal'

interface WalletInfoProps {
  address: string
  balance: string
  onDisconnect: () => void
}

export const WalletInfo = ({ address, balance, onDisconnect }: WalletInfoProps) => {
  const { ethPrice, loading } = usePrices()
  const { wallets, addWallet, removeWallet } = useMultiWallet()
  const [showAddModal, setShowAddModal] = useState(false)
  
  const balanceValue = ethPrice 
    ? (parseFloat(balance) * ethPrice.current_price).toFixed(2)
    : '0.00'

  return (
    <div className="space-y-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Connected Wallet
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Address: {address}</p>
                <p>Balance: {balance} ETH</p>
                {ethPrice && (
                  <p>Value: ${balanceValue} USD</p>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowAddModal(true)}
              >
                Track Wallet
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                onClick={onDisconnect}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>

      {wallets.length > 0 && (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Tracked Wallets
            </h3>
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <div key={wallet.address} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {wallet.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeWallet(wallet.address)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <PortfolioOverview address={address} ethBalance={balance} />

      {ethPrice && (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              ETH Price
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ${ethPrice.current_price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Current Price</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  ethPrice.price_change_percentage_24h >= 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {ethPrice.price_change_percentage_24h >= 0 ? '+' : ''}
                  {ethPrice.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className="text-xs text-gray-500">24h change</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500">
          Loading price data...
        </div>
      )}

      <AddWalletModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddWallet={addWallet}
      />
    </div>
  )
}
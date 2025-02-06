import { useState } from 'react'

interface AddWalletModalProps {
  isOpen: boolean
  onClose: () => void
  onAddWallet: (address: string) => void
}

export const AddWalletModal = ({ isOpen, onClose, onAddWallet }: AddWalletModalProps) => {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!address.trim()) {
      setError('Please enter a wallet address')
      return
    }

    if (!address.startsWith('0x') || address.length !== 42) {
      setError('Please enter a valid Ethereum address')
      return
    }

    onAddWallet(address.trim())
    setAddress('')
    setError('')
    onClose()
  }

  const handleClose = () => {
    setAddress('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mt-2">
            Add Wallet Address
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Enter an Ethereum wallet address to track
          </p>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x1234..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>
            
            <div className="items-center px-4 py-3 mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              >
                Add Wallet
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full px-4 py-2 bg-gray-300 text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
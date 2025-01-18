interface WalletInfoProps {
  address: string
  balance: string
  onDisconnect: () => void
}

export const WalletInfo = ({ address, balance, onDisconnect }: WalletInfoProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Wallet Connected
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Address: {address}</p>
              <p>Balance: {balance} ETH</p>
            </div>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
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
  )
}
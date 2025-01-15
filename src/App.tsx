import { useWallet } from './hooks/useWallet'

function App() {
  const { wallet, connectWallet, disconnectWallet } = useWallet()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Portfolio Tracker
          </h1>
          {wallet.isConnected && (
            <div className="text-sm text-gray-600">
              <span className="block">{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
              <span className="block">{wallet.balance} ETH</span>
            </div>
          )}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!wallet.isConnected ? (
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl text-gray-600 mb-4">
                  Connect your wallet to get started
                </h2>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={connectWallet}
                >
                  Connect MetaMask
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Wallet Connected
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Address: {wallet.address}</p>
                      <p>Balance: {wallet.balance} ETH</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
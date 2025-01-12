import { useState } from 'react'

function App() {
  const [connectedWallet, setConnectedWallet] = useState<string>('')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Portfolio Tracker
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl text-gray-600 mb-4">
                Connect your wallet to get started
              </h2>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setConnectedWallet('0x1234...5678')}
              >
                Connect Wallet
              </button>
              {connectedWallet && (
                <p className="mt-4 text-green-600">
                  Connected: {connectedWallet}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
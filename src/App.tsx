import { useWallet } from './hooks/useWallet'
import { ConnectWallet } from './components/ConnectWallet'
import { WalletInfo } from './components/WalletInfo'

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
            <ConnectWallet onConnect={connectWallet} />
          ) : (
            <WalletInfo 
              address={wallet.address!}
              balance={wallet.balance!}
              onDisconnect={disconnectWallet}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
interface ConnectWalletProps {
  onConnect: () => void
}

export const ConnectWallet = ({ onConnect }: ConnectWalletProps) => {
  return (
    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl text-gray-600 mb-4">
          Connect your wallet to get started
        </h2>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onConnect}
        >
          Connect MetaMask
        </button>
      </div>
    </div>
  )
}
# Portfolio Tracker

A Web3 portfolio tracker for monitoring cryptocurrency investments across multiple wallets.

## Features

- 🔗 MetaMask wallet connection
- 💰 Real-time ETH balance and USD value
- 📊 Portfolio distribution chart
- 🪙 ERC-20 token support (USDC, USDT, DAI)
- 📈 Live price data from CoinGecko API
- 👀 Multi-wallet tracking
- 📱 Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Web3**: ethers.js v6
- **Charts**: Chart.js + react-chartjs-2
- **API**: CoinGecko API for price data

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension

### Installation

1. Clone the repository
```bash
git clone https://github.com/EmmaThompsonz/portfolio-tracker.git
cd portfolio-tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Usage

1. Connect your MetaMask wallet
2. View your ETH balance and USD value
3. See portfolio distribution in the chart
4. Add additional wallet addresses to track
5. Monitor ERC-20 token holdings

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
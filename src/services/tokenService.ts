import { ethers } from 'ethers'

export interface Token {
  address: string
  name: string
  symbol: string
  decimals: number
  balance: string
  balanceFormatted: string
}

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)'
]

const COMMON_TOKENS = [
  { address: '0xA0b86a33E6441C94C4e5e9c4c9f0d9C8E68a7b9F', symbol: 'USDC' },
  { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT' },
  { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI' }
]

export const getTokenBalance = async (
  provider: ethers.BrowserProvider,
  tokenAddress: string,
  walletAddress: string
): Promise<Token | null> => {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
    
    const [balance, decimals, symbol, name] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals(),
      contract.symbol(),
      contract.name()
    ])

    const balanceFormatted = ethers.formatUnits(balance, decimals)
    
    return {
      address: tokenAddress,
      name,
      symbol,
      decimals,
      balance: balance.toString(),
      balanceFormatted
    }
  } catch (error) {
    console.error(`Error fetching token ${tokenAddress}:`, error)
    return null
  }
}

export const getWalletTokens = async (
  provider: ethers.BrowserProvider,
  walletAddress: string
): Promise<Token[]> => {
  const tokens: Token[] = []
  
  for (const tokenInfo of COMMON_TOKENS) {
    const token = await getTokenBalance(provider, tokenInfo.address, walletAddress)
    if (token && parseFloat(token.balanceFormatted) > 0) {
      tokens.push(token)
    }
  }
  
  return tokens
}
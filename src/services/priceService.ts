const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export interface TokenPrice {
  id: string
  symbol: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
}

export const fetchTokenPrices = async (tokenIds: string[]): Promise<TokenPrice[]> => {
  try {
    const idsParam = tokenIds.join(',')
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch token prices')
    }
    
    const data = await response.json()
    return data.map((token: any) => ({
      id: token.id,
      symbol: token.symbol,
      current_price: token.current_price,
      price_change_24h: token.price_change_24h,
      price_change_percentage_24h: token.price_change_percentage_24h
    }))
  } catch (error) {
    console.error('Error fetching token prices:', error)
    return []
  }
}

export const fetchEthereumPrice = async (): Promise<TokenPrice | null> => {
  const prices = await fetchTokenPrices(['ethereum'])
  return prices.length > 0 ? prices[0] : null
}
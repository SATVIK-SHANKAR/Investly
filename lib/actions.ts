"use server"

import axios from "axios"

const API_KEY = "PFY248CLU6NY3NH3"

const SYMBOLS = {
  low: ["VOO", "BND", "JNJ", "PG", "KO"],
  medium: ["AAPL", "MSFT", "VTI", "GOOGL", "AMZN"],
  high: ["TSLA", "NVDA", "COIN", "AMD", "PLTR"],
}

type PortfolioRequest = {
  amount: number
  risk: "low" | "medium" | "high"
  currency: string
}

type PortfolioItem = {
  symbol: string
  price: number
  shares: number
  allocated: number
}

type PortfolioResponse = {
  total: number
  currency: string
  risk: string
  breakdown: PortfolioItem[]
  error?: string
}

async function fetchPrice(symbol: string, currency: string): Promise<number | null> {
  try {
    // For simplicity, we're using GLOBAL_QUOTE for stocks
    // In a production app, you might want to use different endpoints for crypto
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`

    const { data } = await axios.get(url)

    if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
      let price = Number.parseFloat(data["Global Quote"]["05. price"])

      // If currency is not USD, convert the price
      if (currency !== "USD") {
        const exchangeRateUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=${API_KEY}`
        const exchangeRateResponse = await axios.get(exchangeRateUrl)

        if (
          exchangeRateResponse.data["Realtime Currency Exchange Rate"] &&
          exchangeRateResponse.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        ) {
          const exchangeRate = Number.parseFloat(
            exchangeRateResponse.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
          )
          price = price * exchangeRate
        }
      }

      return price
    }

    return null
  } catch (error) {
    console.error("Error fetching price:", error)
    return null
  }
}

export async function getPortfolio(request: PortfolioRequest): Promise<PortfolioResponse> {
  const { amount, risk, currency } = request

  if (!amount || !risk || !currency || !SYMBOLS[risk]) {
    return {
      total: 0,
      currency,
      risk,
      breakdown: [],
      error: "Invalid input parameters",
    }
  }

  const selected = SYMBOLS[risk]
  const perAsset = amount / selected.length
  const breakdown: PortfolioItem[] = []

  try {
    for (const symbol of selected) {
      const price = await fetchPrice(symbol, currency)

      if (!price) continue

      const shares = Number.parseFloat((perAsset / price).toFixed(4))
      breakdown.push({
        symbol,
        price,
        shares,
        allocated: Number.parseFloat((shares * price).toFixed(2)),
      })
    }

    if (breakdown.length === 0) {
      return {
        total: amount,
        currency,
        risk,
        breakdown: [],
        error: "Could not fetch prices for any assets. API rate limit may have been reached.",
      }
    }

    return { total: amount, currency, risk, breakdown }
  } catch (error) {
    console.error("Error generating portfolio:", error)
    return {
      total: amount,
      currency,
      risk,
      breakdown: [],
      error: "Failed to generate portfolio. Please try again.",
    }
  }
}

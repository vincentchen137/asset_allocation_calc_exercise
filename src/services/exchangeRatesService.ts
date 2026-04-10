import type { ExchangeRates, ExchangeRatesResponse } from "../types/exchangeRates";

const API_URL = "https://api.coinbase.com/v2/exchange-rates?currency=USD"

export async function fetchExchangeRates(): Promise<ExchangeRates> {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data: ExchangeRatesResponse = await response.json()

    const btcRate = data?.data?.rates?.BTC
    const ethRate = data?.data?.rates?.ETH

    if (!btcRate || !ethRate) {
        throw new Error("BTC or ETH rate missing from API response")
    }
    
    const parsedBtc: number = Number(btcRate)
    const parsedEth: number = Number(ethRate)
    
    if (Number.isNaN(parsedBtc) || Number.isNaN(parsedEth)) {
        throw new Error("Received invalid exchange rate data")
    }
    
    return {
        BTC: parsedBtc,
        ETH: parsedEth,
    }
}
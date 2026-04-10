export type SupportedAsset = 'BTC' | 'ETH'

export interface ExchangeRates {
    BTC: number
    ETH: number
}

export interface ExchangeRatesResponse {
    data?: {
        currency?: string;
        rates?: Record<string, string>
    }
}
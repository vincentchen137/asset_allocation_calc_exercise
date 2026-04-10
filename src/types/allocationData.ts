import type { SupportedAsset } from "./exchangeRates"

export interface AllocationData {
    allocationAmount: number
    allocationPercentage: number
    cryptoAmount: number
    cryptoCurrency: SupportedAsset
    rate: number | null
    isReady: boolean
}
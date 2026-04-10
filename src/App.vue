<script setup lang="ts">
import { ref, computed } from "vue"
import AssetInput from "./components/AssetInput.vue"
import RatesStatus from "./components/RatesStatus.vue"
import AllocationResult from "./components/AllocationResult.vue"
import { useExchangeRates } from "./composables/useExchangeRates"
import type { AllocationData } from "./types/allocationData"
import './styles/main.css'


const BTC_PERCENTAGE = 0.7
const ETH_PERCENTAGE = 0.3

const investableAssetInput = ref<string>("")
const { rates, isLoading, error, time, loadRates } = useExchangeRates()

// parsed number, used for calculating
const investableAsset = computed<number>(() => {
  const cleaned: string = investableAssetInput.value.replace(/,/g, '').trim()
  const parsed: number = Number(cleaned)

  if (!cleaned || Number.isNaN(parsed) || 0 > parsed) {
    return 0
  }

  return parsed
})

const isInvestableAssetValid = computed<boolean>(() => investableAsset.value > 0)
const hasRates = computed<boolean>(() => rates.value !== null)

const btcAllocation = computed<number>(() =>
  Math.round(investableAsset.value * BTC_PERCENTAGE * 100) / 100)
const ethAllocation = computed<number>(() =>
  Math.round(investableAsset.value * ETH_PERCENTAGE * 100) / 100)

const btcAmount = computed<number>(() => {
  if (!rates.value?.BTC) {
    return 0
  }
  return btcAllocation.value * rates.value.BTC
})
const ethAmount = computed<number>(() => {
  if (!rates.value?.ETH) {
    return 0
  }
  return ethAllocation.value * rates.value.ETH
})

const isReady = computed<boolean>(() => isInvestableAssetValid.value && hasRates.value)

const btcData = computed<AllocationData>(() => ({
  allocationAmount: btcAllocation.value,
  allocationPercentage: BTC_PERCENTAGE,
  cryptoAmount: btcAmount.value,
  cryptoCurrency: "BTC",
  rate: rates.value?.BTC ?? null,
  isReady: isReady.value,
}))
const ethData = computed<AllocationData>(() => ({
  allocationAmount: ethAllocation.value,
  allocationPercentage: ETH_PERCENTAGE,
  cryptoAmount: ethAmount.value,
  cryptoCurrency: "ETH",
  rate: rates.value?.ETH ?? null,
  isReady: isReady.value,
}))
</script>

<template>
  <header class="header">
    <h1>
      Live Crypto Allocation Calculator
    </h1>
    <p>
      Enter your investable USD amount to see a 70/30 split between BTC and ETH at live exchange rates, powered by the Coinbase API.
    </p>
  </header>
  <main class="grid">
      <article class="card" aria-label="Investable Assets Input">
        <AssetInput
          v-model:investableAssetInput="investableAssetInput"
          :isValid="isInvestableAssetValid"
          :disabled="isLoading || !hasRates"
        />
        <RatesStatus
          :isLoading="isLoading"
          :error="error"
          :time="time"
          @retry="loadRates"
        />
      </article>
      <article class="card" aria-label="BTC Allocation Results">
        <AllocationResult
          :data="btcData"
        />
      </article>
      <article class="card" aria-label="ETH Allocation Results">
        <AllocationResult
          :data="ethData"
        />
      </article>
    </main>
</template>

<style scoped>
.header {
  margin: 5%;
}

.grid {
  display: grid;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 16px;
  grid-template-columns: 1fr;
}

/* breakpoint for tablets and small laptops */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--color-box-shadow);
}
</style>

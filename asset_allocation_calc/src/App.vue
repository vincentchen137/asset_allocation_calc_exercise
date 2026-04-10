<script setup lang="ts">
import { ref, computed } from "vue"
import AssetInput from "./components/AssetInput.vue"
import RatesStatus from "./components/RatesStatus.vue"
import AllocationResult from "./components/AllocationResult.vue"
import { useExchangeRates } from "./composables/useExchangeRates"
import './styles/main.css'


const BTC_PERCENTAGE = 0.7
const ETH_PERCENTAGE = 0.3

const investableAssetInput = ref<string>("")
const { rates, isLoading, error, time } = useExchangeRates()

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
  investableAsset.value * BTC_PERCENTAGE)
const ethAllocation = computed<number>(() =>
  investableAsset.value * ETH_PERCENTAGE)

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
  <div class="grid">
      <article class="card">
        <AssetInput
          v-model:investableAssetInput="investableAssetInput"
          :isInvestableAssetValid="isInvestableAssetValid"
          :disabled="isLoading || !hasRates"
        />
        <RatesStatus
          :isLoading="isLoading"
          :error="error"
          :time="time"
        />
      </article>

      <article class="card">
        <AllocationResult
          :allocation="btcAllocation"
          :allocationPercentage="BTC_PERCENTAGE"
          :hasRates="hasRates"
          :isInvestableAssetValid="isInvestableAssetValid"
          :amount="btcAmount"
          :cryptoCurrency="'BTC'"
          :rate="rates?.BTC ?? null"
        />
      </article>
      <article class="card">
        <AllocationResult
          :allocation="ethAllocation"
          :allocationPercentage="ETH_PERCENTAGE"
          :hasRates="hasRates"
          :isInvestableAssetValid="isInvestableAssetValid"
          :amount="ethAmount"
          :cryptoCurrency="'ETH'"
          :rate="rates?.ETH ?? null"
        />
      </article>
  </div>
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

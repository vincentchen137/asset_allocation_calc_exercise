<script setup lang="ts">
import { formatUsd, formatAsset } from '../utils/format';
import '../styles/main.css'


defineProps<{
    allocationPercentage: number
    allocation: number
    hasRates: boolean
    isInvestableAssetValid: boolean
    amount: number
    cryptoCurrency: string
    rate: number | null
}>()
</script>

<template>
    <section>
        <h2>{{ cryptoCurrency }}</h2>
        <div class="row">
            <p>{{ allocationPercentage * 100 }}% Allocation</p>
        </div>
        <div class="row">
            <span>USD allocation:</span>
            <strong>{{ formatUsd(allocation) }}</strong>
        </div>
        <div class="row">
            <span>{{ cryptoCurrency }}:</span>
            <strong>{{ hasRates && isInvestableAssetValid ? formatAsset(amount) : "-"}} {{ cryptoCurrency }}</strong>
        </div>
        <div class="row">
            <span>$1 USD = </span>
            <strong>{{ rate ? rate : "-" }}  {{ cryptoCurrency }}</strong>
        </div>
    </section>
</template>

<style>
</style>
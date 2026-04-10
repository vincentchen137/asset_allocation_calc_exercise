<script setup lang="ts">
import type { AllocationData } from '../types/allocationData';
import { formatUsd, formatAsset } from '../utils/format';

defineProps<{
    data: AllocationData
}>()
</script>

<template>
    <section>
        <h2>{{ data.cryptoCurrency }}</h2>
        <div class="row">
            <p>{{ data.allocationPercentage * 100 }}% Allocation</p>
        </div>
        <div class="row">
            <span>USD allocation:</span>
            <strong>{{ formatUsd(data.allocationAmount) }}</strong>
        </div>
        <div class="row">
            <span>{{ data.cryptoCurrency }}:</span>
            <strong>{{ data.isReady ? formatAsset(data.cryptoAmount) : "-"}} {{ data.cryptoCurrency }}</strong>
        </div>
        <div class="row">
            <span>$1 USD = </span>
            <strong>{{ data.rate ?? "-" }}  {{ data.cryptoCurrency }}</strong>
        </div>
    </section>
</template>

<style>
</style>
<script setup lang="ts">
import { formatTimeStamp } from '../utils/format'

defineProps<{
  isLoading: boolean
  error: string
  time: Date | null
}>()
</script>

<template>
    <div class="row">
        <p v-if="isLoading">Fetching rates...</p>
        <div v-else-if="time">
            <p>Rates fetched at {{ formatTimeStamp(time) }}</p>
            <p>Rates will automatically fetch every 60 seconds</p>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<style>
</style>
<script setup lang="ts">
import { formatTimeStamp } from '../utils/format'

defineProps<{
  isLoading: boolean
  error: string
  time: Date | null
}>()

const emit = defineEmits<{
    retry: []
}>()
</script>

<template>
    <div class="status">
        <p v-if="isLoading">Fetching rates...</p>
        <div v-else>
            <div v-if="error">
                <p class="error">{{ error }}</p>
                <button
                    type="button"
                    @click="emit('retry')"
                    aria-label="Retry fetching exchange rates"
                >Retry</button>
            </div>
            <div v-else-if="time">
                <p>Rates fetched at {{ formatTimeStamp(time) }}</p>
                <p>Rates will automatically fetch every 60 seconds</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.status {
    border-top: 1px solid var(--color-border);
    margin-top: 1em;
    padding-top: 1em;
}
</style>
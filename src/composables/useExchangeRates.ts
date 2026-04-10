import type { ExchangeRates } from "../types/exchangeRates"
import { ref, onMounted, onUnmounted } from "vue"
import { fetchExchangeRates } from "../services/exchangeRatesService"

const REFRESH_INTERVAL = 60000

export function useExchangeRates() {
    const rates = ref<ExchangeRates | null>(null)
    const isLoading = ref(false)
    const error = ref("")
    const time = ref<Date | null>(null)

    let timer: number | undefined

    async function loadRates(): Promise<void> {
        try {
            isLoading.value = true
            error.value = ""

            rates.value = await fetchExchangeRates()
            time.value = new Date()
        } catch(err) {
            error.value = err instanceof Error
                ? err.message
                : "Error fetching exchange rates"
        } finally {
            isLoading.value = false
        }
    }

    onMounted(() => {
        loadRates()
        timer = setInterval(loadRates, REFRESH_INTERVAL)
    })

    onUnmounted(() => {
        if (timer) {
            clearInterval(timer)
        }
    })

  return { rates, isLoading, error, time, loadRates }
}
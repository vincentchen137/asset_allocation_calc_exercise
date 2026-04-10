export function formatUsd(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value)
}

export function formatTimeStamp(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
    }).format(date)
}

export function formatAsset(value: number) {
    // fixed 8 decimal places for display
    return value.toFixed(8)
}
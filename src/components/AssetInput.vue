<script setup lang="ts">
defineProps<{
  investableAssetInput: string
  isValid: boolean
  disabled: boolean
}>()

const emit = defineEmits<{
  'update:investableAssetInput': [value: string]
}>()

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:investableAssetInput', target.value)
}
</script>

<template>
    <h2>Investable Assets</h2>
    <div class="row">
      <label for="investable-asset" class="label">Input:</label>
      <div class="asset-input">
        <div class="input-wrapper">
          <span aria-hidden="true">$</span>
          <input
            id="investable-asset"
            name="investable-asset"
            :value="investableAssetInput"
            :disabled="disabled"
            @input="handleInput"
            type="text"
            inputmode="decimal"
            placeholder="Enter USD Amount..."
          />
        </div>
      </div>
    </div>
    <p
      v-show="!isValid && investableAssetInput !== ''"
      class="helper"
    >
      Please enter a valid positive amount
    </p>
</template>

<style scoped>
.label {
  font-weight: 600;
  flex-shrink: 0;
}

.asset-input {
  flex: 1;
  min-width: 0;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper span {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text);
  pointer-events: none;
}

.helper {
  font-style: italic;
  color: var(--color-error);
  min-height: 1.25em;
}

input {
  width: 100%;
  padding: 14px 16px 14px 32px;
}
</style>
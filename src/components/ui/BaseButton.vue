<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--block': block }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-button__loader">
      <svg class="animate-spin" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <span v-if="!loading" class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  disabled: false,
  loading: false
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 2px solid transparent;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  // Sizes
  &--sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  &--md {
    padding: 0.625rem 1.25rem;
    font-size: 1rem;
  }

  &--lg {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }

  // Block
  &--block {
    width: 100%;
  }

  // Variants
  &--primary {
    background-color: #3b82f6;
    color: white;

    &:hover:not(:disabled) {
      background-color: #2563eb;
    }

    &:active:not(:disabled) {
      background-color: #1d4ed8;
    }
  }

  &--secondary {
    background-color: #cbd5e1;
    color: #1e293b;

    &:hover:not(:disabled) {
      background-color: #94a3b8;
    }

    &:active:not(:disabled) {
      background-color: #64748b;
    }
  }

  &--outline {
    border: 2px solid #3b82f6;
    color: #3b82f6;
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: #3b82f6;
      color: white;
    }

    &:active:not(:disabled) {
      background-color: #2563eb;
      border-color: #2563eb;
    }
  }

  &--text {
    background-color: transparent;
    color: #3b82f6;

    &:hover:not(:disabled) {
      color: #2563eb;
      text-decoration: underline;
    }

    &:active:not(:disabled) {
      color: #1d4ed8;
    }
  }

  // Loader
  &__loader {
    display: inline-flex;
    
    svg {
      width: 1.25em;
      height: 1.25em;
      animation: spin 1s linear infinite;
    }
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

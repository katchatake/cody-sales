<template>
  <v-btn 
    :color="buttonColor" 
    :variant="vuetifyVariant"
    :size="size" 
    :loading="loading"
    :disabled="disabled"
    :block="block"
    :icon="icon"
    class="text-none font-weight-bold"
    :class="{ 'shadow-base': variant !== 'ghost' && !icon }"
    :rounded="rounded"
    :elevation="elevation"
    v-bind="$attrs"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'white' | 'info';
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
  loading?: boolean;
  disabled?: boolean;
  icon?: string | boolean;
  block?: boolean;
}>(), {
  variant: 'primary',
  size: 'default',
  loading: false,
  disabled: false,
  icon: false,
  block: false,
});

const buttonColor = computed(() => {
  if (props.variant === 'ghost') return 'grey-darken-1';
  if (props.variant === 'white') return 'surface-base';
  if (props.variant === 'primary') return 'brand-primary';
  if (props.variant === 'secondary') return 'brand-secondary';
  if (props.variant === 'danger') return 'error-base';
  if (props.variant === 'info') return 'info-base';
  return 'brand-primary';
});

const vuetifyVariant = computed(() => {
  if (props.variant === 'ghost') return 'text';
  return 'elevated';
});

const elevation = computed(() => {
  if (props.variant === 'ghost') return 0;
  return 4;
});

const rounded = computed(() => {
  if (props.icon) return 'circle';
  return 'pill';
});
</script>

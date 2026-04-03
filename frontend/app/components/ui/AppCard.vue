<template>
  <v-card 
    class="shadow-lg rounded-xl border-0 h-100 flex-grow-1" 
    :class="[paddingClass, bgClass]"
    elevation="0"
    v-bind="$attrs"
  >
    <slot></slot>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'default' | 'gradient' | 'info' | 'transparent';
  padded?: boolean | 'large';
}>(), {
  variant: 'default',
  padded: true,
});

const paddingClass = computed(() => {
  if (!props.padded) return '';
  if (props.padded === 'large') return 'pa-sm-10 pa-6';
  return 'pa-6';
});

const bgClass = computed(() => {
  if (props.variant === 'gradient') return 'banner-card text-surface-base';
  if (props.variant === 'info') return 'bg-info-subtle';
  if (props.variant === 'transparent') return 'bg-transparent';
  return 'bg-surface-base'; // default
});
</script>

<style scoped>
.banner-card {
  background: linear-gradient(135deg, #60a5fa 0%, #1e3a8a 100%);
}
.banner-card :deep(h3),
.banner-card :deep(p) {
  color: #ffffff !important;
}
</style>

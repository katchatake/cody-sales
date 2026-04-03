<template>
  <v-text-field
    :disabled="disabled"
    :label="label"
    :type="type"
    :prepend-inner-icon="icon"
    v-bind="$attrs"
  >
    <slot></slot>
  </v-text-field>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  disabled?: boolean;
  label?: string;
  type?: string;
  icon?: string;
}>(), {
  disabled: false,
  type: 'text',
});
</script>

<template>
  <AppCard class="flex-grow-1" padded="false">
    <div class="pa-6 pb-0">
      <h3 class="font-weight-black text-heading-md mb-4 text-heading">
        {{ title }}
      </h3>
    </div>
    
    <v-table class="bg-transparent">
      <thead>
        <tr>
          <th 
            v-for="(header, i) in headers" 
            :key="i" 
            class="text-left font-weight-bold text-uppercase text-muted bg-transparent"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i" class="hover-bg cursor-pointer">
          <slot name="row" :item="item" :index="i"></slot>
        </tr>
      </tbody>
    </v-table>
  </AppCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  headers: string[];
  items: any[];
}>();
</script>

<style scoped>
.hover-bg {
  transition: background-color 0.2s ease;
}
.hover-bg:hover {
  background-color: var(--v-theme-surface-elevated) !important;
}
</style>

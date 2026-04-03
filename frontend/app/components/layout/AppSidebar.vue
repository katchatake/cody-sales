<template>
  <v-navigation-drawer v-model="drawer" color="surface-base" class="shadow-lg border-0" :width="280">
    <div class="pa-6 text-center">
      <div class="d-flex align-center justify-center mb-4 mt-2">
        <v-avatar color="brand-primary" elevation="3" class="mr-3 shadow-lg" size="48">
          <v-icon color="surface-base" size="28">mdi-store</v-icon>
        </v-avatar>
        <span class="text-heading-md">CodySales</span>
      </div>
    </div>

    <v-list class="px-4 mt-2">
      <v-list-item v-for="(item, i) in visibleItems" :key="i" :value="item" :to="item.to" color="brand-primary"
        class="mb-2 rounded-xl" link>
        <template v-slot:prepend>
          <v-icon :icon="item.icon" class="me-3"></v-icon>
        </template>
        <v-list-item-title class="font-weight-bold text-subtitle-1">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const drawer = ref(true);
const authStore = useAuthStore();

const items = ref([
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Venta', icon: 'mdi-cart-outline', to: '/sales' },
  { title: 'Metas', icon: 'mdi-bullseye-arrow', to: '/goals' },
  { title: 'Progreso', icon: 'mdi-chart-line', to: '/progress' },
]);

const visibleItems = computed(() => {
  const role = authStore.user?.role?.toUpperCase();
  return items.value.filter((item) => item.to !== '/goals' || role !== 'PROMOTOR');
});
</script>

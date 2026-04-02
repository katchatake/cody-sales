<template>
  <v-app-bar color="surface-subtle" elevation="0" class="px-6" height="80">
    <div class="text-heading-sm">
      <slot name="title"> </slot>
    </div>

    <v-spacer></v-spacer>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar color="brand-primary" class="cursor-pointer shadow-base border" size="44" v-bind="props">
          <span class="font-weight-bold text-surface-base">{{ initial }}</span>
        </v-avatar>
      </template>
      <v-list class="mt-2 rounded-xl shadow-lg border-0 pa-2" min-width="220" elevation="4">
        <div class="px-4 py-2">
          <div class="text-body-md font-weight-bold">{{ username }}</div>
          <div class="text-caption text-muted">{{ authStore.user?.email || 'user@domain.com' }}</div>
        </div>
        <v-divider class="my-2"></v-divider>
        <v-list-item prepend-icon="mdi-logout" title="Cerrar Sesión" @click="authStore.logout()"
          class="rounded-lg text-error-base"></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const initial = computed(() => {
  const email = authStore.user?.email;
  return email ? email[0].toUpperCase() : 'U';
});

const username = computed(() => {
  const email = authStore.user?.email;
  return email ? email.split('@')[0] : 'Usuario';
});
</script>

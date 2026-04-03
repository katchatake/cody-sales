<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <div>
        <h1 class="text-heading-xl text-heading mb-1">Progreso de Promotores</h1>
        <p class="text-body-md text-muted">
          Vista general del avance de los promotores registrados.
        </p>
      </div>
    </div>

    <TeamProgressOverview
      :progress-items="progressItems"
      :promotors="promotors"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { navigateTo, useNuxtApp } from '#imports';
import { toast } from 'vue-sonner';
import { useAuthStore } from '../../stores/auth';
import type { ProgressItem } from '../../types/progress';
import type { GoalPromotor } from '../../types/goals';

const { $api } = useNuxtApp();
const authStore = useAuthStore();
const progressItems = ref<ProgressItem[]>([]);
const promotors = ref<GoalPromotor[]>([]);

const loadProgress = async () => {
  try {
    const response = await $api.get('/progress');
    progressItems.value = response.data?.data ?? [];
  } catch {
    toast.error('No se pudo descargar el progreso de los promotores');
  }
};

const loadPromotors = async () => {
  try {
    const response = await $api.get('/users/promotors');
    promotors.value = response.data?.data ?? [];
  } catch {
    toast.error('No se pudieron cargar los promotores');
  }
};

onMounted(() => {
  authStore.restoreSession();

  if (authStore.user?.role?.toUpperCase() === 'PROMOTOR') {
    toast.error('Esta vista no está disponible para promotores');
    navigateTo('/progress');
    return;
  }

  loadProgress();
  loadPromotors();
});
</script>

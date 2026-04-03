<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <div>
        <h1 class="text-heading-xl text-heading mb-1">Progreso</h1>
        <p class="text-body-md text-muted">
          Seguimiento de objetivo mensual y logros alcanzados.
        </p>
      </div>
    </div>

    <ProgressSnapshotRow :progress="progress" />

    <v-row class="mt-2">
      <v-col cols="12" lg="7">
        <BaseTableCard
          title="Resumen del Objetivo"
          :headers="['Promotor', 'Meta', 'Vendido', 'Avance']"
          :items="summaryRows"
        >
          <template #row="{ item }">
            <td class="font-weight-bold">{{ item.promotorName }}</td>
            <td>{{ formatCurrency(item.target) }}</td>
            <td>{{ formatCurrency(item.totalSold) }}</td>
            <td class="font-weight-black text-brand-primary">{{ item.percentage.toFixed(2) }}%</td>
          </template>
        </BaseTableCard>
      </v-col>

      <v-col cols="12" lg="5">
        <ProgressAchievementsCard :progress="progress" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useNuxtApp } from '#imports';
import { toast } from 'vue-sonner';
import { useAuthStore } from '../../stores/auth';
import type { ProgressItem } from '../../types/progress';

const { $api } = useNuxtApp();
const authStore = useAuthStore();
const progress = ref<ProgressItem | null>(null);
const isLoading = ref(false);

const summaryRows = computed(() => (progress.value ? [progress.value] : []));
const { formatCurrency } = useProgressHelpers();

const loadProgress = async () => {
  const userId = authStore.user?.id;

  if (!userId) {
    toast.error('No se encontró la sesión del usuario para consultar su progreso');
    return;
  }

  isLoading.value = true;

  try {
    const response = await $api.get(`/progress/${userId}`);
    progress.value = response.data?.data ?? null;
  } catch (err) {
    toast.error('No se pudo descargar el progreso del usuario');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  authStore.restoreSession();
  loadProgress();
});
</script>

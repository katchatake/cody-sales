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

    <v-row>
      <v-col cols="12" md="4">
        <AppCard>
          <div class="text-overline text-muted mb-2">Vendido</div>
          <div class="text-heading-xl font-weight-black mb-1">
            {{ formatCurrency(progress?.totalSold ?? 0) }}
          </div>
          <div class="text-body-sm text-muted">
            Meta: {{ formatCurrency(progress?.target ?? 0) }}
          </div>
        </AppCard>
      </v-col>

      <v-col cols="12" md="4">
        <AppCard>
          <div class="text-overline text-muted mb-2">Cumplimiento</div>
          <div class="text-heading-xl font-weight-black mb-4">
            {{ progress?.percentage?.toFixed(2) ?? "0.00" }}%
          </div>
          <v-progress-linear
            :model-value="normalizedPercentage"
            color="brand-primary"
            bg-color="surface-subtle"
            rounded
            height="14"
          />
        </AppCard>
      </v-col>

      <v-col cols="12" md="4">
        <AppCard>
          <div class="text-overline text-muted mb-2">Estado</div>
          <v-chip
            :color="statusChip.color"
            variant="flat"
            size="large"
            class="font-weight-bold text-uppercase"
          >
            {{ statusChip.label }}
          </v-chip>
          <p class="text-body-sm text-muted mt-4 mb-0">
            Los logros se derivan del porcentaje actual devuelto por `progress/:userId`.
          </p>
        </AppCard>
      </v-col>
    </v-row>

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
        <AppCard>
          <h3 class="font-weight-black text-heading-md mb-4 text-heading">
            Logros Obtenidos
          </h3>

          <div v-if="milestones.length" class="d-flex flex-column gap-3">
            <div
              v-for="milestone in milestones"
              :key="milestone.threshold"
              class="milestone-item"
              :class="{ 'milestone-item--achieved': milestone.achieved }"
            >
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="font-weight-bold">{{ milestone.label }}</div>
                  <div class="text-body-sm text-muted">{{ milestone.description }}</div>
                </div>
                <v-chip
                  :color="milestone.achieved ? 'success-base' : 'surface-elevated'"
                  :variant="milestone.achieved ? 'flat' : 'outlined'"
                  size="small"
                  class="font-weight-bold"
                >
                  {{ milestone.achieved ? 'Obtenido' : 'Pendiente' }}
                </v-chip>
              </div>
            </div>
          </div>

          <p v-else class="text-body-md text-muted mb-0">
            No hay datos de progreso para este usuario en el periodo actual.
          </p>
        </AppCard>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useNuxtApp } from '#imports';
import { toast } from 'vue-sonner';
import { useAuthStore } from '../../stores/auth';
import type { MilestoneItem, ProgressItem } from '../../types/progress';

const { $api } = useNuxtApp();
const authStore = useAuthStore();
const progress = ref<ProgressItem | null>(null);
const isLoading = ref(false);

const normalizedPercentage = computed(() =>
  Math.min(progress.value?.percentage ?? 0, 100),
);

const summaryRows = computed(() => (progress.value ? [progress.value] : []));

const milestones = computed<MilestoneItem[]>(() => {
  const percentage = progress.value?.percentage ?? 0;

  return [
    {
      threshold: 50,
      label: 'Logro 50%',
      achieved: percentage >= 50,
      description: 'Alcanzar al menos la mitad de la meta mensual.',
    },
    {
      threshold: 80,
      label: 'Logro 80%',
      achieved: percentage >= 80,
      description: 'Mantener un avance fuerte sobre la meta del mes.',
    },
    {
      threshold: 100,
      label: 'Meta Completa',
      achieved: percentage >= 100,
      description: 'Cumplir completamente el objetivo asignado.',
    },
  ];
});

const statusChip = computed(() => {
  const percentage = progress.value?.percentage ?? 0;

  if (percentage >= 100) {
    return { label: 'Meta cumplida', color: 'success-base' };
  }

  if (percentage >= 80) {
    return { label: 'Muy cerca', color: 'info-base' };
  }

  if (percentage >= 50) {
    return { label: 'Buen avance', color: 'warning-base' };
  }

  return { label: 'En progreso', color: 'surface-elevated' };
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(value);

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

<style scoped>
.milestone-item {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 20px;
  padding: 16px;
  background: var(--v-theme-surface-base);
}

.milestone-item--achieved {
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.06);
}
</style>

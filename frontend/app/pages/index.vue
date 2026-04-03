<template>
  <div>
    <template v-if="!hydrated">
      <h1 class="text-heading-xl mb-2 text-left">Dashboard</h1>
      <p class="text-body-lg text-muted mb-8">
        Cargando resumen...
      </p>
    </template>

    <template v-else-if="isPromotor">
      <h1 class="text-heading-xl mb-2 text-left">Dashboard</h1>
      <p class="text-body-lg text-muted mb-8">
        Resumen de las métricas principales de Cody Sales.
      </p>

      <ProgressSnapshotRow class="mt-6" :progress="progress" sold-label="Ventas del Mes" target-label="Meta actual:">
        <template #third-card>
          <AppCard>
            <div class="text-overline text-muted mb-2">Ventas Registradas</div>
            <div class="text-heading-xl font-weight-black mb-1">
              {{ salesHistory.length }}
            </div>
            <div class="text-body-sm text-muted">
              Operaciones encontradas para el usuario autenticado.
            </div>
          </AppCard>
        </template>
      </ProgressSnapshotRow>

      <v-row class="mt-2">
        <v-col cols="12" lg="7">
          <BaseTableCard
            title="Ventas Recientes"
            :headers="['ID', 'Producto', 'Fecha', 'Cantidad', 'Importe']"
            :items="salesHistory"
          >
            <template #row="{ item }">
              <td class="font-weight-bold">#{{ item.id }}</td>
              <td class="text-subtitle-1">
                {{ item.product?.name || `Product ID: ${item.productId}` }}
              </td>
              <td class="text-muted">{{ formatDate(item.saleDate || item.createdAt) }}</td>
              <td class="font-weight-medium text-center">{{ item.quantity }}</td>
              <td class="font-weight-black text-success-base">{{ formatCurrency(item.total) }}</td>
            </template>
          </BaseTableCard>
        </v-col>

        <v-col cols="12" lg="5">
          <ProgressAchievementsCard :progress="progress" />
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <h1 class="text-heading-xl mb-2 text-left">Dashboard de Equipo</h1>
      <p class="text-body-lg text-muted mb-8">
        Vista consolidada de ventas, promotores y avance general.
      </p>

      <TeamProgressOverview
        class="mt-6"
        :progress-items="teamProgressItems"
        :promotors="promotors"
        :sales-count-by-promotor="salesCountByPromotor"
        :show-sales-count="true"
        table-title="Progreso y Ventas por Promotor"
      >
        <template #third-card>
          <AppCard>
            <div class="text-overline text-muted mb-2">Ventas Totales</div>
            <div class="text-heading-xl font-weight-black mb-1">
              {{ allSales.length }}
            </div>
            <div class="text-body-sm text-muted">
              Registros acumulados del equipo. Promotores activos: {{ promotors.length }}.
            </div>
          </AppCard>
        </template>
      </TeamProgressOverview>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useNuxtApp } from '#imports';
import { toast } from 'vue-sonner';
import { useAuthStore } from '../stores/auth';
import type { ProgressItem } from '../types/progress';
import type { SaleHistoryItem } from '../types/sales';
import type { GoalPromotor } from '../types/goals';

const { $api } = useNuxtApp();
const authStore = useAuthStore();

const salesHistory = ref<SaleHistoryItem[]>([]);
const allSales = ref<SaleHistoryItem[]>([]);
const progress = ref<ProgressItem | null>(null);
const teamProgressItems = ref<ProgressItem[]>([]);
const promotors = ref<GoalPromotor[]>([]);
const hydrated = ref(false);

const isPromotor = computed(() => authStore.user?.role?.toUpperCase() === 'PROMOTOR');
const { formatCurrency } = useProgressHelpers();

const salesCountByPromotor = computed<Record<number, number>>(() => {
  return allSales.value.reduce<Record<number, number>>((acc, sale) => {
    const promotorId = (sale as SaleHistoryItem & { promotorId?: number }).promotorId;
    if (promotorId) {
      acc[promotorId] = (acc[promotorId] || 0) + 1;
    }
    return acc;
  }, {});
});

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'N/a';

  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const loadUserSales = async () => {
  const userId = authStore.user?.id;

  if (!userId) {
    toast.error('No se encontró la sesión del usuario para cargar sus ventas');
    return;
  }

  try {
    const response = await $api.get(`/sales/${userId}`);
    salesHistory.value = response.data?.data ?? [];
  } catch {
    toast.error('No se pudieron cargar las ventas del usuario');
  }
};

const loadUserProgress = async () => {
  const userId = authStore.user?.id;

  if (!userId) {
    return;
  }

  try {
    const response = await $api.get(`/progress/${userId}`);
    progress.value = response.data?.data ?? null;
  } catch {
    toast.error('No se pudo descargar el progreso del usuario');
  }
};

const loadAllSales = async () => {
  try {
    const response = await $api.get('/sales');
    allSales.value = response.data?.data ?? [];
  } catch {
    toast.error('No se pudieron cargar las ventas globales');
  }
};

const loadTeamProgress = async () => {
  try {
    const response = await $api.get('/progress');
    teamProgressItems.value = response.data?.data ?? [];
  } catch {
    toast.error('No se pudo descargar el progreso general');
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
  hydrated.value = true;

  if (isPromotor.value) {
    loadUserSales();
    loadUserProgress();
    return;
  }

  loadAllSales();
  loadTeamProgress();
  loadPromotors();
});
</script>

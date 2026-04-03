<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <div>
        <h1 class="text-heading-xl text-heading mb-1">Metas</h1>
        <p class="text-body-md text-muted">
          Registra nuevas metas mensuales y consulta las metas existentes.
        </p>
      </div>
    </div>

    <v-row>
      <v-col cols="12" lg="5">
        <AppCard>
          <h2 class="text-heading-lg mb-6">Asignar Nueva Meta</h2>

          <v-form @submit.prevent="submitGoal" :disabled="isSubmitting">
            <AppInput
              v-model.number="goalForm.promotorId"
              type="number"
              min="1"
              label="ID del Promotor"
              icon="mdi-account-outline"
              class="mb-3"
            />

            <AppInput
              v-model.number="goalForm.target"
              type="number"
              min="1"
              step="0.01"
              label="Meta de Venta"
              icon="mdi-currency-usd"
              class="mb-3"
            />

            <v-select
              v-model="goalForm.month"
              :items="monthOptions"
              item-title="label"
              item-value="value"
              label="Mes"
              prepend-inner-icon="mdi-calendar-month-outline"
              variant="outlined"
              rounded="xl"
              class="mb-3"
            />

            <AppInput
              v-model.number="goalForm.year"
              type="number"
              min="2024"
              label="Año"
              icon="mdi-calendar-range"
              class="mb-6"
            />

            <div class="d-flex justify-end" style="gap: 16px;">
              <AppButton variant="ghost" @click="resetForm" :disabled="isSubmitting">
                Limpiar
              </AppButton>
              <AppButton type="submit" variant="primary" :loading="isSubmitting">
                Guardar Meta
              </AppButton>
            </div>
          </v-form>
        </AppCard>
      </v-col>

      <v-col cols="12" lg="7">
        <BaseTableCard
          title="Metas Registradas"
          :headers="['ID', 'Promotor', 'Meta', 'Mes', 'Año']"
          :items="goals"
        >
          <template #row="{ item }">
            <td class="font-weight-bold">#{{ item.id }}</td>
            <td>{{ item.promotorId }}</td>
            <td class="font-weight-black text-brand-primary">{{ formatCurrency(item.target) }}</td>
            <td>{{ monthName(item.month) }}</td>
            <td>{{ item.year }}</td>
          </template>
        </BaseTableCard>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { navigateTo, useNuxtApp } from '#imports';
import { toast } from 'vue-sonner';
import { useAuthStore } from '../../stores/auth';
import type { GoalItem, GoalPayload } from '../../types/goals';

const { $api } = useNuxtApp();
const authStore = useAuthStore();

const monthOptions = [
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 },
  { label: 'Noviembre', value: 11 },
  { label: 'Diciembre', value: 12 },
];

const now = new Date();
const defaultForm: GoalPayload = {
  promotorId: null,
  target: 0,
  month: now.getMonth() + 1,
  year: now.getFullYear(),
};

const goals = ref<GoalItem[]>([]);
const isSubmitting = ref(false);
const goalForm = ref<GoalPayload>({ ...defaultForm });

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(value);

const monthName = (month: number) =>
  monthOptions.find((item) => item.value === month)?.label ?? `Mes ${month}`;

const resetForm = () => {
  goalForm.value = { ...defaultForm };
};

const loadGoals = async () => {
  try {
    const response = await $api.get('/goals');
    goals.value = response.data?.data ?? [];
  } catch (err) {
    toast.error('No se pudieron cargar las metas registradas');
  }
};

const submitGoal = async () => {
  if (
    !goalForm.value.promotorId ||
    goalForm.value.target <= 0 ||
    !goalForm.value.month ||
    goalForm.value.year < 1900
  ) {
    toast.error('Completa correctamente promotor, meta, mes y año');
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      promotorId: Number(goalForm.value.promotorId),
      target: Number(goalForm.value.target),
      month: Number(goalForm.value.month),
      year: Number(goalForm.value.year),
    };

    await $api.post('/goals', payload);
    toast.success('Meta registrada correctamente');
    resetForm();
    loadGoals();
  } catch (err: any) {
    toast.error(err?.response?.data?.message || 'No se pudo registrar la meta');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  authStore.restoreSession();

  if (authStore.user?.role?.toUpperCase() === 'PROMOTOR') {
    toast.error('La sección de metas no está disponible para promotores');
    navigateTo('/');
    return;
  }

  loadGoals();
});
</script>

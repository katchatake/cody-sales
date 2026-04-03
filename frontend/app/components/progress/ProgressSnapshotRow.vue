<template>
  <v-row>
    <v-col cols="12" md="4">
      <AppCard>
        <div class="text-overline text-muted mb-2">{{ soldLabel }}</div>
        <div class="text-heading-xl font-weight-black mb-1">
          {{ formatCurrency(progress?.totalSold ?? 0) }}
        </div>
        <div class="text-body-sm text-muted">
          {{ targetLabel }} {{ formatCurrency(progress?.target ?? 0) }}
        </div>
      </AppCard>
    </v-col>

    <v-col cols="12" md="4">
      <AppCard>
        <div class="text-overline text-muted mb-2">Cumplimiento</div>
        <div class="text-heading-xl font-weight-black mb-4">
          {{ progress?.percentage?.toFixed(2) ?? '0.00' }}%
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
      <slot name="third-card">
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
      </slot>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ProgressItem } from '../../types/progress';

const props = withDefaults(defineProps<{
  progress: ProgressItem | null;
  soldLabel?: string;
  targetLabel?: string;
}>(), {
  soldLabel: 'Vendido',
  targetLabel: 'Meta:',
});

const normalizedPercentage = computed(() =>
  Math.min(props.progress?.percentage ?? 0, 100),
);

const { formatCurrency } = useProgressHelpers();

const statusChip = computed(() => {
  const percentage = props.progress?.percentage ?? 0;

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
</script>

<template>
  <div>
    <ProgressSnapshotRow
      :progress="aggregateProgress"
      :sold-label="soldLabel"
      :target-label="targetLabel"
    >
      <template #third-card>
        <slot name="third-card">
          <AppCard>
            <div class="text-overline text-muted mb-2">Promotores</div>
            <div class="text-heading-xl font-weight-black mb-1">
              {{ progressItems.length }}
            </div>
            <div class="text-body-sm text-muted">
              Promotores considerados en el resumen actual.
            </div>
          </AppCard>
        </slot>
      </template>
    </ProgressSnapshotRow>

    <v-row class="mt-2">
      <v-col cols="12" lg="7">
        <BaseTableCard
          :title="tableTitle"
          :headers="tableHeaders"
          :items="teamRows"
        >
          <template #row="{ item }">
            <td class="font-weight-bold">{{ item.name }}</td>
            <td v-if="showSalesCount">{{ item.salesCount }}</td>
            <td>{{ formatCurrency(item.totalSold) }}</td>
            <td>{{ formatCurrency(item.target) }}</td>
            <td class="font-weight-black text-brand-primary">{{ item.percentage.toFixed(2) }}%</td>
          </template>
        </BaseTableCard>
      </v-col>

      <v-col cols="12" lg="5">
        <ProgressAchievementsCard :progress="aggregateProgress" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { GoalPromotor } from '../../types/goals';
import type { ProgressItem } from '../../types/progress';

const props = withDefaults(defineProps<{
  progressItems: ProgressItem[];
  promotors: GoalPromotor[];
  salesCountByPromotor?: Record<number, number>;
  soldLabel?: string;
  targetLabel?: string;
  tableTitle?: string;
  showSalesCount?: boolean;
}>(), {
  soldLabel: 'Venta Consolidada',
  targetLabel: 'Meta consolidada:',
  tableTitle: 'Progreso por Promotor',
  showSalesCount: false,
});

const { buildAggregateProgress, formatCurrency } = useProgressHelpers();

const aggregateProgress = computed(() => buildAggregateProgress(props.progressItems));

const tableHeaders = computed(() => {
  if (props.showSalesCount) {
    return ['Promotor', 'Ventas', 'Vendido', 'Meta', 'Avance'];
  }

  return ['Promotor', 'Vendido', 'Meta', 'Avance'];
});

const teamRows = computed(() => {
  return props.promotors.map((promotor) => {
    const progressItem = props.progressItems.find((item) => item.promotorId === promotor.id);

    return {
      id: promotor.id,
      name: promotor.name,
      salesCount: props.salesCountByPromotor?.[promotor.id] || 0,
      totalSold: progressItem?.totalSold || 0,
      target: progressItem?.target || 0,
      percentage: progressItem?.percentage || 0,
    };
  });
});
</script>

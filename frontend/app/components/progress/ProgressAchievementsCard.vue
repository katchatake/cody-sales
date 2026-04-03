<template>
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MilestoneItem, ProgressItem } from '../../types/progress';

const props = defineProps<{
  progress: ProgressItem | null;
}>();

const milestones = computed<MilestoneItem[]>(() => {
  const percentage = props.progress?.percentage ?? 0;

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

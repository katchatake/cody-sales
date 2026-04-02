<template>
  <div>
    <h1 class="text-heading-xl mb-2 text-left">Dashboard</h1>
    <p class="text-body-lg text-muted mb-8">Resumen de las métricas principales de Cody Sales.</p>

    <!-- Activity Row -->
    <v-row class="mt-6">
      <v-col cols="12" lg="4">
        <BaseTableCard 
          title="Ventas Recientes" 
          :headers="['ID Venta', 'Fecha', 'Monto', 'Estado', '']" 
          :items="recentActivity"
        >
          <template #row="{ item }">
            <td class="text-heading-sm font-weight-bold">{{ item.id }}</td>
            <td class="text-muted font-weight-medium">{{ item.date }}</td>
            <td class="font-weight-black">${{ item.amount }}</td>
            <td>
              <v-chip :color="item.statusColor" size="small" variant="flat" class="font-weight-bold text-uppercase px-3">
                {{ item.status }}
              </v-chip>
            </td>
            <td class="text-right">
              <v-btn icon="mdi-dots-vertical" variant="text" size="small" color="grey-darken-1"></v-btn>
            </td>
          </template>
        </BaseTableCard>
      </v-col>
      <v-col cols="12" lg="4">
        <BaseTableCard 
          title="Reconocimientos" 
          :headers="['Fecha', 'Monto', 'Estado']" 
          :items="progress"
        >
          <template #row="{ item }">
            <td class="text-muted font-weight-medium">{{ item.date }}</td>
            <td class="font-weight-black">${{ item.amount }}</td>
            <td>
              <v-chip :color="item.statusColor" size="small" variant="flat" class="font-weight-bold text-uppercase px-3">
                {{ item.status }}
              </v-chip>
            </td>
          </template>
        </BaseTableCard>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card
          class="shadow-lg rounded-xl pa-8 h-100 border-0 d-flex flex-column justify-center align-center text-center banner-card"
          elevation="0">
          <v-avatar size="90" class="mb-5 shadow-base bg-surface-base">
            <v-icon color="brand-primary" size="48">mdi-rocket-launch</v-icon>
          </v-avatar>
          <h3 class="text-heading-lg mb-3 text-surface-base">¡Excelente!</h3>
          <p class="text-body-md mb-8 text-surface-base opacity-90">Las ventas esta semana han superado la meta esperada
            por
            un 24%.</p>
          <v-btn color="surface-base" variant="elevated" size="large"
            class="text-brand-primary font-weight-bold shadow-base" rounded="pill" block>
            Ver Reporte Completo
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fondoColor = (colorName: string) => {
  // Helpers para forzar fondos en caso de fallar los lighten
  const colors: Record<string, string> = {
    primary: '#eff6ff', // bg-blue-50
    secondary: '#f0f9ff',
    info: '#f0fdf4',
    warning: '#fffbeb'
  };
  return colors[colorName] || '#f3f4f6';
}

const recentActivity = ref([
  { id: '#TRX-9481', date: '02 Abril 2026', amount: '250.00', status: 'Exitoso', statusColor: 'success-base' },
  { id: '#TRX-9482', date: '02 Abril 2026', amount: '120.50', status: 'Pendiente', statusColor: 'warning-base' },
  { id: '#TRX-9483', date: '01 Abril 2026', amount: '940.00', status: 'Exitoso', statusColor: 'success-base' },
  { id: '#TRX-9484', date: '01 Abril 2026', amount: '45.00', status: 'Rechazado', statusColor: 'error-base' },
  { id: '#TRX-9485', date: '31 Marzo 2026', amount: '530.25', status: 'Exitoso', statusColor: 'success-base' },
]);

const progress = ref([
  { date: '02 Abril 2026', amount: '250.00', status: 'Exitoso', statusColor: 'success-base' },
  { date: '02 Abril 2026', amount: '120.50', status: 'Pendiente', statusColor: 'warning-base' },
  { date: '01 Abril 2026', amount: '940.00', status: 'Exitoso', statusColor: 'success-base' },
  { date: '01 Abril 2026', amount: '45.00', status: 'Rechazado', statusColor: 'error-base' },
  { date: '31 Marzo 2026', amount: '530.25', status: 'Exitoso', statusColor: 'success-base' },
]);
</script>

<style scoped>
.hover-lift {
  cursor: pointer;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}

.hover-bg {
  transition: background-color 0.2s ease;
}

.hover-bg:hover {
  background-color: #f8fafc !important;
}

.banner-card {
  background: linear-gradient(135deg, #60a5fa 0%, #1e3a8a 100%);
}

.opacity-90 {
  opacity: 0.9;
}
</style>

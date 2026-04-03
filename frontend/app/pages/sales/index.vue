<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <div>
        <h1 class="text-heading-xl text-heading mb-1">Ventas y Facturación</h1>
        <p class="text-body-md text-muted">Añade elementos nuevos y explora el historial de ventas operativas.</p>
      </div>
      <AppButton variant="primary" size="large" prepend-icon="mdi-plus" @click="isModalOpen = true">
        Registrar Venta
      </AppButton>
    </div>

    <!-- Historial Table -->
    <BaseTableCard title="Explorador de Transacciones"
      :headers="['ID', 'Producto', 'Fecha Operación', 'Cantidad', 'Importe ($)']" :items="salesHistory">
      <template #row="{ item }">
        <td class="font-weight-bold">#{{ item.id }}</td>
        <td class="text-subtitle-1">{{ getProductName(item.productId) || item.product?.name || `Product ID:
          ${item.productId}` }}</td>
        <td class="text-muted">{{ formatDate(item.saleDate || item.createdAt) }}</td>
        <td class="font-weight-medium text-center">{{ item.quantity }}</td>
        <td class="font-weight-black text-success-base">${{ item.total }}</td>
      </template>
    </BaseTableCard>

    <!-- Modal Registro -->
    <v-dialog v-model="isModalOpen" max-width="550" persistent>
      <AppCard variant="info" padded="large">
        <div class="d-flex align-center justify-space-between mb-6">
          <h2 class="text-heading-lg">Registrar Nueva Venta</h2>
          <v-btn icon="mdi-close" variant="text" @click="closeModal" density="comfortable"
            color="grey-darken-1"></v-btn>
        </div>

        <v-form @submit.prevent="submitSale" :disabled="isSubmitting">
          <!-- Dropdown the Catálogo -->
          <v-select v-model="saleForm.productId" :items="products" item-title="name" item-value="id"
            label="Selecciona un Producto" prepend-inner-icon="mdi-package-variant-closed" class="mb-2" required
            :rules="[v => !!v || 'Debes seleccionar un producto válido']" @update:modelValue="calculateTotal"
            variant="outlined" rounded="xl"></v-select>

          <!-- Input Cantidad -->
          <AppInput v-model.number="saleForm.quantity" type="number" min="1" label="Cantidad" icon="mdi-numeric"
            class="mb-2" required :rules="[v => v > 0 || 'Debes ingresar una cantidad válida']"
            @input="calculateTotal" />

          <!-- Total a Inyectar -->
          <AppInput v-model.number="saleForm.total" type="number" step="0.01" label="Monto Total a Cobrar $"
            icon="mdi-currency-usd" class="mb-6" required :rules="[v => v > 0 || 'El total debe ser positivo']" />

          <div class="d-flex justify-end gap-3" style="gap: 16px;">
            <AppButton variant="ghost" @click="closeModal" :disabled="isSubmitting">Cancelar</AppButton>
            <AppButton type="submit" variant="primary" :loading="isSubmitting" prepend-icon="mdi-check">Confirmar Compra
            </AppButton>
          </div>
        </v-form>
      </AppCard>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#imports';
import { toast } from 'vue-sonner';
import { useAuthStore } from '../../stores/auth';
import type { Product, SalePayload, SaleHistoryItem } from '../../types/sales';

const { $api } = useNuxtApp();
const authStore = useAuthStore();

const isModalOpen = ref(false);
const isSubmitting = ref(false);

const products = ref<Product[]>([]);
const salesHistory = ref<SaleHistoryItem[]>([]);

const defaultForm: SalePayload = {
  productId: null as any,
  quantity: 1,
  total: 0
};

const saleForm = ref<SalePayload>({ ...defaultForm });

const loadProducts = async () => {
  try {
    const res = await $api.get('/products');
    products.value = res.data?.data || res.data || [];
  } catch (err) {
    toast.error('Error al sincronizar base de productos disponibles');
  }
};

const loadSales = async () => {
  const userId = authStore.user?.id;

  if (!userId) {
    toast.error('No se encontró la sesión del usuario para cargar sus ventas');
    return;
  }

  try {
    const res = await $api.get(`/sales/${userId}`);
    salesHistory.value = res.data?.data || res.data || [];
  } catch (err) {
    toast.error('No se pudo descargar el registro de ventas históricas');
  }
};

const getProductName = (id: number): string | null => {
  const match = products.value.find(p => p.id === id);
  return match ? match.name : null;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'N/a';
  return new Date(dateStr).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// Auto-fill total strictly si el modelo del backend expone un precio local. Si no, lo dejamos libre.
const calculateTotal = () => {
  if (!saleForm.value.productId) return;
  const match = products.value.find(p => p.id === saleForm.value.productId);

  if (match && match.price && saleForm.value.quantity) {
    saleForm.value.total = match.price * saleForm.value.quantity;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  saleForm.value = { ...defaultForm };
};

const submitSale = async () => {
  if (!saleForm.value.productId || saleForm.value.quantity < 1 || saleForm.value.total <= 0) {
    toast.error("Por favor completa los campos correctamente");
    return;
  }

  isSubmitting.value = true;
  try {
    const apiPayload = {
      productId: Number(saleForm.value.productId),
      quantity: Number(saleForm.value.quantity),
      total: Number(saleForm.value.total)
    };

    const res = await $api.post('/sales', apiPayload);

    console.log(res);
    console.log(res.headers['x-process-goal']);
    // Si la venta destraba el logro / milestone emitido en el encabezado
    if (res.headers && res.headers['x-process-goal']) {
      toast.info(res.headers['x-process-goal']);
    }

    toast.success('Validado con éxito y registrado.');
    closeModal();
    loadSales();
  } catch (err: any) {
    toast.error(err?.response?.data?.message || 'Error de procesamiento en la caja.');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  authStore.restoreSession();
  loadProducts();
  loadSales();
});
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <div>
        <h1 class="text-heading-xl text-heading mb-1">Ventas</h1>
        <p class="text-body-md text-muted">
          Añade elementos nuevos y explora el historial de ventas operativas.
        </p>
      </div>
      <AppButton variant="primary" size="large" prepend-icon="mdi-plus" @click="isModalOpen = true">
        Registrar Venta
      </AppButton>
    </div>

    <BaseTableCard title="Explorador de Transacciones"
      :headers="['ID', 'Producto', 'Fecha Operación', 'Cantidad', 'Importe ($)']" :items="salesHistory">
      <template #row="{ item }">
        <td class="font-weight-bold">#{{ item.id }}</td>
        <td class="text-subtitle-1">
          {{ getProductName(item.productId) || item.product?.name || `Product ID: ${item.productId}` }}
        </td>
        <td class="text-muted">{{ formatDate(item.saleDate || item.createdAt) }}</td>
        <td class="font-weight-medium text-center">{{ item.quantity }}</td>
        <td class="font-weight-black text-success-base">{{ formatCurrency(item.total) }}</td>
      </template>
    </BaseTableCard>

    <v-dialog v-model="isModalOpen" max-width="760" persistent>
      <AppCard variant="info" padded="large">
        <div class="d-flex align-center justify-space-between mb-6">
          <div>
            <h2 class="text-heading-lg mb-1">Registrar Nueva Venta</h2>
            <p class="text-body-sm text-muted mb-0">
              Puedes agregar varios productos dentro de un solo registro.
            </p>
          </div>
          <v-btn icon="mdi-close" variant="text" @click="closeModal" density="comfortable" color="grey-darken-1" />
        </div>

        <v-form @submit.prevent="submitSale" :disabled="isSubmitting">
          <div class="d-flex flex-column sales-lines">
            <div v-for="(item, index) in saleItems" :key="index" class="sales-line">
              <div class="d-flex align-center justify-space-between mb-4">
                <div class="text-subtitle-1 font-weight-bold">
                  Producto {{ index + 1 }}
                </div>
                <AppButton v-if="saleItems.length > 1" variant="ghost" icon="mdi-delete-outline"
                  @click="removeSaleItem(index)" />
              </div>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select v-model="item.productId" :items="products" item-title="name" item-value="id"
                    label="Selecciona un Producto" prepend-inner-icon="mdi-package-variant-closed" required
                    :rules="[v => !!v || 'Debes seleccionar un producto válido']"
                    @update:modelValue="calculateLineTotal(index)" variant="outlined" rounded="xl" />
                </v-col>

                <v-col cols="12" md="3">
                  <AppInput v-model.number="item.quantity" type="number" min="1" label="Cantidad" required
                    :rules="[v => v > 0 || 'Debes ingresar una cantidad válida']" @input="calculateLineTotal(index)" />
                </v-col>

                <v-col cols="12" md="3">
                  <AppInput v-model.number="item.total" type="number" step="0.01" min="0" label="Monto Total"
                    icon="mdi-currency-usd" required :rules="[v => v > 0 || 'El total debe ser positivo']" />
                </v-col>
              </v-row>
            </div>
          </div>

          <div class="d-flex align-center justify-space-between mt-6 mb-4 flex-wrap" style="gap: 16px;">
            <AppButton variant="ghost" prepend-icon="mdi-plus" @click="addSaleItem">
              Agregar Producto
            </AppButton>

            <div class="text-right">
              <div class="text-body-sm text-muted">Total acumulado</div>
              <div class="text-heading-md font-weight-black">
                {{ formatCurrency(grandTotal) }}
              </div>
            </div>
          </div>

          <div class="d-flex justify-end" style="gap: 16px;">
            <AppButton variant="ghost" @click="closeModal" :disabled="isSubmitting">Cancelar</AppButton>
            <AppButton type="submit" variant="primary" :loading="isSubmitting" prepend-icon="mdi-check">
              Confirmar Compra
            </AppButton>
          </div>
        </v-form>
      </AppCard>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useNuxtApp } from '#imports';
import { toast } from 'vue-sonner';
import { useAuthStore } from '../../stores/auth';
import type { CreateSalesPayload, Product, SaleHistoryItem, SalePayload } from '../../types/sales';

const { $api } = useNuxtApp();
const authStore = useAuthStore();

const isModalOpen = ref(false);
const isSubmitting = ref(false);
const products = ref<Product[]>([]);
const salesHistory = ref<SaleHistoryItem[]>([]);

const createEmptySaleItem = (): SalePayload => ({
  productId: null,
  quantity: 1,
  total: 0,
});

const saleItems = ref<SalePayload[]>([createEmptySaleItem()]);

const grandTotal = computed(() =>
  saleItems.value.reduce((sum, item) => sum + (Number(item.total) || 0), 0),
);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(value);

const loadProducts = async () => {
  try {
    const res = await $api.get('/products');
    products.value = res.data?.data || res.data || [];
  } catch {
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
  } catch {
    toast.error('No se pudo descargar el registro de ventas históricas');
  }
};

const getProductName = (id: number): string | null => {
  const match = products.value.find((product) => product.id === id);
  return match ? match.name : null;
};

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

const calculateLineTotal = (index: number) => {
  const currentItem = saleItems.value[index];

  if (!currentItem?.productId) {
    return;
  }

  const match = products.value.find((product) => product.id === currentItem.productId);

  if (match && currentItem.quantity) {
    currentItem.total = match.price * currentItem.quantity;
  }
};

const addSaleItem = () => {
  saleItems.value.push(createEmptySaleItem());
};

const removeSaleItem = (index: number) => {
  saleItems.value.splice(index, 1);
};

const resetForm = () => {
  saleItems.value = [createEmptySaleItem()];
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

const submitSale = async () => {
  const hasInvalidItem = saleItems.value.some(
    (item) => !item.productId || item.quantity < 1 || item.total <= 0,
  );

  if (hasInvalidItem) {
    toast.error('Por favor completa correctamente todos los productos');
    return;
  }

  isSubmitting.value = true;

  try {
    const apiPayload: CreateSalesPayload = {
      items: saleItems.value.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        total: Number(item.total),
      })),
    };

    const res = await $api.post('/sales', apiPayload);

    if (res.headers && res.headers['x-process-goal']) {
      toast.info(res.headers['x-process-goal']);
    }

    toast.success('Ventas registradas correctamente.');
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

<style scoped>
.sales-lines {
  gap: 16px;
}

.sales-line {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.55);
}
</style>

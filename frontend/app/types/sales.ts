export interface Product {
  id: number;
  name: string;
  price: number;
  // Puede incluir otras dependiendo del Prisma Schema, nos interesan stas principalmente.
}

export interface SalePayload {
  productId: number;
  quantity: number;
  total: number;
}

export interface SaleHistoryItem {
  id: number;
  productId: number;
  quantity: number;
  total: number;
  saleDate: string;
  product?: Product;
}

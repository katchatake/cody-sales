"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
class Sale {
    id;
    promotorId;
    productId;
    quantity;
    total;
    saleDate;
    createdAt;
    product;
    constructor(id, promotorId, productId, quantity, total, saleDate, createdAt, product // allows fetching relational data from Prima via include: { product: true }
    ) {
        this.id = id;
        this.promotorId = promotorId;
        this.productId = productId;
        this.quantity = quantity;
        this.total = total;
        this.saleDate = saleDate;
        this.createdAt = createdAt;
        this.product = product;
    }
}
exports.Sale = Sale;

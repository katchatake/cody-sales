"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    id;
    name;
    price;
    categoryId;
    createdAt;
    updatedAt;
    category;
    constructor(id, name, price, categoryId, createdAt, updatedAt, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.category = category;
    }
}
exports.Product = Product;

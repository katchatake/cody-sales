"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    id;
    name;
    description;
    createdAt;
    updatedAt;
    constructor(id, name, description, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Category = Category;

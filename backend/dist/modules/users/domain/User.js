"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    role;
    name;
    createdAt;
    constructor(id, email, role, name, createdAt) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.name = name;
        this.createdAt = createdAt;
    }
}
exports.User = User;

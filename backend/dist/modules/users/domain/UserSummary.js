"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSummary = void 0;
class UserSummary {
    id;
    name;
    email;
    role;
    createdAt;
    constructor(id, name, email, role, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
    }
}
exports.UserSummary = UserSummary;

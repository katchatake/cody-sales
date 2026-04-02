"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlUserRepository = void 0;
const User_1 = require("../domain/User");
const database_1 = require("../../../config/database");
class MysqlUserRepository {
    async save(user) {
        const [result] = await database_1.pool.query('INSERT INTO users (email, role, name) VALUES (?, ?, ?)', [user.email, user.role, user.name]);
        return new User_1.User(result.insertId, user.email, user.role, user.name);
    }
    async findByEmail(email) {
        const [rows] = await database_1.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0)
            return null;
        const row = rows[0];
        return new User_1.User(row.id, row.email, row.role, row.name, row.createdAt);
    }
    async findById(id) {
        const [rows] = await database_1.pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0)
            return null;
        const row = rows[0];
        return new User_1.User(row.id, row.email, row.role, row.name, row.createdAt);
    }
}
exports.MysqlUserRepository = MysqlUserRepository;

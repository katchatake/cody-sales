"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goal = void 0;
class Goal {
    id;
    promotorId;
    target;
    month;
    year;
    createdAt;
    updatedAt;
    constructor(id, promotorId, target, month, year, createdAt, updatedAt) {
        this.id = id;
        this.promotorId = promotorId;
        this.target = target;
        this.month = month;
        this.year = year;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Goal = Goal;

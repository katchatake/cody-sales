"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
class Progress {
    promotorId;
    promotorName;
    totalSold;
    target;
    percentage;
    constructor(promotorId, promotorName, totalSold, target, percentage) {
        this.promotorId = promotorId;
        this.promotorName = promotorName;
        this.totalSold = totalSold;
        this.target = target;
        this.percentage = percentage;
    }
}
exports.Progress = Progress;

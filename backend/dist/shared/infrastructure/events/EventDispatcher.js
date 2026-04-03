"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
const events_1 = require("events");
class DomainEventDispatcher extends events_1.EventEmitter {
}
exports.EventDispatcher = new DomainEventDispatcher();

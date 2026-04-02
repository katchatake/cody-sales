import { EventEmitter } from "events";

class DomainEventDispatcher extends EventEmitter {}

export const EventDispatcher = new DomainEventDispatcher();

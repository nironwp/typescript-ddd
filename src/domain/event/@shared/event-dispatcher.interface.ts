import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
    eventHandlers: Map<string, EventHandlerInterface<EventInterface>[]>

    getEventHandlers(eventName: string): EventHandlerInterface<EventInterface>[];
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
}
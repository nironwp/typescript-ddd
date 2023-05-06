import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from './event.interface';

export default class EventDispatcher implements EventDispatcherInterface {

    eventHandlers: Map<string, EventHandlerInterface<EventInterface>[]> = new Map();


    getEventHandlers(eventName: string): EventHandlerInterface<EventInterface>[] {
        return this.eventHandlers.get(eventName) || [];
    }


    notify(event: EventInterface): void {
        const eventName = event.name;

        if (this.eventHandlers.has(eventName)) {
            const handlers = this.eventHandlers.get(eventName);
            handlers.forEach((handler) => {
                handler.handle(event);
            })
        }

    }
    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers.has(eventName)) {
            this.eventHandlers.set(eventName, []);
        }

        this.eventHandlers.get(eventName).push(eventHandler);
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers.has(eventName)) return;

        const eventHandlers = this.eventHandlers.get(eventName).filter((handler) => {
            return handler !== eventHandler;
        });

        this.eventHandlers.set(eventName, eventHandlers);

    }
    unregisterAll(): void {
        this.eventHandlers.clear();
    }
}
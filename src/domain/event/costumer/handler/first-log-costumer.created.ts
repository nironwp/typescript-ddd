import EventHandlerInterface from "../../@shared/event-handler.interface";
import { CostumerCreatedEvent } from "../costumer-created.event";

export default class FirstLogCostumerCreated implements EventHandlerInterface<CostumerCreatedEvent> {
    handle(event: any) {
        console.log("Esse é o primeiro console.log do evento: costumer.created")
    }
}
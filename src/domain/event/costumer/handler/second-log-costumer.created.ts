import EventHandlerInterface from "../../@shared/event-handler.interface";
import { CostumerCreatedEvent } from "../costumer-created.event";

export default class SecondLogCostumerCreated implements EventHandlerInterface<CostumerCreatedEvent> {
    handle(event: any) {
        console.log("Esse é o segundo console.log do evento: costumer.created")
    }
}
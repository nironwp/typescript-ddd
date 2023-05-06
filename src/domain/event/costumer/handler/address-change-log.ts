import EventHandlerInterface from "../../@shared/event-handler.interface";
import { CostumerCreatedEvent } from "../costumer-created.event";
import NotifyAddressChangeEvent from "../notify-address.event";

export default class NotifyAddressChangedHandler implements EventHandlerInterface<NotifyAddressChangeEvent> {
    handle(event: NotifyAddressChangeEvent): void {
        console.log(`Endereço do cliente: ${event.data.id}, ${event.data.name} alterado para: ${event.data.address}`)
    }
}
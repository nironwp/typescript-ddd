import EventInterface from "../@shared/event.interface";

export class CostumerCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    name: string;
    data: any;

    constructor(data: any) {
        this.data = data;
        this.dataTimeOcurred = new Date();
        this.name = 'costumer.created'
    }
}
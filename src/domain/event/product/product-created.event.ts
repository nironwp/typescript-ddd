import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    data: any
    dataTimeOcurred: Date;
    name: string;
    constructor(data: any) {
        this.data = data;
        this.dataTimeOcurred = new Date();
        this.name = 'product.created'
    }
}
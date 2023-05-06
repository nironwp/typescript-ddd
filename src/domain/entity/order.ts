import OrderItem from "./OrderItem";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total;

    constructor(id: string, customerID: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerID;
        this._items = items;
        this._total = this.total();
        this.validate();
    }


    showTotal(): number {
        return this._total;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items is required");
        }
    }

    addOrderItem(orderItem: OrderItem) {
        this._items.push(orderItem);
        this._total = this.total();
    }

    get customerId(): string {
        return this._customerId
    }

    get items(): OrderItem[] {
        return this._items;
    }

    get id(): string {
        return this._id
    }
    total(): number {
        return this._items.reduce((total, item) => total + item.orderItemTotal(), 0)
    }
} 
export default class OrderItems {
    _id: string;
    _name: string;
    _price: number;
    _quantity: number;
    _productID: string;
    constructor(
        id: string,
        name: string,
        price: number,
        quantity: number,
        productID: string
    ) {
        this._quantity = quantity;
        this._id = id;
        this._name = name;
        this._price = price;
        this._productID = productID;
    }

    get quantity(): number {
        return this._quantity
    }

    get productId(): string {
        return this._productID
    }

    get price(): number {
        return this._price
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    orderItemTotal() {
        return this._price * this._quantity;
    }
}
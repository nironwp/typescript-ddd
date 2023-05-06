import OrderItem from "../entity/OrderItem";
import Customer from "../entity/customer";
import Order from "../entity/order";

export class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((total, order) => {
            return total + order.showTotal()
        }, 0)
    }

    static placeOrder(customer: Customer, orders: OrderItem[]) {
        orders.forEach(order => { customer.addRewardPoints(order.orderItemTotal()) })
    }
}
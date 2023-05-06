import OrderItem from '../entity/OrderItem';
import Customer from '../entity/customer';
import Order from '../entity/order';
import { OrderService } from './order.service';
describe("Order service unit tests", () => {
    it('should get total of all orders', () => {
        const orderItem = new OrderItem('product1', '10', 10, 1, '1')
        const orderItem2 = new OrderItem('product2', '20', 20, 2, '2')
        const orderItem3 = new OrderItem('product3', '30', 30, 3, '3')

        const order = new Order('1', 'c1', [orderItem, orderItem2, orderItem3])
        const orde2 = new Order('1', 'c1', [orderItem, orderItem2, orderItem3])

        const total = OrderService.total([order, orde2])

        expect(total).toBe(280)
    })

    it('should place an order', () => {
        const item = new OrderItem('od1', 'item 1', 10, 1, 'p1')
        const customer = new Customer('c1', 'customer 1')

        OrderService.placeOrder(customer, [item])

        expect(customer.rewardPoints).toBe(10)
    })
})
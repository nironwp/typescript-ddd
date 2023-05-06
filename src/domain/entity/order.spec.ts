import OrderItem from "./OrderItem"
import Order from "./order"

describe('Order unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const order = new Order('', '1', [])
        }).toThrowError('Id is required')
    })

    it('should throw error when customerId is empty', () => {
        expect(() => {
            const order = new Order('1', '', [])
        }).toThrowError('CustomerId is required')
    })

    it('should throw error when items is empty', () => {
        expect(() => {
            const order = new Order('1', '1', [])
        }).toThrowError('Items is required')
    })

    it('should calculate total', () => {
        const order = new Order('1', '1', [
            new OrderItem('1', 'Item 1', 10, 1, '1'),
            new OrderItem('1', 'Item 1', 20, 1, '1'),
        ])

        expect(order.total()).toBe(30)
    })

    it('should get a id', () => {
        const order = new Order('1', '1', [
            new OrderItem('1', 'Item 1', 10, 1, '1'),
            new OrderItem('1', 'Item 1', 20, 1, '1'),
        ])

        expect(order.id).toBe('1')
    })

    it('shoud total be correct in initialize', () => {
        const order = new Order('1', '1', [
            new OrderItem('1', 'Item 1', 10, 1, '1'),
            new OrderItem('1', 'Item 1', 20, 2, '1'),
        ])

        expect(order.showTotal()).toBe(50)
    })

})
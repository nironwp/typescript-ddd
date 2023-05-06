import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer-repository"
import Customer from "../../domain/entity/customer"
import Address from '../../domain/value-object/address';
import { AllOpts } from "../../domain/repository/repository-interface"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product-repository";
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/OrderItem";
import OrderRepository from "./order.repository";
import OrderItemModel from "../db/sequelize/model/order.item.model";
import OrderModel from "../db/sequelize/model/order.model";

describe('Order repository test', () => {
    let sequelize: Sequelize
    let orderRepository: OrderRepository
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        orderRepository = new OrderRepository()
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)
        await customerRepository.save(customer)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 1000)

        await productRepository.save(product)

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        )

        const order = new Order('1', customer.id, [orderItem])

        await orderRepository.save(order)

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ['items']
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: '1',
            customer_id: '1',
            total: 2000,
            items: [
                {
                    id: '1',
                    name: 'Product 1',
                    price: 1000,
                    quantity: 2,
                    order_id: '1',
                    product_id: '1'
                }
            ]
        })
    })

    it('should find a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)
        await customerRepository.save(customer)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 1000)

        await productRepository.save(product)

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        )

        const order = new Order('1', customer.id, [orderItem])

        await orderRepository.save(order)

        const order_model = await orderRepository.find(order.id)

        expect(order_model).toStrictEqual(order)
    })

    it('should update a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)
        await customerRepository.save(customer)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 1000)

        await productRepository.save(product)

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        )

        const order = new Order('1', customer.id, [orderItem])

        await orderRepository.save(order)


        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            3,
            product.id
        )

        order.addOrderItem(orderItem2)

        await orderRepository.update(order)

        const order_model = await orderRepository.find(order.id)

        expect(order_model).toStrictEqual(order)
    })

    it('should not return a order not exists when update', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)
        await customerRepository.save(customer)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 1000)

        await productRepository.save(product)

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        )

        const order = new Order('1', customer.id, [orderItem])

        await orderRepository.save(order)


        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            3,
            product.id
        )

        order.addOrderItem(orderItem2)

        await orderRepository.update(order)
        await orderRepository.delete(order)
        const order_model = await orderRepository.find(order.id)

        expect(order_model).toBeUndefined()
    })

    it('should delete a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)
        await customerRepository.save(customer)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 1000)

        await productRepository.save(product)

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id
        )

        const order = new Order('1', customer.id, [orderItem])

        await orderRepository.save(order)

        await orderRepository.delete(order)

        const order_find = await orderRepository.find(order.id)
        expect(order_find).toBeUndefined()
    })

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)
        await customerRepository.save(customer)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 1000)

        await productRepository.save(product)

        const value_to = 10;

        for (let i = 1; i <= value_to; i++) {
            const orderItem = new OrderItem(
                `${i}`,
                product.name,
                product.price,
                2,
                product.id
            )

            const order = new Order(`${i}`, customer.id, [orderItem])

            await orderRepository.save(order)
        }

        const opts: AllOpts = {
            limit: value_to,
            offset: 0,
            include: [OrderItemModel]
        }

        const orders = await orderRepository.findAll(opts)

        expect(orders.length).toBe(value_to)
    })
})

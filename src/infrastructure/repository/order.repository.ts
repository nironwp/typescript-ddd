import OrderItem from "../../domain/entity/OrderItem";
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import { AllOpts } from '../../domain/repository/repository-interface';
import OrderItemModel from "../db/sequelize/model/order.item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { Sequelize } from "sequelize-typescript";
export default class OrderRepository implements OrderRepositoryInterface {
    async save(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            items: entity.items.map((item) => ({
                id: item.id,
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                total: item.orderItemTotal()
            })),
            total: entity.total()
        }, {
            include: [OrderItemModel]
        })
    }
    async update(entity: Order): Promise<void> {
        const order_from_db = await this.find(entity.id)

        if (!order_from_db) return;

        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total()
            },
            {
                where: {
                    id: entity.id
                }
            }
        )

        for (const item of entity.items) {
            const item_from_db = order_from_db.items.find((i) => i.id === item.id)

            if (!item_from_db) {
                await OrderItemModel.create({
                    id: item.id,
                    order_id: entity.id,
                    product_id: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name,
                    total: item.orderItemTotal()
                })
            } else {
                await OrderItemModel.update(
                    {
                        product_id: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        name: item.name,
                        total: item.orderItemTotal()
                    },
                    {
                        where: {
                            id: item.id
                        }
                    }
                )
            }
        }
    }
    async delete(entity: Order): Promise<void> {
        await OrderModel.destroy({
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<Order> {
        const order_model = await OrderModel.findOne({
            where: {
                id
            },
            include: [OrderItemModel]
        })


        if (!order_model) return;

        const items = order_model.items.map((item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id))

        const order = new Order(order_model.id, order_model.customer_id, items)

        return order
    }
    async findAll(opts: AllOpts): Promise<Order[]> {
        const OrderModels = await OrderModel.findAll(opts)

        return OrderModels.map((order_model) => {
            console.log(order_model)
            const order_items = order_model.items.map((item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id))

            return new Order(order_model.id, order_model.customer_id, order_items)
        })
    }


}
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import { AllOpts } from "../../domain/repository/repository-interface";
import Address from "../../domain/value-object/address";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async save(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        })
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id
            }
        })
    }
    async delete(entity: Customer): Promise<void> {
        await CustomerModel.destroy({
            where: {
                id: entity.id
            }
        })
    }

    private parseCustomer(customerModel: CustomerModel): Customer {
        const customer = new Customer(customerModel.id, customerModel.name)
        customer.addRewardPoints(customerModel.rewardPoints)
        customer.setActive(customerModel.active)

        const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)

        customer.changeAddress(address)

        return customer
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({
            where: {
                id
            }
        })
        if (!customerModel) {
            return null
        }

        const customer = this.parseCustomer(customerModel)

        return customer
    }
    async findAll(opts: AllOpts): Promise<Customer[]> {
        const productsModels = await CustomerModel.findAll(opts)

        return productsModels.map(customerModel => this.parseCustomer(customerModel))
    }

}
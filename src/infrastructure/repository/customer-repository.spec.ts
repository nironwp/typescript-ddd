import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer-repository"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/value-object/address"
import { AllOpts } from "../../domain/repository/repository-interface"

describe('Product repository test', () => {
    let sequelize: Sequelize
    let customerRepository: CustomerRepository
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        customerRepository = new CustomerRepository()
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })


    it('should create a customer', async () => {
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)

        await customerRepository.save(customer)

        const customerModel = await customerRepository.find(customer.id)

        expect(customer).toStrictEqual(customerModel)
    })

    it('should update a customer', async () => {
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)

        await customerRepository.save(customer)

        customer.addRewardPoints(10000)
        customer.activate()
        customer.changeAddress(new Address('Rua 2', 2, '2', 'Cidade 2'))

        await customerRepository.update(customer)

        const customerModel = await customerRepository.find(customer.id)

        expect(customer).toStrictEqual(customerModel)
    })

    it('should delete a customer', async () => {
        const customer = new Customer('1', 'Mendes')
        const address = new Address('Rua 1', 1, '1', 'Cidade 1')

        customer.changeAddress(address)

        await customerRepository.save(customer)

        await customerRepository.delete(customer)

        const customerModel = await customerRepository.find(customer.id)

        expect(customerModel).toBeNull()
    })

    it('should return nil when customer not found', async () => {
        const customerModel = await customerRepository.find('2')

        expect(customerModel).toBeNull()
    })

    it('should find all customers', async () => {

        const value_to = 10

        for (let i = 1; i <= value_to; i++) {
            const customer = new Customer(`${i}`, `Mendes ${i}`)
            const address = new Address(`Rua ${i}`, i, `${i}`, `Cidade ${i}`)

            customer.changeAddress(address)
            customer.addRewardPoints(i * 1000)
            customer.activate()
            await customerRepository.save(customer)
        }

        const allOpts: AllOpts = {
            limit: value_to,
            offset: 0,
            include: []
        }

        const customers = await customerRepository.findAll(allOpts)

        expect(customers.length).toBe(value_to)
    })

})

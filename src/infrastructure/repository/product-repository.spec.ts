import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"
import Product from "../../domain/entity/product"
import ProductRepository from "./product-repository"
import { AllOpts } from "../../domain/repository/repository-interface"

describe('Product repository test', () => {
    let sequelize: Sequelize
    let productRepository: ProductRepository
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        productRepository = new ProductRepository()
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })


    it('should find a product by name', async () => {
        const product = new Product('1', 'Product 1', 10)
        await productRepository.save(product)

        const productModel = await productRepository.findByName(product.name)

        expect(productModel).toStrictEqual(product)
    })

    it('should create a product', async () => {
        const product = new Product('1', 'Product 1', 10)

        await productRepository.save(product)
        const productModel = await ProductModel.findOne({ where: { id: product.id } })

        expect(productModel.toJSON()).toStrictEqual({ id: '1', name: 'Product 1', price: 10 })
    })

    it('should update a product', async () => {
        const product = new Product('1', 'Product 1', 10)

        await productRepository.save(product)

        product.changeName('Product 2')
        product.changePrice(20)

        await productRepository.update(product)

        const productModel = await ProductModel.findOne({ where: { id: product.id } })

        expect(productModel.toJSON()).toStrictEqual({ id: '1', name: 'Product 2', price: 20 })
    })

    it('should find a product', async () => {
        const product = new Product('1', 'Product 1', 10)

        await productRepository.save(product)

        const productModel = await productRepository.find(product.id)

        expect(productModel).toStrictEqual(product)
    })

    it('should find all products', async () => {
        const value_to = 10
        const opts: AllOpts = {
            limit: 10,
            offset: 0,
            include: []
        }

        for (let i = 1; i <= value_to; i++) {
            const product = new Product(`${i}`, `Product ${i}`, i)
            await productRepository.save(product)
        }


        const products = await productRepository.findAll(opts)

        expect(products.length).toBe(value_to)
    })


    it('should delete a product', () => {
        const product = new Product('1', 'Product 1', 10)

        productRepository.delete(product)

        expect(productRepository.find(product.id)).rejects.toThrow()
    })

})
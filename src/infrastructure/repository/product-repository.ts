import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import { AllOpts } from '../../domain/repository/repository-interface';
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async findByName(name: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { name: name } })
        
        return new Product(productModel.id, productModel.name, productModel.price)
    }
    async save(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }
    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                }
            }
        )

    }
    async delete(entity: Product): Promise<void> {
        await ProductModel.destroy({
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({
            where: {
                id
            }
        })

        return new Product(productModel.id, productModel.name, productModel.price)
    }
    async findAll(opts: AllOpts): Promise<Product[]> {
        const productsModels = await ProductModel.findAll(opts)

        return productsModels.map(productModel => new Product(productModel.id, productModel.name, productModel.price))
    }

}
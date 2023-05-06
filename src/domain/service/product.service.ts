import Product from "../entity/product";

export default class ProductService {
    public static increasePercentagePrice(products: Product[], percentage: number) {
        products.forEach(product => {
            product.changePrice(product.price + (product.price * percentage / 100))
        })
    }
}
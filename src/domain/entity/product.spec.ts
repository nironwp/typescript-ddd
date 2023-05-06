import Product from "./product"

describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const product = new Product('', 'Product 1', 10)
        }).toThrowError('Id is required')
    })

    it('should throw error when name is empty', () => {
        expect(() => {
            const product = new Product('1', '', 10)
        }).toThrowError('Name is required')
    })

    it('should throw error when price is empty', () => {
        expect(() => {
            const product = new Product('1', 'Product 1', 0)
        }).toThrowError('Price is required')
    })

    it('should throw error when price is negative', () => {
        expect(() => {
            const product = new Product('1', 'Product 1', -1)
        }).toThrowError(`Price can't be negative`)
    })

    it('should validate product', () => {
        const product = new Product('1', 'Product 1', 10)

        product.validate()
    })

    it('should change name', () => {
        const product = new Product('1', 'Product 1', 10)

        product.changeName('Product 2')

        expect(product.name).toBe('Product 2')
    })

    it('should trown error when change name to empty', () => {
        expect(() => {
            const product = new Product('1', 'Product 1', 10)

            product.changeName('')
        }).toThrowError('Name is required')
    })

    it('should change price', () => {
        const product = new Product('1', 'Product 1', 10)

        product.changePrice(20)

        expect(product.price).toBe(20)
    })

    it('should return the id', () => {
        const product = new Product('1', 'Product 1', 10)

        expect(product.id).toBe('1')
    })

    it('should trown error when change price to negative', () => {
        expect(() => {
            const product = new Product('1', 'Product 1', 10)

            product.changePrice(-1)
        }).toThrowError(`Price can't be negative`)
    })

    it('should return name', () => {
        const product = new Product('1', 'Product 1', 10)

        expect(product.name).toBe('Product 1')
    })

    it('should return price', () => {
        const product = new Product('1', 'Product 1', 10)

        expect(product.price).toBe(10)
    })
})
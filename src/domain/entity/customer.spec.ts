import Address from "../value-object/address"
import Customer from "./customer"

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Mendes")
        }).toThrowError("Id is required")
    })

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("Name is required")
    })

    it("should change name", () => {
        const customer = new Customer("1", "Mendes")

        customer.changeName("jon")

        expect(customer.name).toBe("jon")
    })

    it("should not activate customer when address not exists", () => {
        const customer = new Customer("1", "Mendes")

        expect(() => {
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer")
    })

    it("should activate customer when address exists", () => {
        const customer = new Customer("1", "Mendes")

        const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

        customer.changeAddress(address)

        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it("should return the address of the customer", () => {
        const customer = new Customer("1", "Mendes")

        const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

        customer.changeAddress(address)

        expect(customer.Address).toBe(address)
    })

    it("should desactivate customer", () => {
        const customer = new Customer("1", "Mendes")

        customer.desactivate()

        expect(customer.isActive()).toBe(false)
    })

    it('should set active', () => {
        const customer = new Customer("1", "Mendes")

        customer.setActive(true)

        expect(customer.isActive()).toBe(true)
    })

    it('user can set address from set method', () => {
        const customer = new Customer("1", "Mendes")

        const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

        customer.Address = address

        expect(customer.Address).toBe(address)
    })

    it("id should return the id", () => {
        const customer = new Customer("1", "Mendes")

        expect(customer.id).toBe("1")
    })

    it("name should return the name", () => {
        const customer = new Customer("1", "Mendes")

        expect(customer.name).toBe("Mendes")
    })

    it("reward points shoud return reward points", () => {
        const customer = new Customer("1", "Mendes")

        expect(customer.rewardPoints).toBe(0)
    })

    it("add reward points shoud add reward points", () => {
        const customer = new Customer("1", "Mendes")
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
    })


    describe('address unit tests for customer', () => {
        it('should throw error when street is empty', () => {
            expect(() => {
                const address = new Address("", 1, "12345-678", "Cidade 1")
            }).toThrowError("Street is required")
        })

        it('should throw error when number is empty', () => {
            expect(() => {
                const address = new Address("Rua 1", 0, "12345-678", "Cidade 1")
            }).toThrowError("Number is required")
        })

        it('should throw error when zip code is empty', () => {
            expect(() => {
                const address = new Address("Rua 1", 1, "", "Cidade 1")
            }).toThrowError("Zip is required")
        })

        it('should throw error when city is empty', () => {
            expect(() => {
                const address = new Address("Rua 1", 1, "12345-678", "")
            }).toThrowError("City is required")
        })

        it('should return the street', () => {
            const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

            expect(address.street).toBe("Rua 1")
        })

        it('should return the number', () => {
            const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

            expect(address.number).toBe(1)
        })

        it('should return the zip code', () => {
            const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

            expect(address.zip).toBe("12345-678")
        })

        it('should return the city', () => {
            const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

            expect(address.city).toBe("Cidade 1")
        })

        it('should return the full address', () => {
            const address = new Address("Rua 1", 1, "12345-678", "Cidade 1")

            expect(address.toString()).toBe("Rua 1, 1, 12345-678 Cidade 1")
        })
    })
})
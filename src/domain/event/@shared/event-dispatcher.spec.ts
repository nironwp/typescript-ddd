import Customer from "../../entity/customer"
import Address from "../../value-object/address"
import { CostumerCreatedEvent } from "../costumer/costumer-created.event"
import NotifyAddressChangedHandler from "../costumer/handler/address-change-log"
import FirstLogCostumerCreated from "../costumer/handler/first-log-costumer.created"
import SecondLogCostumerCreated from "../costumer/handler/second-log-costumer.created"
import NotifyAddressChangeEvent from "../costumer/notify-address.event"
import SendEmailWhenProductIsCreatedEventHandler from "../product/handler/send-email-when-product-create.handler"
import ProductCreatedEvent from "../product/product-created.event"
import EventDispatcher from "./event-dispatcher"
import EventInterface from "./event.interface"

describe('Domain events tests', () => {

    let eventDispatcher: EventDispatcher
    beforeEach(() => {
        eventDispatcher = new EventDispatcher()
    })
    describe("Product events ", () => {
        let eventHandler: SendEmailWhenProductIsCreatedEventHandler
        beforeEach(() => {
            eventHandler = new SendEmailWhenProductIsCreatedEventHandler()
        })

        afterEach(() => {
            eventDispatcher.unregisterAll()
        })
        it('should register an event handler', () => {
            eventDispatcher.register('product.created', eventHandler)

            expect(eventDispatcher.getEventHandlers('product.created')).toBeDefined()

            expect(eventDispatcher.getEventHandlers('product.created').length).toBe(1)

            expect(eventDispatcher.getEventHandlers('product.created')).toMatchObject([eventHandler])
        })

        it('should unregister an event handler', () => {
            eventDispatcher.register('product.created', eventHandler)

            expect(eventDispatcher.getEventHandlers('product.created')).toBeDefined()

            expect(eventDispatcher.getEventHandlers('product.created').length).toBe(1)

            eventDispatcher.unregister('product.created', eventHandler)

            expect(eventDispatcher.getEventHandlers('product.created').length).toBe(0)
        })

        it('should unregister all event handlers', () => {
            eventDispatcher.register('product.created', eventHandler)

            expect(eventDispatcher.getEventHandlers('product.created')).toBeDefined()

            expect(eventDispatcher.getEventHandlers('product.created').length).toBe(1)

            eventDispatcher.unregisterAll()

            expect(eventDispatcher.getEventHandlers('product.created').length).toBe(0)
        })

        it('should notify event handlers', () => {
            const spyEventHandler = jest.spyOn(eventHandler, 'handle')

            eventDispatcher.register('product.created', eventHandler)

            const event = new ProductCreatedEvent({ email: 'user@gmail.com' })

            eventDispatcher.notify(event)

            expect(spyEventHandler).toBeCalledTimes(1)
        })
    })

    describe('Costumer events', () => {

        let firstHandler: FirstLogCostumerCreated
        let secondHandler: SecondLogCostumerCreated
        let thirtyHandler: NotifyAddressChangedHandler
        beforeEach(() => {
            firstHandler = new FirstLogCostumerCreated()
            secondHandler = new SecondLogCostumerCreated()
            thirtyHandler = new NotifyAddressChangedHandler()
        })

        afterEach(() => {
            eventDispatcher.unregisterAll()
        })

        it('should register an event handler', () => {

            eventDispatcher.register('costumer.created', firstHandler)

            expect(eventDispatcher.getEventHandlers('costumer.created').length).toBe(1)
        })

        it('should logs events costumer.created', () => {
            eventDispatcher.register('costumer.created', firstHandler)
            eventDispatcher.register('costumer.created', secondHandler)

            const spyFirstEventHandler = jest.spyOn(firstHandler, "handle")
            const spySecondEventHandler = jest.spyOn(secondHandler, "handle")

            const event = new CostumerCreatedEvent({})

            eventDispatcher.notify(event)

            expect(spyFirstEventHandler).toBeCalledTimes(1)
            expect(spySecondEventHandler).toBeCalledTimes(1)
        })

        it('should logs events costumer.address-update', () => {
            eventDispatcher.register('costumer.address-update', thirtyHandler)
            const spyEventHandler = jest.spyOn(thirtyHandler, "handle")
            const customer = new Customer('1', "customer")
            const address = new Address('Street 1', 1, '1', 'City 1')
            const event = new NotifyAddressChangeEvent({
                id: customer.id,
                name: customer.name,
                address
            })

            eventDispatcher.notify(event)

            expect(spyEventHandler).toBeCalledTimes(1)
        })
    })
})
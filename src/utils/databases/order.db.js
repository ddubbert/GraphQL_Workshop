const uniqid = require('uniqid')

const OrderType = require('../enums/OrderType')
const productDB = require('./product.db')
const userDB = require('./user.db')

const orders = [
    {
        id: '055b5da3',
        product: 'b4867cbd',
        producer: 'd467f50a',
        amount: 3,
        customer: '8935b480',
        type: OrderType.MAIL,
        shipping_address: {
            street_name: 'Lustigstraße',
            street_number: '15a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        }
    },
    {
        id: 'e93df95c',
        product: '32abfe84',
        producer: 'd467f50a',
        amount: 10,
        customer: '8935b480',
        type: OrderType.PICKUP,
        pickup_date: new Date()
    },
    {
        id: '0f54899c',
        product: '44080730',
        producer: 'da8ab4c0',
        amount: 1,
        customer: '8935b480',
        type: OrderType.MAIL,
        shipping_address: {
            street_name: 'Lustigstraße',
            street_number: '15a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        }
    }
]

const isOrderMatchingQuery = (order, query) => {
    return Object.keys(query).every((key) => {
        return order[key] === query[key]
    })
}

const filterOrders = (ordersToFilter, query) => {
    const filteredOrders = ordersToFilter.filter((order) => isOrderMatchingQuery(order, query))
    return filteredOrders
}

const getOrdersForProducer = (producer, query) => {
    const ordersOfProducer = orders.filter((order) => order.producer === producer)
    return (query) ? filterOrders(ordersOfProducer, query) : ordersOfProducer
}

const createOrderObject = (orderInput, product, customer) => {
    const { amount, pickup_date, shipping_address } = orderInput

    const order = {
        amount,
        id: uniqid.time(),
        product: product.id,
        producer: product.producerId,
        customer: customer.id
    }

    if (pickup_date) {
        order.type = OrderType.PICKUP
        order.pickup_date = pickup_date
    } else {
        order.type = OrderType.MAIL
        order.shipping_address = shipping_address || customer.address
    }

    return order
}

const getProductIfPresent = (productId) => {
    const product = productDB.getProductById(productId)
    if (!product) throw new Error('Product not found.')
    return product
}

const getUserIfPresent = (userId) => {
    const user = userDB.getUserById(userId)
    if (!user) throw new Error('User not found.')
    return user
}

const createOrder = (orderInput) => {
    const { productId, customerId } = orderInput
    const product = getProductIfPresent(productId)
    const customer = getUserIfPresent(customerId)

    const order = createOrderObject(orderInput, product, customer)

    orders.push(order)

    return order
}

module.exports = Object.freeze({
    getOrdersForProducer,
    createOrder
})
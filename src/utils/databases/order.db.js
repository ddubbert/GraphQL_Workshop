const OrderState = require('../enums/OrderState')
const productDB = require('./product.db')

const orders = [
    {
        id: '055b5da3',
        productId: 'b4867cbd',
        producerId: 'd467f50a',
        amount: 3,
        customerId: '8935b480',
        shipping_address: {
            street_name: 'Lustigstraße',
            street_number: '15a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        state: OrderState.PAYED
    },
    {
        id: 'e93df95c',
        productId: '32abfe84',
        producerId: 'd467f50a',
        amount: 10,
        customerId: '8935b480',
        pickup_date: new Date(),
        state: OrderState.OPEN
    },
    {
        id: '0f54899c',
        productId: '44080730',
        producerId: 'da8ab4c0',
        amount: 1,
        customerId: '8935b480',
        shipping_address: {
            street_name: 'Lustigstraße',
            street_number: '15a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        state: OrderState.PAYED
    }
]

const getOrdersForProducer = (producerId) => {
    return orders.filter((order) => order.producerId === producerId)
}

const getOrdersOfUser = (userId) => {
    return orders.filter((order) => order.customerId === userId)
}

const getOrderById = (orderId) => {
    return orders.filter((order) => order.id === orderId)
}

const createOrder = (orderInput) => {
    const order = { ...orderInput }
    const { productId } = order
    const product = productDB.getProductById(productId)
    
    order.producerId = product.producerId
    order.id = orders.length + 1
    orders.push(order)

    return order
}

module.exports = Object.freeze({
    getOrdersForProducer,
    getOrdersOfUser,
    getOrderById,
    createOrder
})
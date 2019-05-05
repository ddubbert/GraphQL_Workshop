const OrderType = require('../enums/OrderType')

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

module.exports = Object.freeze({
    getOrdersForProducer
})
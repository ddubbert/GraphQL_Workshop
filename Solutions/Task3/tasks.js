const { withFilter } = require('graphql-yoga')

const OrderType = require('../utils/enums/OrderType') 
const Channels = require('../utils/enums/ChannelNames')

const productDB = require('../utils/databases/product.db')
const userDB = require('../utils/databases/user.db')
const orderDB = require('../utils/databases/order.db')

/**
 * Beispielhafte Struktur einer Bestellung (Order) in der Datenbank:
 * {
 *      id: '055b5da3',
 *      product: 'b4867cbd',
 *      producer: 'd467f50a',
 *      amount: 3,
 *      customer: '8935b480',
 *      type: 'mail' or 'pickup',
 * 
 *      ... weitere Attribute
 * }
 */

const sharedOrderResolvers = {
    product: (parent, _args, _context, _info) => {
        const { product } = parent
        return productDB.getProductById(product)
    },
    producer: (parent, _args, _context, _info) => {
        const { producer } = parent
        return userDB.getUserById(producer)
    },
    customer: (parent, _args, _context, _info) => {
        const { customer } = parent
        return userDB.getUserById(customer)
    },
}

module.exports = {
    Query: {
        orders: (_parent, args, _context, _info) => {
            const { producerId } = args
            const orders = orderDB.getOrdersForProducer(producerId)

            return (orders.length > 0) ? orders : null
        }
    },
    Order: {
        __resolveType: (order) => {
            switch(order.type) {
                case OrderType.MAIL: return 'MailOrder'
                case OrderType.PICKUP: return 'PickupOrder'
                default: throw new Error('Could not identify Order.')
            }
        }
    },
    MailOrder: {
        ...sharedOrderResolvers
    },
    PickupOrder: {
        ...sharedOrderResolvers
    },
    // TODO: Aufgabe Subscriptions -> Live Coding
}
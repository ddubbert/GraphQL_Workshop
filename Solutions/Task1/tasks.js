const { withFilter } = require('graphql-yoga')

const OrderState = require('../utils/enums/OrderState') 
const productDB = require('../utils/databases/product.db')
const userDB = require('../utils/databases/user.db')
const orderDB = require('../utils/databases/order.db')
const Channels = require('../utils/enums/ChannelNames')

/**
 * Beispielhafte Struktur einer Bestellung (Order) in der Datenbank:
 * {
 *      id: '055b5da3',
 *      product: 'b4867cbd',
 *      producer: 'd467f50a',
 *      amount: 3,
 *      customer: '8935b480',
 * 
 *      ... weitere Attribute
 * }
 */

module.exports = {
    Query: {
        orders: (_parent, args, _context, _info) => {
            const { producerId } = args
            const orders = orderDB.getOrdersForProducer(producerId)

            return (orders.length > 0) ? orders : null
        }
    }
    // TODO: Aufgabe 2.b

    // TODO: Aufgabe 3.b
    
    // TODO: Aufgabe 4.b

    // TODO: Aufgabe Subscriptions -> Live Coding
}
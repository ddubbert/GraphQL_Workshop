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

module.exports = {
    Query: {
        // TODO: Aufgabe 1.b
    },
    // TODO: Aufgabe 2.b

    // TODO: Aufgabe 3.b
    
    // TODO: Aufgabe Subscriptions -> Live Coding
}
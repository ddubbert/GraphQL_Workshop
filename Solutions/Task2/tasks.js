const OrderState = require('../utils/enums/OrderState') 

const productDB = require('../utils/databases/product.db')
const userDB = require('../utils/databases/user.db')
const orderDB = require('../utils/databases/order.db')

module.exports = {
    Query: {
        orders: (_parent, args, _context, _info) => {
            const { producer, filter } = args
            const orders = orderDB.getOrdersForProducer(producer, filter)

            if (orders.length > 0) {
                return orders
            }

            return null
        }
    },
    Order: {
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
}
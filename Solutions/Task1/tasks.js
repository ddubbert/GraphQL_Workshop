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
    }
}
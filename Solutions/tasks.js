const OrderState = require('../utils/enums/OrderState') 

const productDB = require('../utils/databases/product.db')
const userDB = require('../utils/databases/user.db')
const orderDB = require('../utils/databases/order.db')

const sharedOrderResolvers = {
    product: (parent, _args, _context, _info) => {
        return productDB.getProductById(parent.productId)
    },
    customer: (parent, _args, _context, _info) => {
        return userDB.getUserById(parent.customerId)
    }, 
    producer: (parent, _args, _context, _info) => {
        return userDB.getUserById(parent.producerId)
    },
}

module.exports = {
    Query: {
        orders: (_parent, args, _context, _info) => {
            const { producerId, queryInput } = args
            const orders = orderDB.getOrdersForProducer(producerId, queryInput)

            return (orders.length > 0) ? orders : null
        }
    },
    Order: {
        __resolveType(order) {
            if (order.shipping_address) return 'MailOrder'
            else if (order.pickup_date) return 'PickupOrder'
            throw new Error('Could not identify order type.')
        },
    },
    MailOrder: {
        ...sharedOrderResolvers
    },
    PickupOrder: {
        ...sharedOrderResolvers
    },
    OrderState: {
        PAYED: OrderState.PAYED,
        OPEN: OrderState.OPEN
    }
}
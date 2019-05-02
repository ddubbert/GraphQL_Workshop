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
            const { producerId } = args
            const orders = orderDB.getOrdersForProducer(producerId)

            return (orders.length > 0) ? orders : null
        }
    },
    Mutation: {
        createOrder: (_parent, args, _context, _info) => {
            const { orderInput } = args

            if (!productDB.isProduct(orderInput.productId)) throw new Error('Product not found.')
            if (!userDB.isUser(orderInput.customerId)) throw new Error('Product not found.')

            return orderDB.createOrder(orderInput)
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
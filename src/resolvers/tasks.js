const OrderType = require('../utils/enums/OrderType')
const Unit = require('../utils/enums/Unit')

const productDB = require('../utils/databases/product.db')

module.exports = {
    Query: {
        products: (_parent, args, _context, _info) => {
            const { queryInput } = args

            if (queryInput) return productDB.getProductsByQuery(queryInput)

            return productDB.getAllProducts()
        },
        orders: (_parent, args, _context, _info) => {
            return null
        }
    },
    Mutation: {
        createProduct: (_parent, args, _context, _info) => {
            return null
        }
    },
    Order: {
    },
    Unit: {
        QUANTITY: Unit.QUANTITY,
        KILOGRAM: Unit.KILOGRAM,
        LITER: Unit.LITER
    }
}
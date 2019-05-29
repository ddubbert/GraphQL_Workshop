const { withFilter } = require('graphql-yoga')

const Day = require('../utils/enums/Day')
const Payment = require('../utils/enums/Payment')
const UserType = require('../utils/enums/UserType')
const Unit = require('../utils/enums/Unit')
const Channels = require('../utils/enums/ChannelNames')

const userDB = require('../utils/databases/user.db')
const companyDB = require('../utils/databases/company.db')
const reviewDB = require('../utils/databases/reviews.db')
const productDB = require('../utils/databases/product.db')
const orderDB = require('../utils/databases/order.db')

const isValidRating = (rating) => rating <= 5 && rating >= 1

const calculateRating = (producerId) => {
    const reviews = reviewDB.getReviewsForProducer(producerId)

    if (reviews.length === 0) return null

    const sum = reviews.reduce((accumulator, review) => {
        return accumulator + review.rating
    }, 0)

    return sum / reviews.length
}

const filterProducersByRating = (producers, minimumRating) => {
    const filteredProducers = producers.filter((p) => {
        const ratingOfProducer = calculateRating(p.id)
        return (ratingOfProducer && ratingOfProducer >= minimumRating)
    })

    return (filteredProducers.length > 0) ? filteredProducers : null
}

module.exports = {
    Query: {
        users: (_parent, _args, _context, _info) => {
            const users = userDB.getAllUsers()
            return (users.length > 0) ? users : null
        },
        user: (_parent, args, _context, _info) => {
            const { name } = args
            return userDB.getUserByName(name)
        },
        producers: (_parent, args, _context, _info) => {
            const { rating } = args
            const producers = userDB.getAllUsersOfType(UserType.PRODUCER)

            if (producers.length === 0) return null

            return (rating) ? filterProducersByRating(producers, rating) : producers
        },
        reviews: (_parent, args, _context, _info) => {
            const { creatorId } = args

            const reviews = reviewDB.getReviewsOfUser(creatorId)
            return (reviews.length > 0) ? reviews : null
        },
    },
    Mutation: {
        createReview: (_parent, args, context, _info) => {
            const { pubsub } = context
            const { producerId, reviewInput } = args
            const { rating } = reviewInput

            if (!isValidRating(rating)) throw new Error('Rating is not valid. It needs to be a number from 1 to 5.')
            if (!userDB.isProducer(producerId)) throw new Error('User is not a producer.')

            const review = reviewDB.createReviewForProducer(producerId, reviewInput)

            pubsub.publish(Channels.REVIEW_ADDED_CHANNEL, { reviewAdded: review })

            return review
        },
        createProduct: (_parent, args, _context, _info) => {
            const { producerId, productInput } = args

            if (!userDB.isProducer(producerId)) throw new Error('User is not a producer.')

            return productDB.createProductForProducer(producerId, productInput)
        },
        createOrder: (_parent, args, context, _info) => {
            const { orderInput } = args
            const { pubsub } = context

            const order = orderDB.createOrder(orderInput)

            pubsub.publish(Channels.ORDER_ADDED_CHANNEL, { orderAdded: order })
            
            return order
        },
    },
    Subscription: {
        reviewAdded: {
            subscribe: withFilter(
                (_parent, _args, context, _info) => {
                    const { pubsub } = context
                    return pubsub.asyncIterator(Channels.REVIEW_ADDED_CHANNEL)
                },
                (payload, variables) => payload.reviewAdded.producerId === variables.producerId,
            )
        },
    },
    Producer: {
        company: (parent, _args, _context, _info) => {
            const { companyId } = parent

            return (companyId) ? companyDB.getCompanyById(companyId) : null
        },
        products: (parent, args, _context, _info) => {
            const { name } = args
            const query = { producerId: parent.id }
            
            if (name) query.name = name

            const products = productDB.getProductsMatchingQuery(query)

            return (products.length > 0) ? products : null
        },
        reviews: (parent, _args, _context, _info) => { 
            const reviews = reviewDB.getReviewsForProducer(parent.id)

            return (reviews.length > 0) ? reviews : null
        },
        average_rating: (parent, _args, _context, _info) => {
            return calculateRating(parent.id)
        }
    },
    Consumer: {
        purchases: (parent, _args, _context, _info) => {
            const { productIds } = parent

            if (productIds.length === 0) return null

            const purchasedProducts = productDB.getProductsByIdArray(productIds)

            return (purchasedProducts.length > 0) ? purchasedProducts : null
        },
    },
    Company: {
        members: (parent, _args, _context, _info) => {
            const { memberIds } = parent

            if (memberIds.length === 0) return null

            const members = userDB.getUsersByIdArray(memberIds)

            return (members.length > 0) ? members : null
        },
    },
    Review: {
        creator: (parent, _args, _context, _info) => {
            const { creatorId } = parent

            return userDB.getUserById(creatorId)
        },
        producer: (parent, _args, _context, _info) => {
            const { producerId } = parent

            return userDB.getUserById(producerId)
        },
    },
    User: {
        __resolveType: (user) => {
            switch (user.type) {
                case UserType.CONSUMER: return 'Consumer'
                case UserType.PRODUCER: return 'Producer'
                default: throw new Error('User could not be identified.')
            }
        },
    },
    TransferAccount: {
        __resolveType: (account) => {
            if (account.email) return 'Paypal'
            else if (account.account_number) return 'Bank'
            throw new Error('BankAccount could not be identified.')
        },
    },
    Day: {
        MONDAY: Day.MONDAY,
        TUESDAY: Day.TUESDAY,
        WEDNESDAY: Day.WEDNESDAY,
        THURSDAY: Day.THURSDAY,
        FRIDAY: Day.FRIDAY,
        SATURDAY: Day.SATURDAY,
        SUNDAY: Day.SUNDAY
    },
    Payment: {
        CREDITCARD: Payment.CREDITCARD,
        BANKTRANSFER: Payment.BANKTRANSFER,
        CASH: Payment.CASH,
        PAYPAL: Payment.PAYPAL
    },
    Unit: {
        QUANTITY: Unit.QUANTITY,
        KILOGRAM: Unit.KILOGRAM,
        LITER: Unit.LITER
    }
}
const Day = require('../utils/enums/Day')
const Payment = require('../utils/enums/Payment')
const UserType = require('../utils/enums/UserType')

const userDB = require('../utils/databases/user.db')
const companyDB = require('../utils/databases/company.db')
const reviewDB = require('../utils/databases/reviews.db')
const productDB = require('../utils/databases/product.db')

module.exports = {
    Query: {
        users: (_parent, _args, _context, _info) => userDB.getAllUsers(),
        user: (_parent, args, _context, _info) => {
            const { userId } = args
            return (userDB.getUsersByIds([userId]))[0]
        },
        producers: (_parent, _args, _context, _info) => userDB.getAllUsersOfType(UserType.PRODUCER),
        reviews: (_parent, args, _context, _info) => {
            const { creatorId } = args

            if (userDB.isUser(creatorId)) {
                return reviewDB.getReviewsOfUser(creatorId)
            }
            throw new Error('User not found.')
        },
    },
    Mutation: {
        createReview: (_parent, args, _context, _info) => {
            const { producerId, reviewInput } = args
            const { rating } = reviewInput
            
            if (rating > 5 || rating < 1) throw new Error('Rating is not valid.')
            return reviewDB.addReviewForProducer(producerId, reviewInput)
        }
    },
    Producer: {
        company: (parent, _args, _context, _info) => {
            const { companyId } = parent
            if (!companyId) return null

            return companyDB.getCompanyById(companyId)
        },
        products: (parent, _args, _context, _info) => {
            return productDB.getProductsByQuery({producerId: parent.id})
        },
        reviews: (parent, _args, _context, _info) => reviewDB.getReviewsForProducer(parent.id),
        average_rating: (parent, _args, _context, _info) => {
            try {
                const reviews = reviewDB.getReviewsForProducer(parent.id)
                const sum = reviews.reduce((accumulator, review) => {
                    return accumulator + review.rating
                }, 0)
    
                return sum / reviews.length
            } catch (e) {
                return null
            }
        },
    },
    Consumer: {
        purchases: (parent, _args, _context, _info) => {
            const { productIds } = parent
            if (productIds.length === 0) return null

            return productDB.getProductsByIds(productIds)
        },
    },
    Company: {
        members: (parent, _args, _context, _info) => {
            const { memberIds } = parent
            if (memberIds.length === 0) return null
            return userDB.getUsersByIds(memberIds)
        },
    },
    Review: {
        creator: (parent, _args, _context, _info) => {
            const { creatorId } = parent
            const [creator] = userDB.getUsersByIds([creatorId])
            return creator
        },
        producer: (parent, _args, _context, _info) => {
            const { producerId } = parent
            const [producer] = userDB.getUsersByIds([producerId])
            return producer
        },
    },
    User: {
        __resolveType(obj) {
            switch (obj.type) {
                case UserType.CONSUMER: return 'Consumer'
                case UserType.PRODUCER: return 'Producer'
                default: throw new Error('User could not be identified.')
            }
        },
    },
    TransferAccount: {
        __resolveType(obj) {
            if (Object.keys(obj).includes('email')) return 'Paypal'
            else if (Object.keys(obj).includes('account_number')) return 'Bank'
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
}
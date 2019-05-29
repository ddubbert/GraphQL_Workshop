const UserType = require('../enums/UserType')
const Day = require('../enums/Day')
const Payment = require('../enums/Payment')

const users = [
    {
        id: 'd467f50a',
        type: UserType.PRODUCER,
        member_since: new Date(),
        username: 'peter-lustig',
        email: 'peter@lustig.com',
        address: {
            street_name: 'Lustigstraße',
            street_number: '16a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        description: 'Leidenschaftlicher Kleingärtner und Ukulelist. Nebenberuflich in der Lehre tätig.',
        business_days: [Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY],
        accepted_payments: [Payment.CREDITCARD, Payment.BANKTRANSFER, Payment.PAYPAL],
        companyId: '371299b7',
    },
    {
        id: 'da8ab4c0',
        type: UserType.PRODUCER,
        member_since: new Date(),
        username: 'klaus-dieter',
        email: 'klaus@dieter.com',
        address: {
            street_name: 'Lustigstraße',
            street_number: '16a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        description: 'Trotz seiner Größe und Bewegungseinschränkung ein begeisterter Gärtner. Hängt sehr an seinem Bauwagen.',
        business_days: [Day.MONDAY, Day.WEDNESDAY, Day.FRIDAY],
        accepted_payments: [Payment.PAYPAL, Payment.CASH],
        companyId: '371299b7',
    },
    {
        id: '8935b480',
        type: UserType.CONSUMER,
        member_since: new Date(),
        username: 'hermann-paschulke',
        email: 'hermann@paschulke.com',
        address: {
            street_name: 'Lustigstraße',
            street_number: '15a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        transfer_accounts: [
            {
                email: 'hermann@paschulke.com'
            },
            {
                account_number: 'LL123456789101112',
                bank_code: '1234567810',
                bank_name: 'LaLa Bank'
            }
        ],
        productIds: ['b4867cbd', '32abfe84', '44080730'],
    },
]

const getAllUsers = () => users

const getAllUsersOfType = (userType) => users.filter((user) => user.type === userType)

const getUsersByIdArray = (userIds) => {
    return users.filter((user) => userIds.includes(user.id))
}

const getUserById = (userId) => {
    const matchingUser = users.filter((user) => userId === user.id)
    return (matchingUser.length > 0) ? matchingUser[0] : null
}

const getUserByName = (username) => {
    const matchingUser = users.filter((user) => username === user.username)
    return (matchingUser.length > 0) ? matchingUser[0] : null
}

const isProducer = (userId) => {
    const matchingUser = getUserById(userId)
    return matchingUser !== null && matchingUser.type === UserType.PRODUCER
}

const isUser = (userId) => {
    return getUserById(userId) !== null
}

module.exports = Object.freeze({
    getAllUsers,
    getAllUsersOfType,
    getUserById,
    getUserByName,
    getUsersByIdArray,
    isUser,
    isProducer
})
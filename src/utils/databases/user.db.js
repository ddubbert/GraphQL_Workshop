const UserType = require('../enums/UserType')
const Day = require('../enums/Day')
const Payment = require('../enums/Payment')

const users = [
    {
        id: '1',
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
        transfer_accounts: [
            {
                email: 'peter@lustig.com'
            },
            {
                account_number: 'LL123456789101112',
                bank_code: '1234567810',
                bank_name: 'LaLa Bank'
            }
        ],
        accepted_payments: [Payment.CREDITCARD, Payment.BANKTRANSFER, Payment.PAYPAL],
        companyId: '1',
    },
    {
        id: '2',
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
        transfer_accounts: [
            {
                email: 'klaus@dieter.com'
            },
        ],
        accepted_payments: [Payment.PAYPAL, Payment.CASH],
        companyId: '1',
    },
    {
        id: '3',
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
        productIds: ['1', '2', '3'],
    },
]

const getAllUsers = () => users

const getAllUsersOfType = (userType) => users.filter((user) => user.type === userType)

const getUsersByIds = (userIds) => {
    const matchingUsers = users.filter((user) => userIds.includes(user.id))
    if (matchingUsers.length === 0) throw new Error('Users not found.')
    return matchingUsers
}

const isUser = (userId) => {
    const matchingUsers = users.filter((user) => userId === user.id)
    return matchingUsers.length > 0
}

module.exports = Object.freeze({
    getAllUsers,
    getAllUsersOfType,
    getUsersByIds,
    isUser
})
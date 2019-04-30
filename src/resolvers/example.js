
const Day = Object.freeze({
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6
})

const Payment = Object.freeze({
    CREDITCARD: 0,
    BANKTRANSFER: 1,
    CASH: 2,
    PAYPAL: 3
})

const UserType = Object.freeze({
    CONSUMER: 'consumer',
    PRODUCER: 'producer'
})

const users = [
    {
        id: '1',
        type: UserType.PRODUCER,
        member_since: new Date(),
        username: 'peter_lustig',
        email: 'peter@lustig.com',
        address: {
            street_name: 'Lustigstraße',
            street_number: '16a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        description: 'Leidenschaftlicher Kleingärtner und Gitarrist. Nebenberuflich in der Lehre tätig.',
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
        productIds: [], // TODO
        reviews: [
            {
                rating: 5,
                comment: 'Toller Kerl. Die Ware ist super und er hat mir auch noch einiges beigebracht.'
            },
            {
                rating: 1,
                comment: 'Ware ist an sich nicht schlecht... ABER irgendwie waren die Tomaten nach 4 Wochen grün und flauschig. Daher Punktabzug... Unverschämtheit!!!!!!'
            }
        ]
    },
]

const companies = [
    {
        id: '1',
        name: 'Blauer Wohnwagen AG',
        address: {
            street_name: 'Lustigstraße',
            street_number: '16a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        memberIds: ['1', '2']
    }
]

module.exports = {
    Query: {
        users: (_parent, _args, _context, _info) => users,
    },
    Producer: {
        company: (parent, _args, _context, _info) => {
            if (!parent.companyId) return null
            const [company] = companies.filter((company) => company.id === parent.companyId)
            return company
        },
        products: (parent, _args, _context, _info) => {
            if (parent.productIds.length === 0) return null
            return products.filter((product) => parent.productIds.includes(product.id))
        },
        average_rating: (parent, _args, _context, _info) => {
            if (parent.reviews.length === 0) return null
            const sum = parent.reviews.reduce((accumulator, review) => {
                return accumulator + review.rating
            }, 0)
            return sum / parent.reviews.length
        },
    },
    Company: {
        members: (parent, _args, _context, _info) => {
            if (parent.memberIds.length === 0) return null
            return users.filter((user) => parent.memberIds.includes(user.id))
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
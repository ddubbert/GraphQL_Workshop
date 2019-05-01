const companies = [
    {
        id: '1',
        name: 'Blauer Bauwagen AG',
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

const getCompanyById = (companyId) => {
    try {
        const [company] = companies.filter((company) => company.id === companyId)
        return company
    } catch (e) {
        throw new Error('Company not found.')
    }
}

module.exports = Object.freeze({
    getCompanyById
})
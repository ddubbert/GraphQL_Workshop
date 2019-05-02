const companies = [
    {
        id: '371299b7',
        name: 'Blauer Bauwagen AG',
        address: {
            street_name: 'Lustigstraße',
            street_number: '16a',
            city: 'Lustighausen',
            zip_code: '12345',
            country: 'LaLaLand'
        },
        memberIds: ['d467f50a', 'da8ab4c0']
    }
]

const getCompanyById = (companyId) => {
    try {
        const [company] = companies.filter((company) => company.id === companyId)
        return company
    } catch (e) {
        return null
    }
}

module.exports = Object.freeze({
    getCompanyById
})
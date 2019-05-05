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
    const matchingCompany = companies.filter((company) => company.id === companyId)
    return (matchingCompany.length > 0) ? matchingCompany[0] : null
}

module.exports = Object.freeze({
    getCompanyById
})
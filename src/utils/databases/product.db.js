const Unit = require('../enums/Unit')

const products = [
    {
        id: '1',
        name: 'Tomate',
        description: 'Peters Traum-Tomate. Komplett Bio.',
        amount: 50,
        unit: Unit.QUANTITY,
        price_per_unit: 0.50,
        producerId: '1'
    },
    {
        id: '2',
        name: 'Apfel',
        description: 'Peters Traum-Apfel. Komplett Bio.',
        amount: 20,
        unit: Unit.KILOGRAM,
        price_per_unit: 1.99,
        producerId: '1'
    },
    {
        id: '3',
        name: 'Apfel',
        description: 'Bester Apfel (bestimmt nicht aus Peters Garten....).',
        amount: 10,
        unit: Unit.QUANTITY,
        price_per_unit: 0.20,
        producerId: '2'
    },
    {
        id: '4',
        name: 'Apfelsaft',
        description: 'Bester Apfelsaft (Materialien bestimmt nicht aus Peters Garten....).',
        amount: 100,
        unit: Unit.LITER,
        price_per_unit: 3.50,
        producerId: '2'
    },
]

const getAllProducts = () => products

const getProductsByIds = (productIds) => {
    const matchingProducts = products.filter((product) => productIds.includes(product.id))
    if (matchingProducts.length === 0) throw new Error('Products not found.')
    return matchingProducts
}

const isProductMatchingQuery = (product, query) => {
    return Object.keys(query).every((key) => {
        return product[key] === query[key]
    })
}

const getProductsByQuery = (productQuery) => {
    const query = { ...productQuery, id: productQuery.productId }
    delete query.productId

    const matchingProducts = products.filter((product) => isProductMatchingQuery(product, productQuery))
    if (matchingProducts.length === 0) throw new Error('Products not found.')
    return matchingProducts
}

module.exports = Object.freeze({
    getAllProducts,
    getProductsByIds,
    getProductsByQuery
})
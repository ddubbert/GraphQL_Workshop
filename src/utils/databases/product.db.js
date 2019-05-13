const Unit = require('../enums/Unit')

const products = [
    {
        id: 'b4867cbd',
        name: 'Tomate',
        description: 'Peters Traum-Tomate. Komplett Bio.',
        unit: Unit.QUANTITY,
        price_per_unit: 0.50,
        producerId: 'd467f50a'
    },
    {
        id: '32abfe84',
        name: 'Apfel',
        description: 'Peters Traum-Apfel. Komplett Bio.',
        unit: Unit.KILOGRAM,
        price_per_unit: 1.99,
        producerId: 'd467f50a'
    },
    {
        id: '44080730',
        name: 'Apfel',
        description: 'Bester Apfel (bestimmt nicht aus Peters Garten....).',
        unit: Unit.QUANTITY,
        price_per_unit: 0.20,
        producerId: 'da8ab4c0'
    },
    {
        id: 'fee2da81',
        name: 'Apfelsaft',
        description: 'Bester Apfelsaft (Materialien bestimmt nicht aus Peters Garten....).',
        unit: Unit.LITER,
        price_per_unit: 3.50,
        producerId: 'da8ab4c0'
    },
]

const getProductsByIdArray = (productIds) => {
    return products.filter((product) => productIds.includes(product.id))
}

const getProductById = (productId) => {
    const matchingProduct = products.filter((product) => productId === product.id)
    return (matchingProduct.length > 0) ? matchingProduct[0] : null
}

const isProductMatchingQuery = (product, query) => {
    if (query.productId) {
        query.id = query.productId
        delete query.productId
    }

    return Object.keys(query).every((key) => {
        return product[key] === query[key]
    })
}

const getProductsMatchingQuery = (productQuery) => {
    const query = { ...productQuery, id: productQuery.productId }
    delete query.productId

    const matchingProducts = products.filter((product) => isProductMatchingQuery(product, productQuery))
    return matchingProducts
}

const createProductForProducer = (producerId, productInput) => {
    const product = {
        producerId,
        ...productInput,
        id: products.length
    }

    products.push(product)
    return product
}

module.exports = Object.freeze({
    getProductById,
    getProductsByIdArray,
    getProductsMatchingQuery,
    createProductForProducer
})
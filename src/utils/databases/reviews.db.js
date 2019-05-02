const reviews = [
    {
        producerId: 'd467f50a',
        rating: 5,
        comment: 'Toller Kerl. Die Ware ist super und er hat mir auch noch einiges beigebracht.',
        creatorId: '8935b480'
    },
    {
        producerId: 'da8ab4c0',
        rating: 1,
        comment: 'Ware ist nie angekommen. Der Verkäufer hat am Telefon ohne ende geredet aber nichts gesendet. Peter ist besser.',
        creatorId: '8935b480'
    },
    {
        producerId: 'd467f50a',
        rating: 1,
        comment: 'Ware ist an sich nicht schlecht... ABER irgendwie waren die Tomaten nach 4 Wochen grün und flauschig. Daher Punktabzug... Unverschämtheit!!!!!!',
        creatorId: 'da8ab4c0'
    },
    {
        producerId: 'd467f50a',
        rating: 1,
        comment: 'Der stiehlt mir immer die Show. Ich mag den nicht. Und sein Essen ist nicht lecker!!!!!',
        creatorId: 'da8ab4c0'
    },
    {
        producerId: 'da8ab4c0',
        rating: 5,
        comment: 'Perfekte Lebensmittel. Lecker und günstig. Viel besser als die von diesem Peter',
        creatorId: 'da8ab4c0'
    }
]

const getReviewsOfUser = (userId) => {
    return reviews.filter((review) => review.creatorId === userId)
}

const getReviewsForProducer = (producerId) => {
    return reviews.filter((review) => review.producerId === producerId)
}

const addReviewForProducer = (producerId, review) => {
    const completeReview = { producerId, ...review }
    reviews.push(completeReview)
    return completeReview
}

module.exports = Object.freeze({
    getReviewsOfUser,
    getReviewsForProducer,
    addReviewForProducer
})
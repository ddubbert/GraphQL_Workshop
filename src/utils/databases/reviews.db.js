const reviews = [
    {
        producerId: '1',
        rating: 5,
        comment: 'Toller Kerl. Die Ware ist super und er hat mir auch noch einiges beigebracht.',
        creatorId: '3'
    },
    {
        producerId: '1',
        rating: 1,
        comment: 'Ware ist an sich nicht schlecht... ABER irgendwie waren die Tomaten nach 4 Wochen grün und flauschig. Daher Punktabzug... Unverschämtheit!!!!!!',
        creatorId: '2'
    },
    {
        producerId: '2',
        rating: 5,
        comment: 'Perfekte Lebensmittel. Lecker und günstig. Viel besser als dieser Peter',
        creatorId: '2'
    }
]

const getReviewsOfUser = (userId) => {
    const reviewsOfUser = reviews.filter((review) => review.creatorId === userId)
    if (reviewsOfUser.length === 0) throw new Error('No reviews found.')
    return reviewsOfUser
}

const getReviewsForProducer = (producerId) => {
    const reviewsForProducer = reviews.filter((review) => review.producerId === producerId)
    if (reviewsForProducer.length === 0) throw new Error('No reviews found.')
    return reviewsForProducer
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
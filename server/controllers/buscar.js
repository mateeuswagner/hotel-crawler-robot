const buscar = {
    WebCrawler: (req, res, next) => {
        res.status(200).send({
            message: 'Response',
            code: 200
        })
    }

}

module.exports = buscar;
const axios = require('axios');
const cheerio = require('cheerio');

const validators = require('../validators');

const buscar = {
    webCrawler: (req, res) => {
        const validation = validators.validateBuscar(req);
        if (!validation.isValid) {
            res.status(400).send({
                error: validation
            });
        }
        // TODO Crawl
        // TODO Make response
        res.status(200).send();
    }
}

module.exports = buscar;
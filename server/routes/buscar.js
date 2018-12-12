const Buscar = require('../controllers/buscar');

module.exports = (router) => {
    router.route('/buscar').post(Buscar.WebCrawler);
}
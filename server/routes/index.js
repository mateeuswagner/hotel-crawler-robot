const Buscar = require('./buscar');
const WebviewTemplates = require('./webviewTemplates');

module.exports = (router) => {
    Buscar(router),
    WebviewTemplates(router)
}
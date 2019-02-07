const { WebviewGetFile } = require('../controllers/webviewTemplates');

module.exports = (router) => {
    router.route('/webview_templates/checkin_checkout_selector')
        .get((req, res, next) => WebviewGetFile(req, res, next, 'checkin_checkout_selector.html'));
}
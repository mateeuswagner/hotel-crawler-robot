const config = require('../config');

const WebviewGetFile = (req, res, next, fileName, templateFolder) => {
    templateFolder = templateFolder || config.webview.defaultTemplatesFolder;
    res.sendFile(process.cwd() + '/' + templateFolder + '/' + fileName);
    return;
}


const webview_templates = {
    WebviewGetFile
}

module.exports = webview_templates;
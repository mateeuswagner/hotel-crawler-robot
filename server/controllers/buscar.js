const { crawler } = require('../config');
const puppeteer = require('puppeteer');
const qs = require('querystring');
const cheerio = require('cheerio');
const helpers = require('../helpers');


const validators = require('../validators');

fetchWebsitePage = async (baseUrl, params) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true});
    const page = await browser.newPage();
    await page.goto(baseUrl + '/chain.aspx?' + qs.stringify(params));
    await page.waitForSelector(crawler.resultField).catch((err) => console.log(err));
    let html = await page.evaluate(() => new XMLSerializer().serializeToString(document)).catch((err) => console.log(err));
    browser.close();
    return html;
}




parseWebsiteBody = (body) => {
    let response = {available: []};
    const $ = cheerio.load(body);
    $(crawler.resultField).find('.entry.available').each((index, elem) => {
        let room = {};
        $elem = cheerio.load(elem);
        
        let imageURL = $elem('.thumb').find('.image > a').attr('href');
        if (helpers.relativeURLPathCheck(imageURL)){
            imageURL = crawler.website + imageURL;
        }
        room.imageURL = imageURL;

        const $description = $elem('.description');
        room.name = $description.find('h5 > a').html();
        room.description = $description.find('p').html();
        room.price = $description.find('.bestChainPriceTextColor').html();
        
        response.available.push(room);
    });
    return response;
}

const buscar = {
    webCrawler: (req, res) => {
        const validation = validators.validateBuscar(req);
        if (!validation.isValid) {
            res.status(400).send({
                error: validation
            });
        }
        let params = crawler.fixedParams;
        params.CheckIn = req.body.checkin.replace(new RegExp('/', 'g'), ''); // remove /
        params.CheckOut = req.body.checkout.replace(new RegExp('/', 'g'), ''); // remove /
        fetchWebsitePage(crawler.website, params).then((html) => {
            res.status(200).send(parseWebsiteBody(html));
        });
    }
}

module.exports = buscar;
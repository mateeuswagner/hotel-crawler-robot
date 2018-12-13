const { crawler } = require('../config');
const puppeteer = require('puppeteer');
const qs = require('querystring');
const cheerio = require('cheerio');
const helpers = require('../helpers');


const validators = require('../validators');

fetchWebsitePage = async (baseUrl, params) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true});
    const page = await browser.newPage();
    await page.goto(baseUrl + '/default.aspx?' + qs.stringify(params));

    // Wait for mandatory information
    await page.waitForSelector('#rooms_results');
    await page.waitForFunction('document.querySelector("h6.bestPriceTextColor").innerText');

    const html = await page.evaluate(() => new XMLSerializer().serializeToString(document)).catch((err) => console.log(err));
    browser.close();
    return html;
}




parseWebsiteBody = (body) => {
    let response = {available: []};
    const $ = cheerio.load(body);
    $('tr.roomName').each((index, elem) => {
        let room = {};
        $elem = cheerio.load(elem);
        
        let imageURL = $elem('.roomSlider').find('.slide').not('.bx-clone').find('img').attr('src');
        if (helpers.relativeURLPathCheck(imageURL)){
            imageURL = crawler.website + imageURL;
        }
        room.imageURL = imageURL;

        const $description = $elem('.excerpt');
        room.name = $description.find('h5 > a').html();
        room.description = $description.find('p > a').html();
        room.price = $elem('h6.bestPriceTextColor').html();

        response.available.push(room);
    });
    return response;
}

const buscar = {
    webCrawler: (req, res) => {
        const validation = validators.validateBuscar(req);
        if (!validation.isValid) {
            res.status(400).send({
                err: validation
            });
            return;
        }
        let params = crawler.fixedParams;
        params.CheckIn = req.body.checkin.replace(new RegExp('/', 'g'), ''); // remove /
        params.CheckOut = req.body.checkout.replace(new RegExp('/', 'g'), ''); // remove /
        fetchWebsitePage(crawler.website, params).then((html) => {
            res.status(200).send(parseWebsiteBody(html));
        }).catch((err) => {
            res.status(408).send({err: err});
        });
    }
}

module.exports = buscar;
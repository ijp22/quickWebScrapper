const PORT = 3000;
const URL = 'https://www.theguardian.com/uk';
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');

const app = express();
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

axios(URL)
    .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const articles = [];
        $('.fc-item__title', html).each(function () {
            const title = $(this).text();
            const link = $(this).find('a').attr('href');
            articles.push({
                title,
                link,
            });
        });
        console.log(articles);
    })
    .catch((err) => console.log(err));

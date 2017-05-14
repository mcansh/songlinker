const express = require('express')
    , cheerio = require('cheerio')
    , request = require('request');

var app = express();
var url = 'https://songlink.io/';

app.get('/', (req, res, next) => {
    if (!req.query || !req.query.url) return next();

    var query = url + req.query.url;
    request(query, (err, req, body) => {
        var $ = cheerio.load(body);
        var links = [];

        $('div.page-content div').children().each((_, elem) => {
            links.push($(elem).attr('href'));
        });

        links = links.splice(2, 5);
        res.send(links);
    });
});

app.get('*', (req, res) => {
    res.send({error: ':('});
});

app.listen(8030);
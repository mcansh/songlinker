const express = require('express');
const cheerio = require('cheerio');
const request = require('request');

const app = express();
const url = 'https://songlink.io/';

app.get('/*', (req, res, next) => {
  const queryURL = req.params[0];
  if (!req.params || !queryURL) return next();

  const query = url + queryURL;
  request(query, (err, req, body) => {
    const $ = cheerio.load(body);
    let links = [];

    $('div.page-content div').children().each((_, elem) => {
      links.push($(elem).attr('href'));
    });

    links = links.splice(2, 5);
    res.send(links);
  });
});

app.get('*', (req, res) => {
  res.send({ error: ':(' });
});

app.listen(8030);

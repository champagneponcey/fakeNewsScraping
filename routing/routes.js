// require express
const express = require("express");

// initialize express
var app = express();

// a GET request to scrape website
app.get("/scrape", function(req, res) {
    // grab body of html with request
    request("http://www.byrdie.com/section/skin", function(error, response, html) {
        // load cheerio and save to $ for easy shorthand
        var $ = cheerio.load(html);

        // Grab every promo-feed-img within div tag
        $("div.promo-feed-img").each(function(i, element) {
            // save empty result object
            var results = {};

            var title = $(element).children().text();
            var link = $(element).children().attr("href");
            var imgLink = $(element).children().find("img").attr("src");
            // var image = $(element).children().image();

            results.push({
                Title: title,
                Link: link,
                ImgLink: imgLink
            });
        });

        console.log(results);
    })
})

app.post("/submit", function(req, res) {
    var user = new Example(req.body);
})
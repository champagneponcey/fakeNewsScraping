const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");

var app = express();

console.log("\n**********************************\n" +
    "Grabbing every article name and link\n" +
    "from Byrdie's main page: " +
    "\n**********************************\n");

request("http://www.byrdie.com/", function(error, response, html) {
    var $ = cheerio.load(html);

    var results = [];

    $("a.jw-card-title").each(function(i, element) {

        var title = $(element).text();
        var link = $(element).attr("href");
        // var image = $(element).children().image();

        results.push({
            Title: title,
            Link: link
                // image: image
        });
    });

    console.log(results);
})
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");

mongoose.Promise = Promise;

var app = express();

console.log("\n**********************************\n" +
    "Grabbing every article name and link\n" +
    "from Byrdie's main page: " +
    "\n**********************************\n");

request("http://www.byrdie.com/section/skin", function(error, response, html) {
    var $ = cheerio.load(html);

    var results = [];

    $("div.promo-feed-img").each(function(i, element) {

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
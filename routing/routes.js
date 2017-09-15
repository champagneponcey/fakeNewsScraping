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

            // add text and href of everylink and save them to result object
            results.title = $(this).children("a").text();
            results.link = $(this).children("a").attr("href");
            results.imgLink = $(this).children("a").find("img").attr("scr");

            // using article model, create a new entry
            var entry = new Article(results);

            // save new entry to db
            entry.save(function(err, doc) {
                // log error if any
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });
        });
    });
    // tell browser scraping finished
    res.send("Scrape Complete");
});

// will get scraped articles from DB
app.get("/articles", function(req, res) {
    // grab every article from db
    Article.find({}, function(error, doc) {
        // log any errors
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

// create/replace notes for articles
app.post("/articles/:id", function(req, res) {
    // create new note and pass the req.body to entry
    var newNote = new Note(req.body);

    // save new note to db
    newNote.save(function(error, doc) {
        // log any errors
        if (error) {
            console.log(error);
        } else {
            // use article id to find and update note
            Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
                // execute query
                .exec(function(err, doc) {
                    // log any errors
                    if (err) {
                        console.log(err);
                    } else {
                        // or send document to browser
                        res.send(doc);
                    }
                });
        }
    });
});
// Dependencies
const express = require("express");
const handlebars = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// require note and article model
const Note = require("./model/Note.js");
const Article = require("./model/Article.js");

// requiring our scraping tools
const cheerio = require("cheerio");
const request = require("request");

// set mongoose with JS ES6 Promises
mongoose.Promise = Promise;

PORT = process.env.PORT || 3333;
// initialize Express
var app = express();

// configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Static file support with public folder
app.use(express.static("public"));

// Database config for mongoose
// db: beautyblog
mongoose.connect("mongodb://heroku_nh1m14t6:gmj8kt0oqb44lirl3guvqoffn1@ds133104.mlab.com:33104/heroku_nh1m14t6", { useMongoClient: true });
// hook mongoose connection to db
var db = mongoose.connection;

// log any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// log success msg when connect to mongoDB collection
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

console.log("\n**********************************\n" +
    "Grabbing every article name and link\n" +
    "from Byrdie's main page: " +
    "\n**********************************\n");

app.listen(PORT, function() {
    console.log("App listening on port: " + PORT)
});


// Routes
// =============================================

// initialize express
var app = express();

// define index path
app.get("/", function(req, res) {
    res.sendFile("index");
});


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
            results.title = $(this).children("a").find("img").attr("alt");
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
    res.json('hi')
        // grab every article from db
        // Article.find({}, function(error, doc) {
        //     // log any errors
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         res.json(doc);
        //     }
        // });
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
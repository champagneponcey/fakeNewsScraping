// Routes
// =============================================

// import articles and notes from controller
var articleController = require("../controllers/articles");
var notesController = require("../controllers/notes");

module.exports = function(router) {
    // define index path to render homepage
    router.get("/", function(req, res) {
        res.sendFile("index");
    });

    // renders saved handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    // this handles scraping more articles to add to db
    router.get("/api/fetch", function(req, res) {
        // within the articles controller, will scrape for new article and save unique ones to db
        articleController.fetch(function(err, docs) {
            // if no new articles, send message to user alerting them
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today. Please check back tomorrow."
                });
            } 
            // otherwise, alert how many new articles
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles."
                });
            }
        });
    });

    // handles retrieving articles from db
    router.get("/api/headlines", function(req, res) {
        // use articleController get method and pass in whether to save or not
        articleController.get(req.query, function(data) {
            // send article data back as JSON
            res.json(data);
        });
    });

    // handle deleting articles
    router.deletee("/api/articles/:id", function(req, res) {
        // set id property object to id in req.params
        var query = { _id: req.params.id };
        // use articleController delete method to pass query obj containing id of article want to delete
        articleController.delete(query, function(err, data) {
            // sent results back as JSON
            res.json(data);
        });
    });


    // a GET request to scrape website
    router.get("/scrape", function(req, res) {
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
                collection.find(entry);

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
    router.get("/articles", function(req, res) {

        // grab every article from db
        Article.find({}, function(error, doc) {
            // var result = content;
            // log any errors
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
    });

    // create/replace notes for articles
    router.post("/articles/:id", function(req, res) {
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
    })
};
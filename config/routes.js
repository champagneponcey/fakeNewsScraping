// Routes
// =============================================

// import articles and notes from controller
var articleController = require("../controllers/articles");
var notesController = require("../controllers/notes");

module.exports = function(router) {
    // define index path to render homepage
    router.get("/", function(req, res) {
        res.render("index");
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
    router.delete("/api/articles/:id", function(req, res) {
        // set id property object to id in req.params
        var query = { _id: req.params.id };
        // use articleController delete method to pass query obj containing id of article want to delete
        articleController.delete(query, function(err, data) {
            // sent results back as JSON
            res.json(data);
        });
    });

    // handle updating article, esp when saving
    router.put("/api/articles", function(req, res) {
        articleController.update(req.body, function(err, data) {
            // send results back as JSON
            res.json(data);
        });
    });

    // handle getting notes for specific article
    router.get("/api/notes/:article_id", function(req, res) {
        var query = { _id: req.params.article_id };
        // get all notes using noteController get method
        notesController.get({}, function(err, data) {
            // send note back as JSON
            res.json(data);
        });
    });

    // handle deleting note for specific article
    router.delete("/api/notes/:id", function(req, res) {
        var query = { _id: req.params.id };
        // use notesController to delete by id
        notesController.delete(query, function(err, data) {
            // send back as JSON
            res.json(data);
        });
    });
};
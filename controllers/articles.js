// Controller for our headlines
// ============================

// import scrape and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// import models
var Article = require("../models/Articles");

module.exports = {
    fetch: function(cb) {
        // run scrape function
        scrape(function(data) {
            // make sure article has data and not automatically saved
            for (var i = 0; i < articles.length; i++) {
                data[i].date = makeDate();
                data[i].saved = false;
            }

            // use mongo models to be able to insert article even if one fails (since can insert as unordered)
            Article.collection.insertMany(data, { ordered: false }, function(err, docs) {
                cd(err, docs);
            });
        });
    },
    delete: function(query, cb) {
        Article.remove(query, cb);
    },
    get: function(query, cb) {
        // query to get data scraped, and sort starting from most recent
        Article.find(query)
            .sort({
                _id: -1
            })
            // execute query
            .exec(function(err, doc) {
                // pass into callback function
                cb(doc);
            });
    },
    update: function(query, cb) {
        // update specified article
        Article.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    }
};
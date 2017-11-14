// scrape script
// ===============================================

// require request and cheerio to be able to scrape
var request = require('request');
var cheerio = require('cheerio');

// function to allow us to scrape from Byrdie website
var scrape = function(cb) {
    // grab body of html with request
    request("http://www.byrdie.com/section/skin", function(error, response, html) {
        // load cheerio and save to $ for easy shorthand
        var $ = cheerio.load(html);

        // an empty array to save article info in
        var results = [];

        // Grab every promo-feed-img within div tag
        $("div.promo-feed-img").each(function(i, element) {
            
        // Then we grab the inner text of the this element and store it
        // to the head variable. This is the article headline
        var title = $(this).children("a").find("img").attr("alt");
        var link = $(this).children("a").attr("href");
        var img = $(this).children("a").find("img").attr("scr");

        // if head/link/img are all there then do the following
        if (title && link && img) {
            // trim function to tidy our headlines and summaries
            // remove extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
            var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var linkNeat = link.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            // initialize object to push to article array
            var addData = {
                title: titleNeat,
                link: linkNeat,
                img: img
            };

            results.push(addData);
        }
    });

    // send array of article to cb function
    cb(results);
});
};

// export function
module.exports = scrape;
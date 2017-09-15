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
mongoose.connect("mongodb://localhost/beautyblog");
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
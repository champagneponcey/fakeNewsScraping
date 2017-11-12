// Dependencies
const express = require("express");
const handlebars = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");
const methodOverride = require("method-override");

// require note and article model
// const Note = require("./model/Note.js");
// const Article = require("./model/Article.js");

// requiring our scraping tools
// const cheerio = require("cheerio");
// const request = require("request");

// set mongoose with JS ES6 Promises
mongoose.Promise = Promise;

PORT = process.env.PORT || 3333;
// initialize Express
var app = express();

// // Require our routes file pass our router object
require("./config/routes")(router);

// configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));

// Have every request go through our router middleware
app.use(router);

// Static file support with public folder
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
  }));
  app.set("view engine", "handlebars");

// Database config for mongoose
// db: beautyblog
mongoose.connect("mongodb://heroku_nh1m14t6:gmj8kt0oqb44lirl3guvqoffn1@ds133104.mlab.com:33104/heroku_nh1m14t6", { useMongoClient: true });
// hook mongoose connection to db
var db = mongoose.connection;
var collection = db.collection('beautyviddb');
// var finder = collection.find();


// exports.beautyList = function(beauty, cb) {
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



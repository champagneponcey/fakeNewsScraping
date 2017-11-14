// require mongoose
var mongoose = require("mongoose");

// creating Schema class
var Schema = mongoose.Schema;

// creates article schema
var ArticleSchema = new Schema({
    // requires a title
    title: {
        type: String,
        require: true
    },
    // requires a link
    link: {
        type: String,
        required: true
    },
    // referring to note model
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

// create article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// export model
module.exports = Article;
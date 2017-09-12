const express = require("express");

var app = express();

app.post("/submit", function(req, res) {
    var user = new Example(req.body);
})
// articles as a json
$.getJSON("/articles", function(data) {
    // for each on
    for (var i = 0; i < data.length; i++) {
        // display info on page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
})
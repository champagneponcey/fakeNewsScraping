// articles as a json
$(document).on("click", "#getArticle", function() {
    $.getJSON("/articles", function(data) {
        // for each on
        for (var i = 0; i < data.length; i++) {
            // display info on page
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    });
});

$(document).on("click", "p", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        .done(function(data) {
            console.log(data);

            $("#notes").append("<h2>" + data.title + "<h2>");

            $("#notes").appent("<input id='titleinput' name='title'>");

            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            if (data.note) {
                $("#titlinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val(),
            }
        })
        .done(function(data) {
            console.log(data);
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});
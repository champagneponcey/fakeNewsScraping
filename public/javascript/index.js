$(document).ready(function() {
    // setting ref to article-container div to store data
    var articleContainer = $("#articles");

    // event listener for scrape click
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", "#getArticle", handleArticleScrape);

    // initialize page once page is ready
    initPage();

    // define initPage function
    function initPage() {
        // make sure article div is empty and run AJAX request for any unsaved/new articles
        articleContainer.empty();
        // if we have articles saved, show them
        $.get("/api/articles?saved=false").then(function(data) {
            if (data && data.length) {
                renderArticles(data);
            } else {
                // if not articles saved, show message explaining
                renderEmpty();
            }
        });
    }

    // define function that will render saved articles to the page
    function renderArticles(articles) {
        // pass articles into an array
        var articleList = [];
        // for every article create a panel to store it in
        for (var i=0; i<articles.length; i++) {
            articleList.push(createPanel(articles[i]));
        }
        // now articles can be appended
        articleContainer.append(articleList);
    }

    // define function to create the panel for each article
    function createPanel(article) {
        // set up the panel using jquery
        var panel = $(
            [
                "<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                "<a class='article-link' target='_blank' href='" + article.link + "'>",
                article.title,
                "</a>",
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panelbody'>",
                article.note,
                "</div>",
                "</div>"
            ].join("")
        );
        // make sure id's match
        panel.data("_id", article._id);
        return panel;
    }

    // define renderEmpty function
    function renderEmpty() {
        // alert user that there are no articles to be shown
        var emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What Would You Like To Do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        // append data to page
        articleContainer.append(emptyAlert);
    }

    // define how to handle saved articles
    function handleArticleSave() {
        // trigger when user wants to save article
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
        $.ajax({
            method: "PUT",
            url: "/api/articles",
            data: articleToSave
        }).then(function(data) {
            // if mongoose comes back with ok, will initialize page
            if (data.ok) {
                initPage();
            }
        });
    }

    // define how to handle a scrape event
    function handleArticleScrape() {
        // run this when user hits scrape button
        $.get("/api/fetch").then(function(data) {
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        });
    }
});
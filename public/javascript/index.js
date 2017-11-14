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
        
    }


})
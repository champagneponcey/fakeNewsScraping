# fakeNewsScraping

Under construction...

## What does it do

This is a Simple MERN stack app.


Launch the app on Heroku - https://fakenewsscraping.herokuapp.com/

After Entering a search term - the app search articles from Byrdie.com.

Render the news related to the selected search term.

If the user wants to bookmark it - It will save in the bookmarked section for further references. It also has an option to delete the saved bookmarks.

Bookmark section related to MongoDb/ MLAB and Mongoose and Axios connections.


![starting Window](client/public/12.png "Image 1") 


## How to use the app

1. Clone the repository
2. Connect your local server database or MLAB database
3. Run - ####yarn install#### in main app
4. Run - ####yarn install#### in client folder
5. Run - ####mongod#### to start the Mongo database only if you use the local server
6. Run - ####mongo#### only if you use the local server
7. Run - ####yarn start#### to start 
8. It will open in your browser localserver:3000


# Create React Express App 

used create-react-app <app name>

## About This Boilerplate

This setup allows for a monolithic Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

/**
 * Entry point to Express web server.
 *
 * Import external library modules as needed (eg. body-parser, etc).
 */
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');
const apiRequest = require('request');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Set static folder
app.use(express.static('public'));

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */
// Import routes to match incoming requests
require('./routes')(app, db, apiRequest);

// Root GET request (it doesn't belong in any controller file)
// To render planny's default home page
app.get('/', (request, response) => {
  if (request.cookies['loggedIn'] == 'true') {
    console.log("Rendering itineraries homepage...");
    response.redirect('/itineraries/homepage');
  }
  else {
    console.log("Rendering default page...");
    response.render('home');
  }
});

// Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
  response.render('404');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');

  // close database connection pool
  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});

/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */

 // Import files from the controller so that the functions can be called
 const itineraries = require('./controllers/itineraries');
 const users = require('./controllers/user');

 module.exports = (app, db) => {
   /*
    *  =========================================
    *  Users
    *  =========================================
    */
   // CRUD users
   app.get('/users/register', users.newForm);   // Form to create new user
   app.post('/users', users.create(db));


   // Authentication
   app.post('/users/logout', users.logout);
   app.get('/users/login', users.loginForm);    // Form to authenticate user
   app.post('/users/login', users.login(db));

   /*
    *  =========================================
    *  Itineraries
    *  =========================================
    */
   // CRUD itineraries
   app.get('/itineraries/homepage', itineraries.home(db));
   app.post('/itineraries', itineraries.create(db));
   app.get('/itineraries/homepage/:destination', itineraries.destination(db));
 };

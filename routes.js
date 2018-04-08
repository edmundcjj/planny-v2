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

/**
 * ===========================================
 * Export route functions as a module to be used in index.js file
 * ===========================================
 */
module.exports = (app, db, apiRequest) => {
  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/register', users.newForm); // Form to create new user
  app.post('/users', users.create_user(db));


  // Authentication
  app.post('/users/logout', users.logout);
  app.get('/users/login', users.loginForm); // Form to authenticate user
  app.post('/users/login', users.login(db));

  /*
   *  =========================================
   *  Itineraries
   *  =========================================
   */
  // CRUD itineraries
  app.get('/itineraries/homepage/:destination/:day/create', itineraries.createForm);
  app.get('/itineraries/homepage', itineraries.home(db));
  app.post('/itineraries/homepage/:destination/:day', itineraries.createActivity(db, apiRequest));
  app.post('/itineraries', itineraries.create(db));
  app.get('/itineraries/homepage/:destination', itineraries.destination(db));
  app.get('/itineraries/homepage/:destination/:day', itineraries.day(db));
  app.get('/itineraries/homepage/:destination/:day/:activity_id/edit', itineraries.updateForm(db));
  app.put('/itineraries/homepage/:destination/:day/:activity_id', itineraries.updateActivity(db));
  app.delete('/itineraries/homepage/:destination/:day/:activity_id', itineraries.deleteActivity(db));
};

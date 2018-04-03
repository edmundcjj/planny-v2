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
 const pokemons = require('./controllers/itineraries');
 const users = require('./controllers/user');

 module.exports = (app, db) => {
   /*
    *  =========================================
    *  Users
    *  =========================================
    */
   // CRUD users


   // Authentication

   /*
    *  =========================================
    *  Pokemons
    *  =========================================
    */
   // CRUD itineraries
   
 };

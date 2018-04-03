/**
 * User model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a user (be it C, R, U, D, or Login),
 * one or more of the functions here should be called.
 *
 * NOTE: You can add authentication logic in this model.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

// Library for user authentication
const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (user_dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    // create: (user, callback) => {
    //   // run user input password through bcrypt to obtain hashed password
    //   bcrypt.hash(user.password, 1, (err, hashed) => {
    //     if (err) console.error('error!', err);
    //
    //     // set up query
    //     const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    //     const values = [
    //       user.name,
    //       user.email,
    //       hashed
    //     ];
    //
    //     // execute query
    //     user_dbPool.query(queryString, values, (error, queryResult) => {
    //       // invoke callback function with results after query has executed
    //       callback(error, queryResult);
    //     });
    //   });
    // },
    //
    // login: (user, callback) => {
    //   // TODO: Add logic here
    //   // set up query
    //   const queryString = 'SELECT * from users WHERE email=$1';
    //   const values = [user.email];
    //
    //   // execute query
    //   user_dbPool.query(queryString, values, (error, queryResult) => {
    //     // Compare password entered by user versus password in the database
    //     bcrypt.compare(user.password, queryResult.rows[0].password, (err, res) => {
    //       if (res) {
    //         callback(error, queryResult);
    //       } else {
    //         callback(error, queryResult);
    //       }
    //     });
    //   });
    // }
  };
};

/**
 * Postgres database configuration.
 *
 * Import models and `pg` package.
 * Initialise configuration object with database credentials.
 * Initialise the connection pool with config object.
 *
 * Export the pool and models as a module using `module.exports`.
 */

// Import models and `pg` package
const pg = require('pg');
const itineraries = require('./models/itineraries');
const user = require('./models/user');

//require the url library
//this comes with node, so no need to yarn add
const url = require('url');

//check to see if we have this heroku environment variable
if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
}else{
  //otherwise we are on the local network
  var configs = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'planny',
    port: 5432,
    password: 'edmund92chow'
  };
}

// // Initialise configuration object with database credentials.
// const configs = {
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'planny',
//   port: 5432,
//   password: 'edmund92chow'
// };

// Initialise the connection pool with config object.
const pool = new pg.Pool(configs);

pool.on('error', function(err) {
  console.log('idle client error', err.message, err.stack);
});

// Export the pool and models as a module using 'module.exports'
module.exports = {
  pool: pool,
  itineraries: itineraries(pool),
  user: user(pool)
};

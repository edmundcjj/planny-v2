/**
 * Itineraries model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a itinerary (be it C, R, U, or D),
 * one or more of the functions here should be called.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (itinerary_dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    // SQL logic to insert new pokemon data into the database
    create: (itinerary, callback) => {
      // set up query to insert new pokemon into the database
      console.log("Create start date => ", itinerary.start_date);
      console.log("Create end date => ", itinerary.end_date);

      const queryString = `INSERT INTO itineraries (u_id, name, start_date, end_date)
          VALUES ($1, $2, $3, $4)`;
      const values = [
        itinerary.userId,
        itinerary.destination,
        itinerary.start_date,
        itinerary.end_date
      ];

      // execute query
      itinerary_dbPool.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        callback(err, queryResult);
      });
    },

    // SQL logic to retrieve list of itineraries belonging to the logged in user
    get: (username, callback) => {
      const queryString = 'SELECT users.id, itineraries.name FROM itineraries INNER JOIN users ON users.id = itineraries.u_id WHERE users.name = $1';
      const values = [username];

      // set up query to retrieve the data of a specific pokemon
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        callback(error, queryResult);
      });
    },

    // SQL logic to retrieve the data of a single itinerary, mainly the dates to calculate the duration of the trip
    get_destination: (destination, callback) => {
      console.log("Inside get_destination model function");
      console.log("Before querying...");
      const queryString = "SELECT name, date_part('year', start_date) as start_date_year, date_part('month', start_date) as start_date_month, date_part('day', start_date) as start_date_day, date_part('year', end_date) as end_date_year, date_part('month', end_date) as end_date_month, date_part('day', end_date) as end_date_day FROM itineraries WHERE name = $1"
      // const queryString = "SELECT name, date_part('day', start_date) AS start_date_day, date_part('day', end_date) AS end_date_day FROM itineraries WHERE name=$1";
      // const queryString = 'SELECT name, start_date, end_date FROM itineraries WHERE name=$1';
      const values = [destination];

      // set up query to retrieve the data of a specific pokemon
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        console.log("After querying...");
        callback(error, queryResult);
      });
    },

    // // SQL logic to update pokemon data of a specific id
    // update: (pokemon, callback) => {
    //   console.log("Inside update pokemon models...");
    //   const queryString = 'UPDATE pokemons SET name=$1, img=$2, height=$3, weight=$4 WHERE pokemons.id = $5';
    //   const values = [pokemon.name, pokemon.img, pokemon.height, pokemon.weight, parseInt(pokemon.id)];
    //
    //   // set up query to update data of a specific pokemon
    //   console.log("Before updating database...");
    //   pokemon_dbPool.query(queryString, values, (error, queryResult) => {
    //     callback(error, queryResult);
    //   });
    //   console.log("After updating database...");
    // }
  };
};

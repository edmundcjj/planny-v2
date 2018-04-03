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
module.exports = (pokemon_dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    // SQL logic to insert new pokemon data into the database
    // create: (pokemon, callback) => {
    //   // set up query to insert new pokemon into the database
    //   const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
    //       VALUES ($1, $2, $3, $4, $5)`;
    //   const values = [
    //     pokemon.name,
    //     pokemon.num,
    //     pokemon.img,
    //     pokemon.weight,
    //     pokemon.height
    //   ];
    //
    //   // execute query
    //   pokemon_dbPool.query(queryString, values, (err, queryResult) => {
    //     // invoke callback function with results after query has executed
    //     callback(err, queryResult);
    //   });
    // },
    //
    // // SQL logic to retrieve pokemon data of a specific id
    // get: (id, callback) => {
    //   const values = [id];
    //
    //   // set up query to retrieve the data of a specific pokemon
    //   pokemon_dbPool.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
    //     callback(error, queryResult);
    //   });
    // },
    //
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

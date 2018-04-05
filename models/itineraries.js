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
 * Export model functions as a module to be used in db.js file
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

      const queryString = 'INSERT INTO itineraries (u_id, name, start_date, end_date) VALUES ($1, $2, $3, $4)';
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
      const queryString = "SELECT id, name, date_part('year', start_date) as start_date_year, date_part('month', start_date) as start_date_month, date_part('day', start_date) as start_date_day, date_part('year', end_date) as end_date_year, date_part('month', end_date) as end_date_month, date_part('day', end_date) as end_date_day FROM itineraries WHERE name = $1"
      // const queryString = "SELECT name, date_part('day', start_date) AS start_date_day, date_part('day', end_date) AS end_date_day FROM itineraries WHERE name=$1";
      // const queryString = 'SELECT name, start_date, end_date FROM itineraries WHERE name=$1';
      const values = [destination];

      // set up query to retrieve the data of a specific pokemon
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        console.log("After querying...");
        callback(error, queryResult);
      });
    },

    // SQL logic to retrieve the data of a single day of a single itinerary
    get_day: (day, itinerary_id, userId, callback) => {
      console.log("Inside get_day model function");
      console.log("Before querying...");

      const queryString = "SELECT * FROM day_card WHERE day=$1 AND i_id=$2 AND u_id=$3 ORDER BY id ASC";
      const values = [day, itinerary_id, userId]

      // set up query to retrieve details of a specific day in a specific itinerary
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        console.log("After querying...");
        callback(error, queryResult);
      });
    },

    // SQL logic to retrieve the data of a specific activity of a single day of a single itinerary
    get_activity: (activity_id, callback) => {
      console.log("Inside get_activity model function");
      console.log("Before querying...");

      const queryString = "SELECT * FROM day_card WHERE id = $1";
      const values = [activity_id];

      // set up query to retrieve details of a specific day in a specific itinerary
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        console.log("After querying...");
        callback(error, queryResult);
      });
    },

    // SQL logic to update activity data of a specific id
    update_activity: (activity, activity_id, callback) => {
      console.log("Inside update activity models...");
      console.log("Activity data => ", activity);

      const queryString = 'UPDATE day_card SET start_at=$1, end_at=$2, image=$3, location=$4, address=$5, description=$6 WHERE id = $7';
      const values = [activity.start_time, activity.end_time, activity.image_url, activity.location, activity.address, activity.description, activity_id];

      // set up query to update data of a specific activity of a specific day of a specific itinerary
      console.log("Before updating database...");
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        callback(error, queryResult);
      });
      console.log("After updating database...");
    },

    // SQL logic to delete a activity record from the database
    delete_activity: (activity_id, callback) => {
      console.log("Inside delete activity models...");

      const queryString = 'DELETE FROM day_card WHERE id=$1';
      const values = [activity_id];

      // set up query to delete data of a specific activity of a specific day of a specific itinerary
      console.log("Before updating database...");
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        callback(error, queryResult);
      });
      console.log("After updating database...");
    },

    // SQL logic to create new activity
    create_activity: (activity, itinerary_id, day, userId, callback) => {
      console.log("Inside create activity models...");

      const queryString = 'INSERT INTO day_card (i_id, u_id, day, start_at, end_at, image, location, address, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      const values = [itinerary_id, userId, day, activity.start_time, activity.end_time, activity.image, activity.location, activity.address, activity.description];

      // set up query to create new activity entry
      console.log("Before updating database...");
      itinerary_dbPool.query(queryString, values, (error, queryResult) => {
        callback(error, queryResult);
      });
      console.log("After updating database...");
    }
  };
};

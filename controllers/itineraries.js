/**
 * Itineraries controller functions.
 *
 * Each itinerary-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

// const request = require('request');

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
// Render homepage.handlebars with the list of itineraries belonging to one user
const home = (itineraryModel) => {
  return (request, response) => {
    let name = request.cookies['username'];
    itineraryModel.itineraries.get(name, (error, queryResult) => {
      console.log("queryResult for itineraries homepage length => ", queryResult.rows.length);

      // Result returned contains more than 1 itineraries
      if (queryResult.rows.length > 0) {
        console.log("Result returned contains more than 1 itineraries...");

        let loggedIn = request.cookies['loggedIn'];
        let username = request.cookies['username'];

        response.cookie('userId', queryResult.rows[0].id);

        let context = {
          username: username,
          loggedIn: loggedIn,
          plan_list: []
        }

        // Populate the list of itineraris the user has
        for (let i = 0; i < queryResult.rows.length; i++) {
          context.plan_list.push(queryResult.rows[i].name);
        }
        response.render('itineraries/homepage', context);
      }
      // Result returned contains 0 itineraries
      else {
        console.log("Result returned contains 0 itineraries...");

        itineraryModel.itineraries.get_user(name, (error, queryResult) => {
          let loggedIn = request.cookies['loggedIn'];
          let username = request.cookies['username'];

          response.cookie('userId', queryResult.rows[0].id);

          let context = {
            username: username,
            loggedIn: loggedIn,
            plan_list: []
          }
          response.render('itineraries/homepage', context);
        });
      }
    });
  };
};

// Render the number of days for the itinerary in destination.handlebars
const destination = (itineraryModel) => {
  return (request, response) => {
    console.log("Destination parameter => ", request.params.destination);
    itineraryModel.itineraries.get_destination(request.params.destination, (error, queryResult) => {

      // Stitch back the date after extracting out the individual elements
      let startDate = queryResult.rows[0].start_date_year + "-" + queryResult.rows[0].start_date_month + "-" + queryResult.rows[0].start_date_day;
      let endDate = queryResult.rows[0].end_date_year + "-" + queryResult.rows[0].end_date_month + "-" + queryResult.rows[0].end_date_day;
      let duration = (queryResult.rows[0].end_date_day - queryResult.rows[0].start_date_day) + 1;

      let context = {
        itinerary_id: queryResult.rows[0].id,
        destination: queryResult.rows[0].name,
        start_date: startDate,
        end_date: endDate,
        day_list: [],
        loggedIn: request.cookies['loggedIn']
      }

      let itinerary_id_key = String(context.destination) + "_itinerary_id";
      response.cookie(itinerary_id_key, context.itinerary_id);

      for (var i = 0; i < duration; i++) {
        let actual_day = i + 1;
        let days = {
          'destination': queryResult.rows[0].name,
          'day': actual_day
        }
        context.day_list.push(days);
      }

      response.render('itineraries/destination', context);
    });
  };
};

// Render the details of the day in the itinerary in day.handlebars
const day = (itineraryModel) => {
  return (request, response) => {
    console.log("Inside day function in itineraries controller...");
    let itinerary_id_key = request.params.destination + "_itinerary_id";

    itineraryModel.itineraries.get_day(request.params.day, request.cookies[itinerary_id_key], request.cookies['userId'], (error, queryResult) => {
      console.log("queryResult of day => ", queryResult);

      let context = {
        loggedIn: request.cookies['loggedIn'],
        day: request.params.day,
        destination: request.params.destination,
        day_items: []
      }

      for (var i = 0; i < queryResult.rows.length; i++) {
        let start_time_array = queryResult.rows[i].start_at.split('');
        let start_time = start_time_array[0] + start_time_array[1] + start_time_array[2] + start_time_array[3] + start_time_array[4];

        let end_time_array = queryResult.rows[i].end_at.split('');
        let end_time = end_time_array[0] + end_time_array[1] + end_time_array[2] + end_time_array[3] + end_time_array[4];

        let item = {
          'start_time': start_time,
          'end_time': end_time,
          'image': queryResult.rows[i].image,
          'location': queryResult.rows[i].location,
          'address': queryResult.rows[i].address,
          'description': queryResult.rows[i].description,
          'destination': request.params.destination,
          'day': request.params.day,
          'activity_id': queryResult.rows[i].id
        }
        context.day_items.push(item);
      }

      response.render('itineraries/day', context);
    });
  };
};

// Retrieve data of a specifc activity and render it into a form in edit_activity.handlebars
const updateForm = (itineraryModel) => {
  return (request, response) => {
    // use itineraries model method `get` to retrieve activity data
    itineraryModel.itineraries.get_activity(request.params.activity_id, (error, queryResult) => {
      console.log(queryResult.rows[0]);
      // queryResult contains pokemon data returned from the pokemon model
      if (error) {
        console.error('error getting activity:', error);
        response.sendStatus(500);
      } else {
        let context = {
          'destination': request.params.destination,
          'activity': queryResult.rows[0],
          'loggedIn': request.cookies['loggedIn']
        }

        response.cookie('activity_id', queryResult.rows[0].id);

        // render pokemon.handlebars in the pokemon folder
        response.render('itineraries/edit_activity', context);
      }
    });
  };
};

// Update data of existing activity that belongs to a specific day of a itinerary
const updateActivity = (itineraryModel) => {
  return (request, response) => {
    let activity_id = request.cookies['activity_id'];
    console.log("Updated activity data => ", request.body);

    // use itineraries model method 'update' to update data of a specific activity of a specific of a specific itinerary
    itineraryModel.itineraries.update_activity(request.body, activity_id, (error, queryResult) => {
      console.log("Controller - updating activity data in progress...");

      if (error) {
        console.error('error updating activity:', error);
        response.sendStatus(500);
      } else {
        // redirect back to display the activities of a particular day of a particular itinerary
        console.log("Controller - update activity finished...");
        response.redirect('/itineraries/homepage/' + request.params.destination + "/" + request.params.day);
      }
    });
  };
};

// Delete activity record of a day from the database
const deleteActivity = (itineraryModel) => {
  return (request, response) => {
    let activity_id = request.params.activity_id;

    // use itineraries model method 'delete' to delete data of a specific activity of a specific of a specific itinerary
    itineraryModel.itineraries.delete_activity(activity_id, (error, queryResult) => {
      console.log("Controller - deleting activity data in progress...");

      if (error) {
        console.error('error deleting activity:', error);
        response.sendStatus(500);
      } else {
        // redirect back to display the activities of a particular day of a particular itinerary
        console.log("Controller - delete activity finished...");
        response.redirect('/itineraries/homepage/' + request.params.destination + "/" + request.params.day);
      }
    });
  };
};

// Render the create new activity form in create_activity.handlebars
const createForm = (request, response) => {
  let context = {
    'destination': request.params.destination,
    'day': request.params.day
  }
  response.render('itineraries/create_activity', context);
};

// Create new activity and add it to the day and update day.handlebars
const createActivity = (itineraryModel, apiRequest) => {
  return (request, response) => {
    console.log("Inside createActivity function in controllers");
    console.log("Request body => ", request.body);

    let place_id = request.body.place_id;

    const queryString = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place_id + '&key=AIzaSyBeZJwsqljxPJDyg0A9_N6MGDRW065PEvk';
    console.log("Query String for place details => ", queryString);

    // Retrieve details of a place using google place details api
    apiRequest(queryString, function(error, res, body) {
      if (!error && res.statusCode == 200) {
        let dataObj = JSON.parse(body);
        console.log("Place details result => ", dataObj.result);

        let itinerary_id_key = request.params.destination + "_itinerary_id";
        let day = request.params.day;
        let userId = request.cookies['userId'];

        // use itinerary model method `create_activity` to create new activity entry in db
        itineraryModel.itineraries.create_activity(dataObj.result, request.body, request.cookies[itinerary_id_key], day, userId, (error, queryResult) => {
          if (error) {
            console.error('error creating activity:', error);
            response.sendStatus(500);
          }

          if (queryResult.rowCount >= 1) {
            console.log('Activity created successfully');
          } else {
            console.log('Activity could not be created');
          }

          // redirect to day.handlebars to show list of activities
          response.redirect('/itineraries/homepage/' + request.params.destination + "/" + request.params.day);
        });
      }
    });
  };
};

// Logic to create new itinerary
const create = (itineraryModel) => {
  return (request, response) => {

    console.log("Destination entered => ", request.body.destination);

    let itinerary = {
      userId: request.cookies['userId'],
      destination: request.body.destination,
      start_date: request.body.start_date,
      end_date: request.body.end_date
    }

    // use itinerary model method `create` to create new itinerary entry in db
    itineraryModel.itineraries.create(itinerary, (error, queryResult) => {
      if (error) {
        console.error('error creating itinerary:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log('Itinerary created successfully');
      } else {
        console.log('Itinerary could not be created');
      }

      // redirect to user's destination planning workspace
      response.redirect('/itineraries/homepage/' + itinerary.destination);
    });
  };
};

/**
 * ===========================================
 * Export controller functions as a module to be used in routes.js file
 * ===========================================
 */
module.exports = {
  home,
  destination,
  day,
  deleteActivity,
  updateForm,
  updateActivity,
  createActivity,
  create,
  createForm
};

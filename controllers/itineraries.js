/**
 * Itineraries controller functions.
 *
 * Each itinerary-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
// Render itineraries homepage
const home = (itineraryModel) => {
  return (request, response) => {
    let name = request.cookies['username'];
    itineraryModel.itineraries.get(name, (error, queryResult) => {
      console.log("queryResult => ", queryResult.rows);

      let loggedIn = request.cookies['loggedIn'];
      let username = request.cookies['username'];

      response.cookie('userId', queryResult.rows[0].id);

      let context = {
        username : username,
        loggedIn : loggedIn,
        plan_list : []
      }

      // Populate the list of itineraris the user has
      for (let i = 0; i < queryResult.rows.length; i++) {
        context.plan_list.push(queryResult.rows[i].name);
      }
      response.render('itineraries/homepage', context);
    });
  };
};

// Render destination planning workspace page
const destination = (itineraryModel) => {
  return (request, response) => {
    console.log("Destination parameter => ", request.params.destination);
    itineraryModel.itineraries.get_destination(request.params.destination, (error, queryResult) => {
      console.log("queryResult => ", queryResult);

      // Stitch back the date after extracting out the individual elements
      let startDate = queryResult.rows[0].start_date_year + "-" + queryResult.rows[0].start_date_month + "-" + queryResult.rows[0].start_date_day;
      let endDate = queryResult.rows[0].end_date_year + "-" + queryResult.rows[0].end_date_month + "-" + queryResult.rows[0].end_date_day;
      let duration = (queryResult.rows[0].end_date_day - queryResult.rows[0].start_date_day) + 1;

      let context = {
        destination: queryResult.rows[0].name,
        start_date: startDate,
        end_date: endDate,
        day_list: [],
        loggedIn: request.cookies['loggedIn']
      }

      for (var i = 0; i < duration; i++) {
        let day = "Day " + i;
        context.day_list.push(day);
      }

      response.render('itineraries/destination', context);
    });
  };
};

// // Logic to retrieve data of a specific pokemon and display on the page
// const get = (pokemonModel) => {
//   return (request, response) => {
//     // use pokemon model method `get` to retrieve pokemon data
//     pokemonModel.pokemon.get(request.params.id, (error, queryResult) => {
//       // queryResult contains pokemon data returned from the pokemon model
//       if (error) {
//         console.error('error getting pokemon:', error);
//         response.sendStatus(500);
//       } else {
//         // render pokemon.handlebars in the pokemon folder
//         response.render('pokemon/pokemon', {
//           pokemon: queryResult.rows[0]
//         });
//       }
//     });
//   };
// };

// // Retrieve data of a specific pokemon and render into the fields of the update form
// const updateForm = (pokemonModel) => {
//   return (request, response) => {
//     // TODO: Add logic here
//     // use pokemon model method `get` to retrieve pokemon data
//     pokemonModel.pokemon.get(request.params.id, (error, queryResult) => {
//       console.log(queryResult.rows[0]);
//       // queryResult contains pokemon data returned from the pokemon model
//       if (error) {
//         console.error('error getting pokemon:', error);
//         response.sendStatus(500);
//       } else {
//         // render pokemon.handlebars in the pokemon folder
//         response.render('pokemon/edit', {
//           pokemon: queryResult.rows[0]
//         });
//       }
//     });
//   };
// };
//
// // Update data of existing pokemon from the update form
// const update = (pokemonModel) => {
//   return (request, response) => {
//     // TODO: Add logic here
//     // use pokemon model method 'update' to update a specific stats of a pokemon
//     pokemonModel.pokemon.update(request.body, (error, queryResult) => {
//       console.log("Controller - updating in progress...");
//       let poke_id = request.params.id;
//
//       if (error) {
//         console.error('error updating pokemon:', error);
//         response.sendStatus(500);
//       } else {
//         // redirect back to display updated stats of a specific pokemon
//         console.log("Controller - update finished...");
//         response.redirect('/pokemons/' + poke_id);
//       }
//     });
//   };
// };

// // Render the create form to create new pokemon
// const createForm = (request, response) => {
//   response.render('pokemon/new');
// };

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
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
  home,
  destination,
  // get,
//   updateForm,
//   update,
//   createForm,
  create
};

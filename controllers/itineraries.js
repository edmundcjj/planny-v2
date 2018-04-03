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
const home = (request, response) => {
  let loggedIn = request.cookies['loggedIn'];
  let username = request.cookies['username'];

  let context = {
    username : username,
    loggedIn : loggedIn
  }
  response.render('itineraries/homepage', context);
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
//
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
//
// // Render the create form to create new pokemon
// const createForm = (request, response) => {
//   response.render('pokemon/new');
// };
//
// // Logic to create the new pokemon
// const create = (pokemonModel) => {
//   return (request, response) => {
//     // use pokemon model method `create` to create new pokemon entry in db
//     pokemonModel.pokemon.create(request.body, (error, queryResult) => {
//       // queryResult of creation is not useful to us, so we ignore it
//       // (console log it to see for yourself)
//       // (you can choose to omit it completely from the function parameters)
//
//       if (error) {
//         console.error('error getting pokemon:', error);
//         response.sendStatus(500);
//       }
//
//       if (queryResult.rowCount >= 1) {
//         console.log('Pokemon created successfully');
//       } else {
//         console.log('Pokemon could not be created');
//       }
//
//       // redirect to home page after creation
//       response.redirect('/');
//     });
//   };
// };

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
  home,
  // get,
//   updateForm,
//   update,
//   createForm,
//   create
};

/**
 * User controller functions.
 *
 * Each user-related route in `routes.js` will call
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
// Render the form to create new users
const newForm = (request, response) => {
  response.render('user/register');
};

// Logic to create new user
const create = (userModel) => {
  console.log("Inside create user function in controller");
  return (request, response) => {
    // use user model method `create` to create new user entry in db
    userModel.user.create(request.body, (error, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      // (console log it to see for yourself)
      // (you can choose to omit it completely from the function parameters)

      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log('User created successfully');

        // drop cookies to indicate user's logged in status and username
        response.cookie('loggedIn', true);
        response.cookie('username', request.body.name);
      } else {
        console.log('User could not be created');
      }
      response.redirect('/itineraries/homepage');
    });
  };
};

// Logic to clear cookies when user logouts and redirect back to home
const logout = (request, response) => {
  response.clearCookie('loggedIn');
  response.clearCookie('username');
  response.redirect('/');
};

// // Logic to render the form for user login
const loginForm = (request, response) => {
  // Redirect user back to the default page if user is already logged in
  if (request.cookies['loggedIn'] == 'true') {
    response.redirect('/itineraries/homepage');
  } else {
    response.render('user/login');
  }
};

// Logic to verify user login details
const login = (userModel) => {
  return (request, response) => {
    userModel.user.login(request.body, (error, queryResult) => {
      // User verified, redirect back to default page
      if (queryResult) {
        console.log("queryResult => " ,queryResult);
        let user_name = queryResult.rows[0].name;
        response.cookie('loggedIn', true);
        response.cookie('username', user_name);
        response.redirect('/itineraries/homepage');
      }
      // User not verified, redirect back to the login page
      else {
        console.log("Unsuccessful Login...");
        response.redirect('/users/login');
      }
    });
  };
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
  newForm,
  create,
  logout,
  loginForm,
  login
};

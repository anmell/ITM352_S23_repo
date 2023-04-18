/* I, Alanna Mellor, am the author of this code. The following program is a simple server designed to serve an eccomerce website. 
The server recieves data from a products_display.html page and validates the data entered by the user. If the data passes all validations, the user is redirected to an invoice.html page. If the data fails validation, the user remains on the products_display page and is informed of the errors
*/

var express = require('express');
var app = express();
var querystring = require('querystring');


// stores product json data in server memory undet the variable name 'products' and maes it accessible through the root directory and the following json file path
var products = require(__dirname + '/product_data.json');


// function to check is quantities entered are (1) whole numbers, (2) not negative, and (3) a number and not a word or character; taken from previous labs
function isNonNegInt(quantities, returnErrors) {
   errors = []; // assume no errors at first
   if (Number(quantities) != quantities) errors.push(' Not a number'); // Check if string is a number value
   if (quantities < 0) errors.push(' Negative value'); // Check if it is non-negative
   if (parseInt(quantities) != quantities) errors.push(' Not an integer'); // Check that it is an integer


   var returnErrors = returnErrors ? errors : (errors.length == 0);
   return (returnErrors);
};

// Routing 

// monitor all requests; this manages what is output in the console for all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// when the server recieves a GET request for "/product_data.js", the server will respong in javascript with a string of data provided by the JSON file
app.get("/product_data.js", function (request, response, next) {
   response.type('.js');
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

// express middleware the automatically de-codes data encoded in a post request and allows it to be accessed through request.body
app.use(express.urlencoded({ extended: true }));

// assign an empty variable to collect the values entered for each product
var selected_quantites;

// process purchase request (validate quantities, check quantity available)
// when the server recieves a "POST" request, validate data. If valid: route to get to invoice page. If invalid: send error to client
app.post('/login.html', function (request, response) {


   // run through every validation: check all quantities are whole integer numbers, check quantity selected doesn't exceed quantity available, check to make sure user entered at least one thing

   //assign an empty array to collect all values of the textboxes; use to check that at least texbox has a value
   var all_textboxes = [];

   //assign a variable to collect all errors
   var errors_array = [];

   // run a for loop to collect the values of all of the textboxes and store them in an array
   for (let i = 0; i < products.length; i++) {
      all_textboxes.push(request.body[`quantities${i}`]);
   }

   // use an arrow function; call each element of the array as a parameter, then check that "every" element is equal to an empty string. I learned this by RTFM (A LOT of outside research)
   if (all_textboxes.every(element => element === '')) {
      errors_array.push('Please enter at least one quantity');
   }

   // loop through the products array; massive for loop for the second and third validations
   for (let i = 0; i < products.length; i++) {

      //assign a variable to the value of the quantity textbox (whar the user entered for "quantity desired")
      var qty = request.body[`quantities${i}`];

      // assign a variable to the name of each product -- to be used if there is an error; will alert user where the error occured
      var name = products[i].name;

      // assign a variable which calls the function "isNonNegInt"; this function checks if to see if the user has input a string, negtive number, or decimal
      let errors = isNonNegInt(qty, true);

      // assign a variable to the quantity available for each product
      var qa = products[i].quantityAvailable;


      //if there's an empty textbox, let the loop continue
      if (qty == 0) {
         continue;
      }

      //check if quantities are valid via the NonNegInt function; call the function through it's associated variable (errors). If invalid, push an error to the errors_array
      if (errors.length > 0) {
         errors_array.push(`Invalid Quantity for ${products[i].name}`);

      }
      // if the user selects more quantities than are available, push an error into the errors_array
      if (qty > qa) {
         errors_array.push(`The quantity that you have selected for ${name} exceeds the quantity that we have available`);

      }
   }

   // Individual Requirement 1: track the total quantity sold an dynamically display it with the product information
   // add a total_sold property for each json object in json file, initialize it to 0
   // add a line to display this in html file for each product
   // if every validation passes, update the total sold property when you update the quantities available property


   // if quantities entered passes every validation, run a loop through all products to update the quantities available and the total quantities sold
   for (let i = 0; i < products.length; i++) {


       if (errors_array.length == 0) {
         products[i].total_sold += Number(request.body[`quantities${i}`]);
         products[i].quantityAvailable -= request.body[`quantities${i}`];
      }}  


      // after evaluating all the data and updating quantitiesAvailable and total_sold, decide if the client should be sent back to products_display (meaning at least one validation was not passed) or move forward to the invoice page (all data entered is valid)
      for (let i = 0; i < products.length; i++) {

         // if errors_array.length is 0, then they can go to the invoice page. If array is not empty, send them back to the products_display page
         if (errors_array.length == 0) {
            selected_quantites = request.body;
            response.redirect('./login.html?' + querystring.stringify ({selected_quantites:`${JSON.stringify(selected_quantites)}`}));
         } else {
            response.redirect('./product_display.html?' + querystring.stringify({ ...request.body, errors_array: `${JSON.stringify(errors_array)}`}));
         }
      }
   });


// Login 

// load file system (fs) interface
var fs = require ('fs');

var filename = __dirname + '/user_data.json'; 

// objective: read the user_data file, get the contents; taken from File IO Lab
var user_data_object_JSON = fs.readFileSync(filename, 'utf-8');

// parse through user_data JSON, turn it into an object; Taken from File IO lab
var user_data= JSON.parse(user_data_object_JSON);  



app.post("/invoice.html", function (request, response) {
   let params = new URLSearchParams(request.query)
 
// Process login form POST and redirect to logged in page if ok, back to login page if not


// assign variables to collect the values entered into the username and password fields
var username = request.body[`uname`].toLowerCase();
var password = request.body[`psw`];

// assign empty variable  to collect error; alert of incorrect password, or prompt user to create an account if username does not exist 
var error_check = [];

//if username does not exist, redirect back to login.html, pass error via query string
if (!user_data.hasOwnProperty(`${username}`)){
   error_check.push(`The username you've entered does not exist, please create a new account`)
   response.redirect('./login.html?' + querystring.stringify({ ...request.body, error_check: `${JSON.stringify(error_check)}`}));
}

// if username does exist, but password does match, redict back to login.html, pass error via query string
if (user_data.hasOwnProperty(`${username}`) && password !== user_data[username][`password`]){
   error_check.push(`Incorrect password for ${username}`)
   response.redirect('./login.html?' + querystring.stringify({ ...request.body, error_check: `${JSON.stringify(error_check)}`}));
}


//check if the username exists in the user_data file and that the password matches appropriately
if (user_data.hasOwnProperty(`${username}`) && password == user_data[username][`password`]) {
   for (let i in products){
      products[i].total_sold += Number(products[i].quantity_selected);
      products[i].quantityAvailable -= Number(products[i].quantity_selected);
   }
   //if validation passes, direct to invoice page; second half of this equation is from Assignment2 Code Examples 
   response.redirect('./invoice.html?' + params.toString());
}
});






// Registration


/* enable server to respond to requests for static files (files that are not intended to have any server-processing); files must be located in a directory called "public"; the following uses the Express static middleware component */
app.use(express.static(__dirname + '/public'));

// starts the server; outputs the port in console
app.listen(8080, () => console.log(`listening on port 8080`))
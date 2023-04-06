var express = require('express');
var app = express();
var querystring = require('querystring');

var session = require('express-session');

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


// stores product json data in server memory undet the variable name 'products' and maes it accessible through the root directory and the following json file path
var products = require(__dirname + '/product_data.json');


// when the server recieves a GET request for "/product_data.js", the server will respong in javascript with a string of data provided by the JSON file
app.get("/product_data.js", function (request, response, next) {
   response.type('.js');
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.use(express.urlencoded({ extended: true }));

// process purchase request (validate quantities, check quantity available)


// <** your code here ***>

// route to get to invoice page
app.post('/invoice.html', function (request, response) {
   console.log(request.body);

// loop throigh the products array
for (let i = 0; i < products.length; i++ ) {

//assign a variable to the value of the quantity textbox (whar the user entered for "quantity desired")
   var qty = request.body [`quantities${i}`];

// assign a variable to the name of each product -- to be used if there is an error; will alert user where the error occured
   var name = products[i].name

// assign a variable which calls the function "isNonNegInt"; this function checks if to see if the user has input a string, negtive number, or decimal
   let errors = isNonNegInt(qty, true);

// assign a variable to the quantity available for each product
   var qa = products[i].quantityAvailable

//check if quantities are valid via the NonNegInt function; call the function
// if valid, send to invoice page;

if (qty == 0) {
   continue;
}
   if (errors.length > 0) {
      response.send(
       `Hi, please fix the following errors: ${errors}. <div> Please press the "back" button and insert a valid quantity for ${name}.`
     );
      console.log(errors)
   }
   // if there is an error, send the user to a page that points out the specific error
   if (qty>qa) {
      response.send(`Hi, unfortunately House of Cards does not have enough of ${name} in stock at the moment. Please press the "back" button and insert a quantity that is less than or equal to the quantity avaiable. Thank you! `)
   }
   
      
    }
   response.redirect('./invoice.html?' + querystring.stringify(request.body));
   
   }
    
    );
 





/* enable server to respond to requests for static files (files that are not intended to have any server-processing); files must be located in a directory called "public"; the following uses the Express static middleware component */
app.use(express.static(__dirname + '/public')); 

// starts the server
app.listen(8080, () => console.log(`listening on port 8080`))


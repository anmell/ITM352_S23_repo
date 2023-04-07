var express = require('express');
var app = express();
var querystring = require('querystring');

var session = require('express-session');

// stores product json data in server memory undet the variable name 'products' and maes it accessible through the root directory and the following json file path
var products = require(__dirname + '/product_data.json');



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


app.get('/product_display', function(req, res) {
   // your code to handle the GET request for the product_display page goes here
 });

// <** your code here ***>

// process purchase request (validate quantities, check quantity available)
// when the server recieves a "POST" request, validate data. If valid: route to get to invoice page. If invalid: send error to client
app.post('/invoice.html', function (request, response) {
   console.log(request.body);

   // use a FLAG to check that at least one quanitty was selected,is q>0; use true and false statement, continue to the loop


   // alert box must be done on the client, send client back to the order page, make the html page check if there is an error, if so, display alert box 


   // loop through the products array
   for (let i = 0; i < products.length; i++) {


      //assign a variable to the value of the quantity textbox (whar the user entered for "quantity desired")
      var qty = request.body[`quantities${i}`];

      // assign a variable to the name of each product -- to be used if there is an error; will alert user where the error occured
      var name = products[i].name

      // assign a variable which calls the function "isNonNegInt"; this function checks if to see if the user has input a string, negtive number, or decimal
      let errors = isNonNegInt(qty, true);

      // assign a variable to the quantity available for each product
      var qa = products[i].quantityAvailable

      //assign a variable to collect all errors
      var errors_array="";

      qa -= qty;

      //if there's an empty textbox, let the loop continue
      if (qty == 0) {
         continue;
      }

      //check if quantities are valid via the NonNegInt function; call the function through it's associated variable (errors). If invalid, send an error message
      if (errors.length > 0) {
         /*response.send(
            `Hi, please fix the following errors for ${name}: ${errors}. <div> Please press the "back" button and insert a valid quantity for ${name}.`
         );*/
         errors_array += 'Invalid Quantity';
         response.redirect('./product_display?' + querystring.stringify({...request.body,errors_array:`${JSON.stringify(errors_array)};`}));

         //output the errors in console so that I can track them
         console.log(errors_array);
      }
      // if the user selects more quantities than are available, send the user to a page that points out the specific error
      if (qty > qa) {
         /*response.send(`Hi, unfortunately House of Cards does not have enough of ${name} in stock at the moment. Please press the "back" button and insert a quantity that is less than or equal to the quantity avaiable. Thank you! `)*/
         errors_array += 'too many selected';
         response.redirect('./product_display?' + querystring.stringify({...request.body, errors_array: `${JSON.stringify(errors_array)};`}));
         console.log(errors_array);
      }
   }

   // after running the loop through the entire 'products' array and validating the data, send the user to the invoice page 
   response.redirect('./invoice.html?' + querystring.stringify(request.body));
}
);

/* enable server to respond to requests for static files (files that are not intended to have any server-processing); files must be located in a directory called "public"; the following uses the Express static middleware component */
app.use(express.static(__dirname + '/public'));

// starts the server; outputs the port in console
app.listen(8080, () => console.log(`listening on port 8080`))


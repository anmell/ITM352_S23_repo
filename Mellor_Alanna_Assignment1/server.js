var express = require('express');
var app = express();
var querystring = require('querystring');

function isNonNegInt(quantities, returnErrors) {
   errors = []; // assume no errors at first
   if (Number(quantities) != quantities) errors.push('Not a number!'); // Check if string is a number value
   if (quantities < 0) errors.push('Negative value!'); // Check if it is non-negative
   if (parseInt(quantities) != quantities) errors.push('Not an integer!'); // Check that it is an integer

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
for (let i in products) {
   var qty = request.body [`quantities${i}`];
   let errors = isNonNegInt(qty, true);
   if (errors.length > 0) {
      response.type('.js');
      response.send(`Hi please fix the following errors: ${errors.join()}`);
      console.log(errors)
   }
   if (qty == 0 ){
      response.send (`please enter a quantity in any textbox`)
   }else{
      response.redirect('./invoice.html?' + querystring.stringify(request.body));
    }}});
// if there are invalid quantities are entered, send an alert to user
// else send user to invoice page 

   // Pass the quantities data to the invoice.html template



// the following allows access to the body when the server recieves a POST request 
 

//check if quantities are valid via the NonNegInt function; call the function
// if valid, send to invoice page;



/* enable server to respond to requests for static files (files that are not intended to have any server-processing); files must be located in a directory called "public"; the following uses the Express static middleware component */
app.use(express.static(__dirname + '/public')); 

// starts the server
app.listen(8080, () => console.log(`listening on port 8080`))


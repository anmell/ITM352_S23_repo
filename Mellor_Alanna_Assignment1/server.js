var express = require('express');
var app = express();
var querystring = require('querystring');

var products = require(__dirname + '/product_data.json'); // in current directory, get products.json and store it in memory in the server; loading json and displaying it in products


// Routing 

// allows server to share products data to any user that asks for it and allows server to control product data; server is database
app.get("/product_data.js", function (request, response, next) { // respond with js by giving var products = product data in memory and turns it into a json string and sends it back 
   response.type('.js'); // send response as javascript
   var products_str = `var products = ${JSON.stringify(products)};`; // string is executed and defines var products 
   response.send(products_str); // sends back string with all the javascript; respond.send has to send a string
});

app.use(express.urlencoded({ extended: true }));

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// process purchase request (validate quantities, check quantity available)

// ** Insert Code Here **

// Get quantities from products_display.html and create invoice if valid
app.post('/process_purchase', function (request, response, next) {
   console.log(request.body);

   // check if quantities are valid, if yes, send to invoice with query string of data
   
   // quantities are valid, send to invoice
   for(let i in products) {
      console.log(request.body[`quantity${i}`], FindStringisNonNegInt(request.body[`quantity${i}`]));
   }

   // quantities are valid, remove quantities purchased from quantities_available
   for(let i in products) {
      products[i].quantity_available -= request.body[`quantity${i}`];
   }

   response.redirect('./invoice.html?' + querystring.stringify(request.body));
     

});

// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));

// Loads products data from json file into server memory
var products_array = require(__dirname + '/product_data.json');


function FindStringisNonNegInt(q, returnErrors=false) {
   // Checks if a string q is a non negative integer; if returnErrors is true, the array of errors is returned
   // On the contrary, it will return true if q is a non negative integer
   errors = []; // assume no errors at first
   if(Number(q) != q) errors.push('Please enter a number!'); // Check if string is a number value
   if(q < 0) errors.push('Please enter a non-negative value!'); // Check if it is non-negative
   if(parseInt(q) != q) errors.push('This is not an integer!'); // Check that it is an integer

   return (returnErrors ? errors : (errors.length == 0));
};
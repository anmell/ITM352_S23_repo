var express = require('express');
var app = express();

// stores product json data in server memory undet the variable name 'products'
var products = require(__dirname + '/product_data.json');

// Routing 

// monitor all requests; this manages what is output in the console for all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// process purchase request (validate quantities, check quantity available)

// load product data into server; make it accessible via a GET request; when a client send a GET request
app.get ('./product_data.js'), function (response){

}


// <** your code here ***>

// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'))

// start server
app.listen(8080, () => console.log(`listening on port 8080`))


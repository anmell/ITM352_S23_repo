var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true })); // puts the data from a post reuest inside the request.body

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + ` with qs ` + JSON.stringify(request.query));
    next();
});


app.get('/test', function (request, response, next) {
    response.send('GET to test');
    next();
});

app.post ('/process_purchase', function (request, response) {
    console.log(request.body);

    response.send('POST to process_purchase');
});

// validate quantities 
var q = request.body['quantity_textbox'];
if (typeof q != 'undefined') {
response.send(`Thank you for purchasing ${q} things!`);
} 


app.use(express.static(__dirname + '/public'));
app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback

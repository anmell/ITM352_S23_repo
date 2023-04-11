// load file system (fs) interface
var fs = require ('fs');
var filename = __dirname + '/user_data.json';

// objectve: read the user_data file, get the contents
var user_data_object_JSON = fs.readFileSync(filename, 'utf-8');

// parse through user_data JSON, turn it into an object
var user_data= JSON.parse(user_data_object_JSON);

// get password for user kazman
var username = 'kazman';
console.log(`the password for user ${username} is ${user_data.kazman.password}`);


// load file system (fs) interface
var fs = require ('fs');
var filename = __dirname + '/user_data.json';
var user_data = require(filename);

// get password for user kazman
var username = 'kazman';
console.log(`the password for user ${username} is ${user_data.kazman.password}`);


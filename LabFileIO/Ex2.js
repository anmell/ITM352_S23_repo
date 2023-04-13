// load file system (fs) interface
var fs = require ('fs');
var filename = __dirname + '/user_data.json';

if (fs.existsSync(filename)){
    console.log (` the file has ${fs.statSync(filename).size} characters`);
    // objective: read the user_data file, get the contents
    var user_data_object_JSON = fs.readFileSync(filename, 'utf-8');
    
    
    // parse through user_data JSON, turn it into an object
    var user_data= JSON.parse(user_data_object_JSON);
    
    // parse through user_data JSON, turn it into an object
     var user_data= JSON.parse(user_data_object_JSON);

     username = 'kazman';
    console.log(`the password for kazman is ${user_data[username][`password`]}`);
    } else {
        console.log (`hey I cant find filename`)
    }
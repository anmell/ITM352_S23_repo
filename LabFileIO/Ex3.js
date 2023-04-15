var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });


app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    var username = request.body[`username`];
    var password = request.body[`password`];
    console.log(request.body)
    // check username is in user_data
    if (user_data.hasOwnProperty(username)) {

        //get user info, load all values into variable
        var user_info = user_data.username;

        // if password entered matches password saved, log them in 
        if (password == user_info.password) {
            response.send(`you are logged in`)
        }
    }else{
        response.send('username does not exist')
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));


// load file system (fs) interface
var fs = require ('fs');
var filename = __dirname + '/user_data.json';

if (fs.existsSync(filename)){
    console.log (` the file has ${fs.statSync(filename).size} characters`);
    // objective: read the user_data file, get the contents
    var user_data_object_JSON = fs.readFileSync(filename, 'utf-8');
    
    
    // parse through user_data JSON, turn it into an object
    var user_data= JSON.parse(user_data_object_JSON);
    

    console.log(`the password for kazman is ${user_data[username][`password`]}`);
    } else {
        console.log (`hey I cant find filename`)
    }
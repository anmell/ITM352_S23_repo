var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));
var session = require('express-session');// install sessions


//app.use passes this onto the entire document; very similar to an app.all
app.use(session({ secret: "MySecretKey", resave: true, saveUninitialized: true }));

// route for sessions
app.get("/use_session", function (request, response) {
    response.send(`Welcome, your session ID is ${request.sessionID}`)
});


//middleware that makes the data store in the cookie object easily accessible
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//route to set a cookie
app.get("/set_cookie", function (request, response) {
    var myname = "Alanna";
    response.cookie('users_name', myname);
    response.send(`${myname} cookie sent!`);
});

//route to use a cookie
app.get("/use_cookie", function (request, response) {
    //get name from the cookie
    console.log(request.cookies);

    var the_name = request.cookies[`users_name`];

    response.send(`Welcome to the use Cookie page ${the_name}`)
});



//when the user submits the log in form
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    var username = request.body["username"];
    var password = request.body["password"];
    // check if username is in user_data
    if(user_data.hasOwnProperty(username)) {
        // get users info
        var user_info = user_data[username];
        // check is password entered is the password saved
        if(password == user_info.password) {
            var loginDate = (new Date()).toString(); 
            
            // add lastLogin to session
            request.session['lastLogin'] = loginDate;

            //send the cookie back to the browser with client's username stored in browser memory
            response.cookie(`username`, username);
            response.send(`${username} logged in on ${loginDate}`);
           
            console.log(request.session);
        } else {
            response.send(`invalid password`);
        }

    } else {
        response.send(`${username} does not exist`);
    }
});

app.get("/login", function (request, response) {
    // Give a simple login form
    // check is last login is in user's session
    var lastTimeLogIn = 'First Login!';
    if (typeof request.session["lastLogin"] != 'undefined') {
        lastTimeLogIn = request.session["lastLogin"];
    }

    var username_welcome = 'Please log in';

    //check if you have the username stored in cookie (i.e. )
    if (request.cookies.hasOwnProperty[`username`]){
        // if you have it, go and get it and redefine the variable
         username_welcome = `Welcome ${request.cookies[`username`]}`
    }

    console.log (request.cookies);
    // generate login page
    str = `
<body>
<br> 
${username_welcome}
<br>
You last logged in on ${lastTimeLogIn}
<br>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});


app.listen(8080, () => console.log(`listening on port 8080`));


// load file system (fs) interface
var fs = require('fs');
var filename = __dirname + '/user_data.json';

if (fs.existsSync(filename)) {
    console.log(` the file has ${fs.statSync(filename).size} characters`);
    // objective: read the user_data file, get the contents
    var user_data_object_JSON = fs.readFileSync(filename, 'utf-8');


    // parse through user_data JSON, turn it into an object
    var user_data = JSON.parse(user_data_object_JSON);
}
var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));
var session = require('express-session');// install sessions


//app.use passes this onto the entire document; very similar to an app.all
app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true}));

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


app.get("/login", function (request, response) {
    // Give a simple login form
    // check is last login is in user's session
    var lastTimeLogIn = 'First Login!'
    if (typeof request.session["lastLogin"] != 'undefined'){
        lastTimeLogIn = request.session["lastLogin"];
    }
    str = `
<body>
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


 //when the user submits the log in form
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
            var loginDate = (new Date()).toString
            response.send(`Logged in on ${loginDate}`)

            // add lastLogin to sessions
            request.session['lastLogin'] = loginDate;
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
}
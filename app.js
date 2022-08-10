var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const models = require("./src/model");
const fileUpload = require("express-fileupload");
dotenv.config();
var db = require("./src/config/db");

var AdminAppApi = require("./src/adminApi");
var passport = require("passport");
require("./global_functions"); //instantiate global functions
require("./src/config/appConfig"); //instantiate configuration variables

var bcrypt = require("bcrypt-nodejs");

// The code below allows the node js to find the public directory with the index.html file
const publicPath = path.join(__dirname, "./public");
// Node js is using port 3000/ and when you push to cloud it will use process.env.PORT
const port = process.env.PORT || 3000;

// Bodyparser for using `json data
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(fileUpload()); // Don't forget this line!
app.use(express.static(publicPath));
app.use(cors());

app.use(passport.initialize());
require("./src/middleware/passport")(passport);

// Initialize Firebase
//initializeFirebase();
/* GET index page */
models.sequelize
  .authenticate()
  .then(() => {
    console.log("> successfully opened the database");
  })
  .catch((err) => {
    console.log("> error occurred from the database");
    console.log(err);
    //console.error(SERVER_CONNECTION_FAILURE_MESSAGE, err);
  });

models.sequelize
  .sync()
  .then(function () {
    console.log("Database Connected successfully");
    //console.log(DATABASE_CONNECTION_MESSAGE)
  })
  .catch(function (err) {
    console.log("> error occurred from the database");
    console.log(err);
    //console.log(err, DATABASE_CONNECTION_FAILURE_MESSAGE)
  });
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,User-Agent,Authorization,DNT,X-Mx-ReqToken,Keep-Alive, Origin, Accept, X-Requested-With,If-Modified-Since,Cache-Control, content-type, Authorization, Content-Type, No-Auth, Access-Control-Request-Method, Access-Control-Request-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin"
  );
  // Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content Type,Orgin
  // response.setHeader("Access-Control-Allow-Headers",
  // "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});
/* GET index page */
// app.get('/', function(req, res, next) {
//     // res.send('Hello!');
//     return res.json(new BaseResponse().createSuccessResponse(SUCCESS_CODE, "", "SERVER STARTED SUCCESSFULLY"));
// });
app.get("/", function (req, res, next) {
  res.send("Hello nodemon!");
});

app.use("/admin/api", AdminAppApi.router);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
// app.listen(port, () => {
//     console.log(`Server is up on ${port}`);

// });

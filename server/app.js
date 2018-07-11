const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require('nunjucks');
const path = require("path");
const app = express();
const db = require("./models").db;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', { noCache: true });
require('../filters')(env);

//plug-in that basically tells nunjucks it’s OK to render the html in a string 
//there’s a built-in nunjucks filter that indicates this as well, but this is another option, giving you a tag so you can indicate a bunch of stuff that’s safe to render
var AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

// logging and body-parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.get('/', function (req, res) {
  res.render('index');
});

// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});

// listen on a port
const port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});

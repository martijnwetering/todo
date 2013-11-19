/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    path = require('path'),
    pass = require('./config/pass.js'),
    userCtrl = require('./app/controllers/userCtrl.js');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

//Bootstrap db connection
var db = mongoose.connect(config.db, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + config.db + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db);
  }
});

//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

var app = express();
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//Bootstrap routes
require('./config/routes')(app);

// set up our security to be enforced on all requests to secure paths
app.all('/secure', pass.ensureAuthenticated);
//app.all('/secure/admin', pass.ensureAdmin);

// Basic pages
//app.get('/', basic_routes.index);

// Login pages
app.get('/dmz/login', userCtrl.getlogin);
app.post('/dmz/login', userCtrl.postlogin);
app.get('/dmz/logout', userCtrl.logout);

// Signup pages
app.post('/dmz/signup', userCtrl.signup);

// secure pages
app.get('/secure/account', userCtrl.account);

//admin pages
//app.get('/secure/admin', user_routes.admin);

//Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express Basic Authentication app started on port ' + port);



var express =           require('express')
    , fs =              require('fs')
    , passport =        require('passport')
    , mongoose =        require('mongoose')
    , path =            require('path')
    , pass =            require('./server/config/pass.js')
    , userCtrl =        require('./server/app/controllers/userCtrl.js')
    , todoCtrl =        require('./server/app/controllers/todoCtrl.js');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];

//Bootstrap db connection
var db = mongoose.connect(config.db, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + config.db + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db);
  }
});

//Bootstrap models
var models_path = __dirname + '/server/app/models';
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
app.set('views', __dirname + '/server/app/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/api/v1/login', userCtrl.postlogin);
app.post('/api/v1/signup', userCtrl.signup);
app.post('/api/v1/todolist', todoCtrl.newTodo);
app.get('/api/v1/todolist', todoCtrl.listTodo);
app.delete('/api/v1/todolist/:id', todoCtrl.deleteTodo);
app.post('/api/logout', userCtrl.logout);
app.post('/api/v1/check/:name', userCtrl.checkIfUsernameIsUnique);
app.get('/*', function(req, res) {
    var username = '';
    var email = '';

    if (req.user) {
        username = req.user.username,
        email = req.user.email
    }

    res.cookie('user', JSON.stringify({
        'username': username,
        'email': email
    }));

    res.render('index-ang');
}); 

//Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express Basic Authentication app started on port ' + port);



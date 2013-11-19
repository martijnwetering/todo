var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , db = require('../models/user.js')
  , mongoose = require('mongoose')
  , userModel = mongoose.model('User');

exports.account = function(req, res) {
  res.render('account', { user: req.user });
  //res.redirect('/secure/account');
};

exports.getlogin = function(req, res) {
  res.render('login', { user: req.user, message: req.session.messages });
};

exports.admin = function(req, res) {
  res.send('access granted admin!');
};
 
exports.signup = function (req, res) {
    var body = req.body;
    db.createUser(
        body.username,
        body.email,
        body.password,
        body.password2,
        false,
        function (err, user) {
            if (err) return console.log(err);
              //res.render('signup', {user: req.user, message: err.code === 11000 ? "User already exists" : err.message});
            req.login(user, function (err) {
                if (err) return next(err);
                // successful login
                res.redirect('/secure/account');
            })
        })
}


// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
//   
/***** This version has a problem with flash messages
app.post('/dmz/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });
*/
  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
exports.postlogin = function(req, res, next) {
  console.log('postLogin function accessed');
  console.log(req.body);
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      console.log('No user');
      return res.redirect('/#/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/secure/account');
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
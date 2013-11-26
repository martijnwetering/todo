var passport =          require('passport')
    , LocalStrategy =   require('passport-local').Strategy
    , db =              require('../models/user.js')
    , mongoose =        require('mongoose')
    , userModel =       mongoose.model('User');

 
exports.signup = function (req, res) {
    var body = req.body;
    db.createUser(body.username, body.email, body.password, body.password2, false,
        function (err, user) {
            if (err) {
              return res.json(401, {user: req.user, message: err.code === 11000 ? "User already exists" : err.message});
            }
            req.login(user, function (err) {
                if (err) return next(err);
                // successful login
                res.json(200, {user: user});
            })
        })
};

exports.logout = function (req, res) {
  req.logout();
  res.send(200);
}

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
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
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json(403, {message: info.message});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({user: user});
    });
  })(req, res, next);
};


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
            });
        });
};

exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};


exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, {message: info.message});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({user: user});
    });
  })(req, res, next);
};


exports.checkUnique = function(req, res) {
    var name = req.body.username;
    var user = {username: name};

    userModel
        .find(user)
        .exec(function(err, data) {
        if (data.length < 1) {
            res.json({isUnique: true})
        } if (data.length > 0) {
            res.json({isUnique: false})
        }
    });
}

























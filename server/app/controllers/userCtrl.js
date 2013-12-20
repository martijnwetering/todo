var passport =          require('passport')
    , zxcvbn =          require('zxcvbn2')
    , mongoose =        require('mongoose')
    , db =              require('../models/user.js')
    , User =            mongoose.model('User');


exports.signup = function (req, res) {
    var body = req.body;
    createUser(body, function (err, user) {
        if (err) {
            return res.json(401, {user: req.user, message: err.code === 11000 ? "User already exists" : err.message});
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            // successful sign up
            res.json(200, {user: user});
        });
    });
}

var createUser = function (body, callback) {
    var username = body.username,
        password1 = body.password,
        password2 = body.password2,
        emailaddress = body.email,
        adm = false,
        result = zxcvbn(password1),
        MIN_PASSWORD_SCORE = 2;

    if (password1 !== password2) {
        return callback(new Error("Passwords must match"));
    }
    if (result.score < MIN_PASSWORD_SCORE) {
        return callback(new Error("Password is too simple"));
    }

    var user = new User({ username: username
        , email: emailaddress
        , password: password1
        , admin: adm
    });

    user.save(function(err) {
        if(err) {
            callback(err);
        } else {
            callback(null, user);
        }
    });
};

exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};


exports.postlogin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, {message: info.message});
    }
    req.logIn(user, function(err) {
      if (err) {
          return next(err);
      }
      return res.json({user: user});
    });
  })(req, res, next);
};

exports.checkIfUsernameIsUnique = function(req, res) {

    var name = req.body.username;
    var user = {username: name};

    User
        .find(user)
        .exec(function(err, data) {
        if (data.length < 1) {
            res.json({isUnique: true})
        } if (data.length > 0) {
            res.json({isUnique: false})
        }
    });
}

























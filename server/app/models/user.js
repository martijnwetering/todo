var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	zxcvbn = require("zxcvbn"),
	passport = require('passport');
	SALT_WORK_FACTOR = 10,
	exports.mongoose = mongoose;


//******* Database schema TODO add more validation
var Schema = mongoose.Schema;

// User schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  admin: { type: Boolean, required: true }
});


const MIN_PASSWORD_SCORE = 2;
 
// snip
 
// Helper function to create a new user
exports.createUser = function(username, emailaddress, password1, password2, adm, done) {
    // convert adm string to bool
 
    if (password1 !== password2) return done(new Error("Passwords must match"));
 
    var result = zxcvbn(password1);
    if (result.score < MIN_PASSWORD_SCORE) return done(new Error("Password is too simple"));
    var user = new userModel({ username: username
        , email: emailaddress
        , password: password1
        , admin: adm 
      });
 
    user.save(function(err) {
        if(err) {
            done(err);
        } else {
        	console.log('User saved');
            done(null, user);
        }
    });
 
};


// Bcrypt middleware
userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

// Export user model
var modelName = "User";
var collectionName = "Users"; 

var userModel = mongoose.model(modelName, userSchema, collectionName);
exports.userModel = userModel;

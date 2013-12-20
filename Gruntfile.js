var mongoose =          require('mongoose')
    , db =              require('./server/app/models/user.js')
    , User =            mongoose.model('User')
    , config =          require('./server/config/config')['development'];

var database = mongoose.connect(config.db, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + config.db + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db);
  }
});

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'client/javascript/*.js', 'server/**/*.js'],
      options: {
        laxcomma: true,
        globals: {
            jQuery: true,
            console: true,
            module: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.registerTask('adduser', 'add a user to the database', function(username, emailaddress, password) {

      var done = this.async();

      var user = new User({username: username,
        email: emailaddress,
        password: password,
        admin: false
      });

      user.save(function (err) {
          if (err) {
              console.log('Error: ' + err);
              done(err);
          } else {
              console.log('Saved user: ' + user.username);
              done();
          }
      });
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('dbseed', 'seed the database', function() {
      grunt.task.run('adduser:John:john@mail.com:correcthorsebatterystaple');
      grunt.task.run('adduser:Jil:jil@mail.com:correcthorsebatterystaple');
    });

};
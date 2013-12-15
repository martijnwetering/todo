var mongoose =      require('mongoose'),
    db =            require('./server/app/models/user.js'),
    User =          mongoose.model('User'),
    config =        require('./server/config/config')['development'];

//Bootstrap db connection
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
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
      // more options here if you want to override JSHint defaults
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

  grunt.registerTask('adduser', 'add a user to the database', function(username, emailaddress, password, password2) {

      var done = this.async();

      db.createUser(username, emailaddress, password, password2, false,
          function (err, user) {
              if (err) {
                  console.log('Error: ' + err);
                  done(false);
              } else {
                  console.log('saved user: ' + user.username);
                  done();
              }

          });
      });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('dbseed', 'seed the database', function() {
      grunt.task.run('adduser:John:john@mail.com:correcthorsebatterystaple:correcthorsebatterystaple');
      grunt.task.run('adduser:Jil:jil@example.com:correcthorsebatterystaple:correcthorsebatterystaple');
    });

};
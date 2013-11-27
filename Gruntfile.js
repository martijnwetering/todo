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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
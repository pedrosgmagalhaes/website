module.exports = function(grunt) {
    grunt.initConfig({
      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: './images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/images/'
          }]
        }
      },
      svgmin: {
        options: {
          plugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false }
          ]
        },
        dist: {
          files: [{
            expand: true,
            cwd: './images/',
            src: ['*.svg'],
            dest: 'dist/images/'
          }]
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
  
    grunt.registerTask('default', ['imagemin','svgmin']);
  
  };

module.exports = function(grunt) {
  grunt.initConfig({
    assemble: {
      options: {
        flatten: true,
        assets: './build/assets',
        plugins: ['permalinks'],
        partials: './src/partials/*.hbs',
        layoutdir: './src/layouts',
        layout: ['default.hbs'],
        data: ['./src/data/*.{json,yml}']
      },
      site: {
        src: ['./src/pages/*.{hbs,md}'],
        dest: './build/',
      }
    },
    less: {
      main: {
        src: ['./src/assets/css/*.{css,less}'],
        dest: './build/assets/css/main.css'
      }
    },
    copy: {
      assets: {
        files: [
          {expand: true, cwd: './src/assets/', src: './img/**.*', dest: './build/assets/'}
        ]
      }
    },
    watch: {
      assemble: {
        files: './src/{data,layouts,pages,partials}/**/*',
        tasks: ['assemble'],
        options: {
          reload: true,
          atBegin: true,
          interrupt: true
        }
      },
      assets: {
        files: './src/assets/img/*.*',
        tasks: ['copy'],
        options: {
          reload: true,
          atBegin: true,
          interrupt: true
        }
      },
      less: {
        files: './src/assets/css/*.{less,css}',
        tasks: ['less'],
        options: {
          reload: true,
          atBegin: true,
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
};

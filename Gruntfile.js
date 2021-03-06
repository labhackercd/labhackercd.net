module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    assemble: {
      options: {
        flatten: true,
        assets: './build/assets',
        plugins: ['assemble-feed-download'],
        partials: './src/partials/*.hbs',
        layoutdir: './src/layouts',
        layout: ['default.hbs'],
        data: ['./src/data/*.{json,yml}', './src/feeds/*.{json,yml}'],
      },
      site: {
        src: ['./src/pages/*.{hbs,md}'],
        dest: './build/'
      }
    },
    sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: './src/assets/css/',
            src: ['*.scss'],
            dest: './build/assets/css/',
            ext: '.css'
          },
          {
            expand: true,
            cwd: './bower_components/font-awesome/scss/',
            src: ['font-awesome.scss'],
            dest: './build/assets/css/',
            ext: '.css'
          }
        ]
      }
    },
    copy: {
      images: {
        files: [{
          expand: true,
          cwd: './src/assets/',
          src: './img/**',
          dest: './build/assets/'
        }]
      },
      files: {
        files: [{
          expand: true,
          cwd: './src/assets/',
          src: './files/**',
          dest: './build/assets/'
        }]
      },
      'bootstrap-js': {
        files: [{
          expand: true,
          cwd: './bower_components/bootstrap-sass-official/assets/javascripts/',
          src: 'bootstrap.js',
          dest: './build/assets/js/'
        }, {
          expand: true,
          cwd: './bower_components/jquery/dist/',
          src: 'jquery.js',
          dest: './build/assets/js/'
        }]
      },
      'font-awesome': {
        files: [{
          expand: true,
          cwd: './bower_components/font-awesome/fonts/',
          src: '**.*',
          dest: './build/assets/fonts/'
        }]
      },
      'fontastic-labhacker': {
        files: [{
          expand: true,
          cwd: './bower_components/fontastic-labhacker/fonts/',
          src: '**.*',
          dest: './build/assets/fonts/'
        }]
      },
    },
    replace: {
      fontastic_copy_and_replace_urls: {
        src: ['./bower_components/fontastic-labhacker/styles.css'],
        dest: './build/assets/css/fontastic-labhacker.css',
        replacements: [{
          from: 'url("fonts',
          to: 'url("../fonts'
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 8003,
          useAvaiablePort: true,
          //livereload: true,
          hostname: '*',
          base: './build'
        }
      }
    },
    watch: {
      assemble: {
        files: './src/{data,layouts,pages,partials}/**/*',
        tasks: ['assemble'],
        options: {
          reload: true,
          livereload: true,
          interrupt: true
        }
      },
      images: {
        files: './src/assets/img/**',
        tasks: ['copy'],
        options: {
          reload: true,
          livereload: true,
          interrupt: true
        }
      },
      sass: {
        files: './src/assets/css/*.{scss,css}',
        tasks: ['sass'],
        options: {
          reload: true,
          livereload: true,
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('build', [
    'assemble',
    'sass',
    'copy',
    'replace',
  ]);

  grunt.registerTask('serve', [
    'build',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('default', ['build'])
};

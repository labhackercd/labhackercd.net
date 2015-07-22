var moment = require('moment');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pc: grunt.file.readJSON("config.json"),

    assemble: {
      options: {
        flatten: true,
        assets: './build/assets',
        plugins: ['assemble-feed-download'],
        partials: './src/partials/*.hbs',
        layoutdir: './src/layouts',
        layout: ['default.hbs'],
        data: ['./src/data/*.{json,yml}', './src/feeds/*.{json,yml}'],
        feeds: [
          {url: 'http://blog.labhackercd.net/?feed=rss2', dest: './src/feeds/blog.json'}
        ]
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
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
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
    },

    shell: {
      upcoming_events: {
        command: function() {
          // Function because strings won't work properly. Don't ask me why.
          return [
            '<%= pc.calendar.extractor %>',
            '--service "<%= pc.calendar.endpoint %>"',
            '--username "<%= pc.calendar.username %>"',
            '--password "<%= pc.calendar.password %>"',
            '--start ' + moment().format('YYYY-MM-DD'),
            '--end ' + moment().add(grunt.config.get('pc.calendar.radius', 30), 'days').format('YYYY-MM-DD'),
            '--output ./src/feeds/upcoming_events.json'].join(' ');
        }
      },
      recent_events: {
        command: function() {
          // Function because strings won't work properly. Don't ask me why.
          return [
            '<%= pc.calendar.extractor %>',
            '--service "<%= pc.calendar.endpoint %>"',
            '--username "<%= pc.calendar.username %>"',
            '--password "<%= pc.calendar.password %>"',
            '--start ' + moment().subtract(grunt.config.get('pc.calendar.radius', 30), 'days').format('YYYY-MM-DD'),
            '--end ' + moment().format('YYYY-MM-DD'),
            '--output ./src/feeds/recent_events.json'].join(' ');
        }
      }
    }
  });


  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build', [
    'shell:upcoming_events',
    'shell:recent_events',
    'assemble',
    'sass',
    'copy'
  ]);

  grunt.registerTask('serve', [
    'build',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('default', ['build'])
};

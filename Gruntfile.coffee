#global module:false

contribs = ['stylus', 'watch', 'jst', 'connect']

module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig

    # Metadata.
    pkg: grunt.file.readJSON('package.json')
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today(\'yyyy-mm-dd\') %>\n' + '<%= pkg.homepage ? \'* \' + pkg.homepage + \'\\n\' : \'\' %>' + '* Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, \'type\').join(\', \') %> */\n'

    # Task configuration.
    concat:
      options:
        banner: '<%= banner %>'
        stripBanners: true

      dist:
        src: ['lib/<%= pkg.name %>.js']
        dest: 'dist/<%= pkg.name %>.js'

    uglify:
      options:
        banner: '<%= banner %>'

      dist:
        src: '<%= concat.dist.dest %>'
        dest: 'dist/<%= pkg.name %>.min.js'

    jshint:
      options:
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        undef: true
        unused: true
        boss: true
        eqnull: true
        browser: true
        globals:
          jQuery: true

      gruntfile:
        src: 'Gruntfile.js'

      lib_test:
        src: ['lib/**/*.js', 'test/**/*.js']

    qunit:
      files: ['test/**/*.html']

    jst:
      options:
        processName: (name) ->
          name.replace /templates\/|\.html/g, ''

      compile:
        files:
          'site/jst.js': ['templates/**/*.html']

    stylus:
      compile:
        files:
          'site/css/style.css': 'stylus/style.styl'

    watch:
      scripts:
        files: ['stylus/*.styl', 'templates/**/*.html', 'html/**/*.html']
        tasks: ['default']

    connect:
      server:
        options:
          port: 9000
          base: 'site'
          keepalive: true

    includes:
      files:
        src: ['*.html', 'upload/*.html']
        dest: 'site'
        flatten: false
        cwd: 'html'
        options:
          silent: true

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks "grunt-contrib-#{contrib}" for contrib in contribs
  grunt.loadNpmTasks 'grunt-includes'

  # Default task.
  grunt.registerTask 'default', ['jst', 'stylus', 'includes']

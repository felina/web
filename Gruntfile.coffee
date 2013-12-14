#global module:false
module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig

    # Metadata.
    pkg: grunt.file.readJSON("package.json")
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " + "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + "<%= pkg.homepage ? \"* \" + pkg.homepage + \"\\n\" : \"\" %>" + "* Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>;" + " Licensed <%= _.pluck(pkg.licenses, \"type\").join(\", \") %> */\n"

    # Task configuration.
    concat:
      options:
        banner: "<%= banner %>"
        stripBanners: true

      dist:
        src: ["lib/<%= pkg.name %>.js"]
        dest: "dist/<%= pkg.name %>.js"

    uglify:
      options:
        banner: "<%= banner %>"

      dist:
        src: "<%= concat.dist.dest %>"
        dest: "dist/<%= pkg.name %>.min.js"

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
        src: "Gruntfile.js"

      lib_test:
        src: ["lib/**/*.js", "test/**/*.js"]

    qunit:
      files: ["test/**/*.html"]

    jst:
      options:
        processName: (name) ->
          name.replace /templates\/|\.html/g, ""

      compile:

        # options: {
        #   templateSettings: {
        #     interpolate : /\{\{(.+?)\}\}/g
        #   },
        # },
        files:
          "jst.js": ["templates/*.html"]

    stylus:
      compile:
        files:
          "css/style.css": "stylus/style.styl"

    watch:
      scripts:
        files: ["stylus/*.styl", "templates/*.html"]
        tasks: ["default"]

    connect:
      server:
        options:
          port: 9000
          base: '.'
          keepalive: true

  # These plugins provide necessary tasks.
  # grunt.loadNpmTasks('grunt-contrib-concat');
  # grunt.loadNpmTasks('grunt-contrib-uglify');
  # grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-jst"
  grunt.loadNpmTasks "grunt-contrib-connect"

  # Default task.
  grunt.registerTask "default", ["jst", "stylus"]

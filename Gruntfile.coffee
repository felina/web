#global module:false

contribs = ['stylus', 'watch', 'jst', 'connect', 'copy']

# Library paths
jquery = 'vendor/jquery/jquery.js'
underscore = 'vendor/underscore/underscore.js'
bootstrap = 'vendor/bootstrap/dist/js/bootstrap.js'
blueimp = 'vendor/blueimp-gallery/js/jquery.blueimp-gallery.min.js'
bbs = 'vendor/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min.js'
d3 = 'vendor/d3/d3.min.js'
dropzone = 'vendor/dropzone/downloads/dropzone.js'
penguinator = 'vendor/penguinator/index.js'
jqui = 'vendor/jquery-ui/ui/jquery-ui.js'

# Module paths
jst_ = 'jst.js'
common = 'js/common.js'
main = 'js/main.js'
start_job = 'js/start_job.js'
bar_chart = 'js/bar_chart.js'
dashboard = 'js/dashboard.js'
image_upload = 'js/image_upload.js'

# Files used by every page
shared = [jquery, underscore, bootstrap, common]

# Mapping of HTML files to the scripts they require
dependencies =
  'site/index.html': [main]
  'site/start-job.html': [blueimp, bbs, start_job]
  'site/define-form.html': []
  'site/dashboard.html': [d3, bar_chart, dashboard]
  'site/upload/image.html': [jqui, dropzone, penguinator, blueimp, bbs, image_upload]
  'site/upload/executable.html': [dropzone]

for k, v of dependencies
  dependencies[k] = shared.concat(v)

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
        files: ['stylus/*.styl', 'js/*.js', 'data/*', 'templates/**/*.html', 'html/**/*.html']
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

    copy:
      default:
        cwd: '.'
        src: ['js/*', 'data/*']
        dest: 'site/'

    'sails-linker':
      default:
        options:
          appRoot: 'site/'
          fileTmpl: '<script src="/%s"></script>'
          relative: true
        files: dependencies

  grunt.loadNpmTasks "grunt-contrib-#{contrib}" for contrib in contribs
  grunt.loadNpmTasks 'grunt-includes'
  grunt.loadNpmTasks 'grunt-sails-linker'

  grunt.registerTask 'default', ['jst', 'stylus', 'includes', 'copy', 'sails-linker']

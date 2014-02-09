#global module:false

# Official Grunt tasks to load
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
gmaps = 'vendor/gmaps/gmaps.js'

# Module paths
jst_ = 'jst.js'
common = 'js/common.js'
main = 'js/main.js'
start_job = 'js/start_job.js'
bar_chart = 'js/bar_chart.js'
dashboard = 'js/dashboard.js'
image_upload = 'js/image_upload.js'
executable_upload = 'js/executable_upload.js'
define_form = 'js/define_form.js'
settings = 'js/settings.js'
graphs = 'js/graphs.js'
user_profile = 'js/user_profile.js'

# Files used by every page
shared = [jquery, underscore, bootstrap, common]

# Mapping of HTML files to the scripts they require
dependencies =
  'site/index.html': [main]
  'site/start-job.html': [blueimp, bbs, start_job]
  'site/define-form.html': [define_form]
  'site/view-jobs.html': [dashboard]
  'site/upload/image.html': [dropzone, penguinator, blueimp, bbs, gmaps, image_upload]
  'site/upload/executable.html': [dropzone, executable_upload]
  'site/settings.html': [settings]
  'site/graphs.html': [d3, bar_chart, graphs]
  'site/user-profile.html': [user_profile]

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
        expand: true
        cwd: 'stylus'
        src: ['*.styl']
        dest: 'site/css/'
        ext: '.css'

    watch:
      scripts:
        files: [ 'js/*.js', 'data/*']
        tasks: ['copy']
      styles:
        files: 'stylus/*.styl'
        tasks: ['stylus']
      templates:
        files: 'templates/**/*.html'
        tasks: ['jst']
      html:
        files: 'html/**/*.html'
        tasks: ['bake', 'sails-linker']

    connect:
      server:
        options:
          port: 9000
          base: 'site'
          keepalive: true

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

    bake:
      build:
        files:
          'site/index.html': 'html/index.html'
          'site/view-jobs.html': 'html/view-jobs.html'
          'site/start-job.html': 'html/start-job.html'
          'site/define-form.html': 'html/define-form.html'
          'site/upload/image.html': 'html/upload/image.html'
          'site/upload/executable.html': 'html/upload/executable.html'
          'site/settings.html': 'html/settings.html'
          'site/graphs.html': 'html/graphs.html'
          'site/user-profile.html': 'html/user-profile.html'

  grunt.loadNpmTasks "grunt-contrib-#{contrib}" for contrib in contribs
  grunt.loadNpmTasks 'grunt-bake'
  grunt.loadNpmTasks 'grunt-sails-linker'

  grunt.registerTask 'default', ['jst', 'stylus', 'bake', 'copy', 'sails-linker']

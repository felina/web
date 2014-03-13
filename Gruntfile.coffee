# Official Grunt tasks to load
# contribs = ['stylus', 'watch', 'jst', 'connect', 'copy', 'jshint', 'uglify', 'concat']
contribs = ['stylus', 'watch', 'jst', 'connect', 'copy', 'uglify', 'concat']

vendor = 'vendor/'
js = '.js'

# Library paths
libs =
  jquery: 'jquery/dist/jquery'
  underscore: 'underscore/underscore'
  bootstrap: 'bootstrap/dist/js/bootstrap'
  blueimp: 'blueimp-gallery/js/jquery.blueimp-gallery.min'
  bbs: 'blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min'
  d3: 'd3/d3.min'
  dropzone: 'dropzone/downloads/dropzone'
  penguinator: 'penguinator/index'
  gmaps: 'gmaps/gmaps'
  modernizr: 'webshim/js-webshim/minified/extras/modernizr-custom'
  webshims: 'webshim/js-webshim/minified/polyfiller'
  alert: 'alert/alert'
  atlas: 'jquery-atlas/src/main'
  tab: 'bootstrap/js/tab'
  #gammagallery
  gamma: 'gammagallery/js/gamma'
  history: 'gammagallery/js/jquery.history'
  masonry: 'gammagallery/js/jquery.masonry.min'
  ppcustom: 'gammagallery/js/jquerypp.custom'
  js_url: 'gammagallery/js/js-url.min'
  modernizr_custom: 'gammagallery/js/modernizr.custom.70736'

for k, v of libs
  libs[k] = vendor + v + js

# Module paths
# Compiled templates file
jst_ = 'jst.js'

# Shared files
common = 'js/shared/common.js'
bar_chart = 'js/shared/bar_chart.js'

# Page-specific files
main = 'js/main.js'
start_job = 'js/start_job.js'
dashboard = 'js/dashboard.js'
image_upload = 'js/image_upload.js'
executable_upload = 'js/executable_upload.js'
define_form = 'js/define_form.js'
settings = 'js/settings.js'
graphs = 'js/graphs.js'

# Required for user profile
user_profile = 'js/user_profile/user_profile.js'
user_gallery = 'js/user_gallery.js'
about_tab = 'js/user_profile/tabs/about_tab.js'
badges_tab = 'js/user_profile/tabs/badges_tab.js'
friends_tab = 'js/user_profile/tabs/friends_tab.js'
user_badges = 'js/user_profile/badges/user_badges.js'
user_photos = 'js/user_profile/photos/user_photos.js'
newsfeed = 'js/user_profile/newsfeed/newsfeed.js'
navbar = 'js/user_profile/navbar/navbar.js'
about = 'js/user_profile/About/user_about.js'
loadimages = 'js/user_profile/photos/loadimages.js'

# Files used by every page
shared = [
  libs.jquery
  libs.alert
  libs.modernizr
  libs.webshims
  libs.underscore
  libs.bootstrap
  common #causing the image gallery to screw up
 ]

# Mapping of HTML files to the scripts they require
dependencies =
  'site/index.html': [main]
  'site/start-job.html': [libs.blueimp, libs.bbs, start_job]
  'site/define-form.html': [define_form]
  'site/view-jobs.html': [dashboard]
  'site/upload/image.html': [libs.dropzone, libs.penguinator, libs.blueimp, libs.bbs, libs.gmaps, libs.atlas, image_upload]
  'site/upload/executable.html': [libs.dropzone, executable_upload]
  'site/settings.html': [settings]
  'site/graphs.html': [libs.d3, bar_chart, graphs]
  'site/user-profile.html': [user_profile, about_tab, badges_tab, friends_tab, user_badges, user_photos,
                            newsfeed, navbar, about]
  'site/user-profile-gallery.html': [libs.gamma, libs.history, libs.masonry, libs.ppcustom, 
                                      libs.js_url, libs.modernizr_custom, loadimages]

# Add the shared dependencies to every page
for k, v of dependencies
  dependencies[k] = shared.concat(v)


js_src = 'js/**/*.js'

# Mapping of source HTML pages to their output paths in the site directory
bake_map = {}
for k, v of dependencies
  bake_map[k] = k.replace('site', 'html')

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today(\'yyyy-mm-dd\') %>\n' + '<%= pkg.homepage ? \'* \' + pkg.homepage + \'\\n\' : \'\' %>' + '* Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, \'type\').join(\', \') %> */\n'

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

#    jshint:
#      options:
#        curly: true
#        eqeqeq: true
#        immed: true
#        latedef: true
#        newcap: true
#        noarg: true
#        sub: true
#        undef: true
#        unused: true
#        boss: true
#        eqnull: true
#        browser: true
#        globals:
#          jQuery: true
#          $: true
#          JST: true
#          fl: true
#          d3: true
#          Dropzone: true
#          GMaps: true
#          webshims: true
#          alert: true
#          console: true

      lib_test:
        src: js_src

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
      # Lint all JS files and copy them to the site directory
      scripts:
        files: [js_src, 'data/*']
        # tasks: ['jshint', 'copy']
        tasks: ['copy']
      # Compile Stylus files to CSS when they change
      styles:
        files: 'stylus/*.styl'
        tasks: ['stylus']
      # Render HTML/Underscore templates to a JST object when they change
      templates:
        files: 'templates/**/*.html'
        tasks: ['jst']
      # Run static imports/preprocessing on the main HTML pages when they change
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
        src: [js_src, 'data/**/*']
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
        files: bake_map

    jsdoc:
      dist:
        src: [js_src]
        options:
          destination: 'doc'

  grunt.loadNpmTasks "grunt-contrib-#{contrib}" for contrib in contribs
  grunt.loadNpmTasks 'grunt-bake'
  grunt.loadNpmTasks 'grunt-jsdoc'
  grunt.loadNpmTasks 'grunt-sails-linker'

  # grunt.registerTask 'default', ['jshint', 'jst', 'stylus', 'bake', 'copy', 'sails-linker']
  # grunt.registerTask 'release', ['jshint', 'uglify', 'concat']
  grunt.registerTask 'default', ['jst', 'stylus', 'bake', 'copy', 'sails-linker']
  grunt.registerTask 'release', ['uglify', 'concat']


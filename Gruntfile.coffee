# Install directory of all third party-assets
vendor = 'vendor/'
# Directory to build the site to
site = 'site/'
# File extensions
js = '.js'
css = '.css'
# Bash wildcard patterns to match all
# JS files
js_src = 'js/**/*.js'
# HTML templates
templates = 'templates/**/*.html'

# Library paths
libs =
  jquery: 'jquery/dist/jquery'
  underscore: 'underscore/underscore'
  bootstrap: 'bootstrap/dist/js/bootstrap'
  backbone: 'backbone/backbone'
  blueimp: 'blueimp-gallery/js/jquery.blueimp-gallery.min'
  bbs: 'blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min'
  d3: 'd3/d3.min'
  dropzone: 'dropzone/downloads/dropzone'
  penguinator: 'penguinator/dist/penguinator'
  gmaps: 'gmaps/gmaps'
  modernizr: 'webshim/js-webshim/minified/extras/modernizr-custom'
  webshims: 'webshim/js-webshim/minified/polyfiller'
  alert: 'alert/alert'
  atlas: 'jquery-atlas/src/main'
  tab: 'bootstrap/js/tab'

# Array to hold values of library map
lib_list = []

# List of full vendor directories to be included in the built site
dir_list = [
  vendor + 'dropzone'
  vendor + 'webshim/js-webshim/minified'
  vendor + 'bootstrap/dist/fonts'
  'img'
]

# List of vendor stylesheets to be included in the built site
css_list = [
  'bootstrap/dist/css/bootstrap'
  'blueimp-gallery/css/blueimp-gallery'
  'blueimp-bootstrap-image-gallery/css/bootstrap-image-gallery'
]

# Add the root directory and file extension to CSS files
css_list = css_list.map((path) -> vendor + path + css)

# Add the root directory and file extension to JS files and put them in an array
for k, v of libs
  full = vendor + v + js
  libs[k] = full
  lib_list.push(full)

# Make a list of all vendor resources -- JS, CSS and directories
all_list = lib_list.concat(dir_list).concat(css_list)

# Module paths
# Compiled templates file
jst_ = 'jst.js'

# Page-specific files
scripts =
  main: 'main'
  start_job: 'start_job'
  view_jobs: 'view_jobs'
  image_upload: 'image_upload'
  executable_upload: 'executable_upload'
  define_form: 'define_form'
  settings: 'settings'
  graphs: 'graphs'

for k, v of scripts
  scripts[k] = 'js/' + v + '.js'

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

# Files used by every page
shared = [
  libs.jquery
  libs.underscore
  libs.backbone
  libs.alert
  libs.modernizr
  libs.webshims
  libs.bootstrap
]

# Mapping of HTML files to the scripts they require
dependencies =
  'site/index.html': [scripts.main]
  'site/start_job.html': [libs.blueimp, libs.bbs, scripts.start_job]
  'site/define_form.html': [scripts.define_form]
  'site/view_jobs.html': [scripts.view_jobs]
  'site/upload/image.html': [libs.dropzone, libs.penguinator, libs.blueimp, libs.bbs, libs.gmaps, libs.atlas, scripts.image_upload]
  'site/upload/executable.html': [libs.dropzone, scripts.executable_upload]
  'site/settings.html': [scripts.settings]
  'site/graphs.html': [libs.d3, scripts.graphs]
  'site/user_profile.html': [user_profile, about_tab, badges_tab, friends_tab, user_badges, user_photos,
                            newsfeed, navbar]

# Add the shared dependencies to every page
for k, v of dependencies
  dependencies[k] = shared.concat(v)

browserify_map = {}
for k, v of scripts
  browserify_map[site + v] = v

# Mapping of source HTML pages to their output paths in the site directory
bake_map = {}
for k, v of dependencies
  bake_map[k] = k.replace(site, 'html/')

module.exports = (grunt) ->
  # Get some stats on how long the build is taking to isolate slow tasks
  require('time-grunt')(grunt)

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
          $: true
          _: true
          Backbone: true
          JST: true
          fl: true
          d3: true
          Dropzone: true
          GMaps: true
          webshims: true
          alert: true
          console: true
          require: true
          module: true

        ignores: []

      lib_test:
        src: js_src

    jst:
      options:
        processName: (name) ->
          name.replace /templates\/|\.html/g, ''

      compile:
        files:
          'site/jst.js': [templates]

    stylus:
      compile:
        expand: true

        files:
          'site/css/main.css': ['stylus/shared/common.styl', 'stylus/*.styl']

    watch:
      # Lint all JS files and copy them to the site directory
      scripts:
        files: [js_src, 'data/*']
        tasks: ['jshint', 'copy']
      # Compile Stylus files to CSS when they change
      styles:
        files: 'stylus/*.styl'
        tasks: ['stylus']
      # Render HTML/Underscore templates to a JST object when they change
      templates:
        files: templates
        tasks: ['jst']
      # Run static imports/preprocessing on the main HTML pages when they change
      html:
        files: 'html/**/*.html'
        tasks: ['bake', 'sails-linker']

    connect:
      server:
        options:
          port: 9000
          base: site
          keepalive: true

    copy:
      default:
        cwd: '.'
        src: [js_src, 'data/**/*']
        dest: site

    'sails-linker':
      default:
        options:
          appRoot: site
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

    rsync:
      options:
        args: ['--relative', '--recursive']
      dist:
        options:
          src: all_list
          dest: site

    mocha:
      src: ['test/index.html']

    browserify:
      compile:
        files: browserify_map

  require('load-grunt-tasks')(grunt)

  # Define custom composite tasks in terms of other tasks
  grunt.registerTask 'default', [
    'newer:jshint'
    'jst'
    'newer:stylus'
    'bake'
    'browserify'
    'sails-linker'
  ]
  grunt.registerTask 'release', ['jshint', 'uglify', 'concat']
  grunt.registerTask 'test', ['mocha']

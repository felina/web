fs = require('fs')

# Install directory of all third party-assets
vendor = 'vendor/'
# Directory to build the site to
site = 'site/'
# File extensions
js = '.js'
css = '.css'
coffee = '.coffee'
# Bash wildcard patterns to match all...
# ...JS files
js_src = 'js/**/*.js'
# ...HTML templates
templates = 'templates/**/*.html'

# Compiled templates file
jst = 'jst.js'
# Server API file
api = 'js/shared/api.js'

# Library paths
libs =
  jquery: 'jquery/dist/jquery'
  underscore: 'underscore/underscore'
  bootstrap: 'bootstrap/dist/js/bootstrap'
  backbone: 'backbone/backbone'
  blueimp: 'blueimp-gallery/js/jquery.blueimp-gallery.min'
  bbs: 'blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min'
  bbsm: 'blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery'
  d3: 'd3/d3.min'
  dropzone: 'dropzone/downloads/dropzone'
  penguinator: 'penguinator/dist/penguinator'
  gmaps: 'gmaps/gmaps'
  modernizr: 'webshim/js-webshim/minified/extras/modernizr-custom'
  webshims: 'webshim/js-webshim/minified/polyfiller'
  alert: 'alert/alert'
  atlas: 'jquery-atlas/src/main'
  tab: 'bootstrap/js/tab'

  # multiselect
  multiselect: 'bootstrap-multiselect/js/bootstrap-multiselect'
  prettify: 'bootstrap-multiselect/js/prettify'


tests = fs.readdirSync('test/specs')

test_map = {}
for test in tests
  test_map['test/build/' + test.replace('coffee', 'js')] = 'test/specs/' + test

# Array to hold values of library map
lib_list = []

# List of full vendor directories to be included in the built site
dir_list = [
  vendor + 'dropzone'
  vendor + 'webshim/js-webshim/minified'
  vendor + 'bootstrap/dist/fonts'
  vendor + 'blueimp-gallery/img'
  'img'
]

# List of vendor stylesheets to be included in the built site
css_list = [
  'bootstrap/dist/css/bootstrap'
  'blueimp-gallery/css/blueimp-gallery'
  'blueimp-bootstrap-image-gallery/css/bootstrap-image-gallery'
  'bootstrap-multiselect/css/bootstrap-multiselect'
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

# Page-specific files
scripts =
  main: 'main'
  start_job: 'start_job'
  view_jobs: 'view_jobs'
  image_upload: 'image_upload'
  executable_upload: 'executable_upload'
  create_project: 'create_project'
  settings: 'settings'
  graphs: 'graphs'
  # Required for user profile
  user_profile: 'user_profile/user_profile'
  user_gallery: 'user_gallery'
  about_tab: 'user_profile/tabs/about_tab'
  badges_tab: 'user_profile/tabs/badges_tab'
  friends_tab: 'user_profile/tabs/friends_tab'
  user_badges: 'user_profile/badges/user_badges'
  user_photos: 'user_profile/photos/user_photos'
  newsfeed: 'user_profile/newsfeed/newsfeed'
  navbar: 'user_profile/navbar/navbar'
  about: 'user_profile/About/user_about'
  loadimages: 'user_profile/photos/loadimages'
  sub_user: 'sub_users'

for k, v of scripts
  scripts[k] = 'js/pages/' + v + '.js'

# Files used by every page
shared = [
  libs.jquery
  libs.underscore
  libs.backbone
  libs.alert
  libs.modernizr
  libs.webshims
  libs.bootstrap
  api
  jst
]

# Mapping of HTML files to the scripts they require
dependencies =
  'site/index.html': [scripts.main]
  'site/graphs.html': [libs.d3, scripts.graphs]
  'site/settings.html': [scripts.settings]
  'site/start_job.html': [libs.blueimp, libs.bbs, scripts.start_job]
  'site/create_project.html': [scripts.create_project]
  'site/view_jobs.html': [scripts.view_jobs]
  'site/upload/image.html': [libs.dropzone, libs.penguinator, libs.blueimp, libs.bbs, libs.gmaps, libs.atlas, scripts.image_upload]
  'site/upload/executable.html': [libs.dropzone, scripts.executable_upload]
  'site/user_profile.html': [scripts.user_profile, scripts.about_tab, scripts.badges_tab, scripts.friends_tab, scripts.user_badges, scripts.user_photos, scripts.newsfeed, scripts.navbar, scripts.about]
  'site/user_profile_gallery.html': [libs.blueimp, libs.bbsm, scripts.user_gallery]
  'site/sub_users.html': [libs.multiselect, libs.prettify, scripts.sub_user]

# Add the shared dependencies to every page
for k, v of dependencies
  dependencies[k] = shared.concat(v)

browserify_map = {}
for k, v of scripts
  browserify_map[site + v] = v

browserify_map[site + api] = api

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
          api: true
          d3: true
          Dropzone: true
          GMaps: true
          Gamma: true
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
          name
            .replace(/templates\/|\.html/g, '')

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
      data:
        files: ['data/**/*']
        tasks: ['copy']
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
        tasks: ['html']

    connect:
      server:
        options:
          port: 9000
          base: site
          keepalive: true
      test:
        options:
          port: 9001
          base: '.'
          keepalive: true

    copy:
      default:
        cwd: '.'
        src: ['data/**/*']
        dest: site

    scripter:
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
      options:
        reporter: 'Spec'
        log: true
        logErrors: true

    browserify:
      compile:
        files: browserify_map
      test:
        expand: true
        cwd: 'test/specs'
        src: '**/*.coffee'
        dest: 'test/build/'
        ext: '.js'
        options:
          transform: ['coffeeify']

  # Load all tasks
  require('load-grunt-tasks')(grunt)

  # Define custom composite tasks in terms of other tasks
  grunt.registerTask 'html', ['bake', 'scripter']
  grunt.registerTask 'default', [
    'newer:jshint'
    'jst'
    'copy'
    'newer:stylus'
    'bake'
    'browserify:compile'
    'scripter'
  ]
  grunt.registerTask 'build', [
    # 'jshint'
    'jst'
    'copy'
    'stylus'
    'bake'
    'browserify:compile'
    'scripter'
    'rsync'
  ]
  grunt.registerTask 'release', ['jshint', 'uglify', 'concat']
  grunt.registerTask 'test', ['browserify:test', 'mocha']

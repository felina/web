# Official Grunt tasks to load
contribs = ['stylus', 'watch', 'jst', 'connect', 'copy', 'jshint', 'uglify', 'concat']

# Library paths
jquery = 'vendor/jquery/dist/jquery.js'
underscore = 'vendor/underscore/underscore.js'
bootstrap = 'vendor/bootstrap/dist/js/bootstrap.js'
blueimp = 'vendor/blueimp-gallery/js/jquery.blueimp-gallery.min.js'
bbs = 'vendor/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min.js'
d3 = 'vendor/d3/d3.min.js'
dropzone = 'vendor/dropzone/downloads/dropzone.js'
penguinator = 'vendor/penguinator/index.js'
gmaps = 'vendor/gmaps/gmaps.js'
modernizr = 'vendor/webshim/js-webshim/minified/extras/modernizr-custom.js'
webshims = 'vendor/webshim/js-webshim/minified/polyfiller.js'
alert = 'vendor/alert/alert.js'
tab = 'vendor/bootstrap/js/tab.js'

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
shared = [jquery, alert, modernizr, webshims, underscore, bootstrap, common]

# Mapping of HTML files to the scripts they require
dependencies =
  'site/index.html': [main]
  'site/start-job.html': [blueimp, bbs, start_job]
  'site/define-form.html': [define_form]
  'site/view-jobs.html': [dashboard]
  'site/upload/image.html': [dropzone, penguinator, blueimp, bbs, gmaps, image_upload]
  'site/upload/executable.html': [dropzone, executable_upload]
  'site/settings.html': [settings]
  # 'site/graphs.html': [d3, bar_chart, graphs]
  'site/user-profile.html': [user_profile, about_tab, badges_tab, friends_tab, user_badges, user_photos,
                            newsfeed, navbar]
  # 'site/user-profile.html': [user_profile]
  # 'site/user-profile-gallery.html':[user_gallery]
  
# Add the shared dependencies to every page
for k, v of dependencies
  dependencies[k] = shared.concat(v)

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
          JST: true
          fl: true
          d3: true
          Dropzone: true
          GMaps: true
          webshims: true
          alert: true
          console: true

      lib_test:
        src: ['js/**/*.js']

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
        files: [ 'js/**/*.js', 'data/*']
        tasks: ['jshint', 'copy']
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
        src: ['js/**/*.js', 'data/*']
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

  grunt.loadNpmTasks "grunt-contrib-#{contrib}" for contrib in contribs
  grunt.loadNpmTasks 'grunt-bake'
  grunt.loadNpmTasks 'grunt-sails-linker'

  grunt.registerTask 'default', ['jshint', 'jst', 'stylus', 'bake', 'copy', 'sails-linker']
  grunt.registerTask 'release', ['jshint', 'uglify', 'concat']

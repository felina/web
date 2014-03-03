# Builds the site by running all Grunt tasks and also copying over any images
# vendor scripts to the site directory
build: favicon
	grunt
	rsync -r img site
	rsync -Rr \
		vendor/dropzone \
		vendor/jquery/dist/jquery.js \
		vendor/alert/alert.js \
		vendor/webshim/js-webshim/minified \
		vendor/underscore/underscore.js \
		vendor/bootstrap/dist/js/bootstrap.js \
		vendor/bootstrap/dist/fonts \
		vendor/bootstrap/dist/css/bootstrap.css \
		vendor/d3/d3.min.js \
		vendor/penguinator/index.js \
		vendor/blueimp-gallery/css/blueimp-gallery.css \
		vendor/blueimp-bootstrap-image-gallery/css/bootstrap-image-gallery.css \
		vendor/blueimp-gallery/js/jquery.blueimp-gallery.min.js \
		vendor/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min.js \
		vendor/gmaps/gmaps.js \
		site

# Deletes files that are the result of a build process
clean:
	rm -rf site
	rm -f website.zip

# Builds the favicon from the full size logo. Requires ImageMagick
favicon: site
	convert -resize x16 img/shutter.png site/favicon.ico

# Create the site directory and CSS subdirectory
site:
	mkdir -p site/css

# Build the site and deploy it to S3
deploy: build
	s3cmd sync site/ s3://felina.io --acl-public

# Exports the files as a ZIP archive
export:
	zip -r website.zip \
		html stylus templates js img \
		README.md package.json Gruntfile.coffee bower.json makefile .bowerrc

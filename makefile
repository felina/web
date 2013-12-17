build:
	mkdir -p site/css
	grunt

	rsync -r img js site
	rsync -Rr \
		vendor/dropzone \
		vendor/jquery/jquery.js \
		vendor/underscore/underscore.js \
		vendor/bootstrap/dist/js/bootstrap.js \
		vendor/bootstrap/dist/fonts \
		vendor/bootstrap/dist/css/bootstrap.css \
		vendor/d3/d3.min.js \
		vendor/penguinator/index.js \
		vendor/jquery-ui/ui/jquery-ui.js \
		vendor/blueimp-gallery/css/blueimp-gallery.css \
		vendor/blueimp-bootstrap-image-gallery/css/bootstrap-image-gallery.css \
		vendor/blueimp-gallery/js/jquery.blueimp-gallery.min.js \
		vendor/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min.js \
		site

clean:
	rm -rf site
	rm -f website.zip

export:
	zip -r website.zip \
		html stylus templates js img \
		README.md package.json Gruntfile.coffee bower.json makefile .bowerrc

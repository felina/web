# Builds the site by running all Grunt tasks and also copying over any images
# vendor scripts to the site directory
build: favicon
	grunt

# Deletes files that are the result of a build process
clean:
	rm -rf site test/build doc
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

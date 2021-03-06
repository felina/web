# Builds the site by running all Grunt tasks and also copying over any images
# vendor scripts to the site directory
build: favicon
	grunt
	grunt rsync

# Deletes files that are the result of a build process
clean:
	rm -rf site test/build doc
	rm -f website.zip

# Builds the favicon from the full size logo. Requires ImageMagick
favicon: site
	convert -resize x16 img/favicon.png site/favicon.ico

# Create the site directory and CSS subdirectory
site:
	mkdir -p site/css

# Build the site and deploy it to S3
deploy: build
	s3cmd sync site/ s3://darwinapp.co --acl-public

install:
	bower cache clean
	bower install
	npm install

# Exports the files as a ZIP archive
export:
	zip -r website.zip \
		html test stylus templates js img \
		README.md package.json Gruntfile.coffee bower.json makefile .bowerrc

build:
	mkdir -p site

	rsync -r img js site
	rsync jst.js site
	rsync -Rr \
		vendor/dropzone \
		vendor/jquery/jquery.js \
		vendor/underscore/underscore.js \
    	vendor/bootstrap/dist/js/bootstrap.js \
    	vendor/bootstrap/dist/fonts \
    	vendor/bootstrap/dist/css/bootstrap.css \
    	site

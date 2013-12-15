build:
	grunt
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
    	vendor/d3/d3.min.js \
    	vendor/penguinator/style.css \
    	vendor/penguinator/index.js \
    	vendor/jquery-ui/ui/jquery-ui.js \
    	site

clean:
	rm -rf site

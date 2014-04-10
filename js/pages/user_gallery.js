var onPageLoad = require('../shared/pageload');
var Gallery = require('../views/gallery/default');

$(function(){
	onPageLoad('user_profile_gallery');

    var gallery = new Gallery();
    gallery.render('#gallery');

    api.get('images', function(data) {
        if (data.res) {
            data.images.forEach(function(image) {
                gallery.add({
                    url: api.url + 'img?id=' + image.imageid,
                    title: 'hi'
                });
            });
        }
    });
});

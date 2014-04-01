var onPageLoad = require('../shared/pageload');

$(function(){
	onPageLoad('user_profile_gallery');

    api.get('images', function(data) {
        if (data.res) {
            data.images.forEach(function(image) {
                $('#links').append(JST.gallery_default({
                    url: api.url + 'img?id=' + image.imageid,
                    title: 'hi'
                }));
            });
        }
    });
});

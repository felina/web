$(function(){    
    
    var profTabWrap = $('.profile_tab');

    var photos = [
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
    ];

    //Gets images that are then displayed in the user photo gallery on the main page
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: fl.server + 'images',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if(data.res) {
                for (var i = 0; i < data.images.length; i++) {
                    photos[i] = fl.server + 'img/' + data.images[i].imageid;
                }
            }
            var photoGallery = $(JST['User_Profile/Photo_Gallery/user_photo']({
                photo_total: '100',
                photo_url: 'photo_url',
                photos: photos
            }));
            var photo_wrapper = profTabWrap.find('.photo_wrapper');
            photo_wrapper.append(photoGallery);
        }
    });

    //Photos Tab
});

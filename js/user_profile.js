$(function(){

    var user_name;
    var profile;
     

    // var profile = $(JST.user_profile({
        // username: '',
        // userinfo: 'I like penguins',
        // profile_picture: '/img/shutter.png',
        // cover_photo: '/img/leopard.jpg'
    // }));
    // var profileWrap = $('.profile_wrapper');
    // profileWrap.append(profile);

    console.log('Hello there');
     $.ajax({
        type: 'GET',
        dataType: "json",
        url: fl.server + 'logincheck',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if(data.res) {
                user_name = data.user.name;
                profile = $(JST.user_profile({
                    username: user_name,
                    userinfo: 'I like penguins',
                    profile_picture: '/img/shutter.png',
                    cover_photo: '/img/leopard.jpg'
                }));
                var profileWrap = $('.profile_wrapper');
                profileWrap.append(profile);
                console.log(data.user.name);
            } else {
                user_name = "User Name";
            }
        }
    });
     console.log("User name = " + user_name);

    var newsfeed = $(JST.newsfeed({
        user_text: 'Info is here'
    }));
    var newsfeedWrap = $('.newsfeed_wrapper');
    newsfeedWrap.append(newsfeed);

    var newsfeed_head = $(JST.newsfeed_head({
        user_photo: '/img/shutter.png',
        posting_user: 'Frank Reynolds',
        recieving_user: 'Andrew Stuart',
        time_post: 'Yesterday 16:06'
    }));
    newsfeedWrap.find('.newshead_wrapper').append(newsfeed_head);

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
            var photoGallery = $(JST.user_photo({
                photo_total: '100',
                photo_url: 'photo_url',
                photos: photos
            }));
            var photo_wrapper = $('.photo_wrapper');
            photo_wrapper.append(photoGallery);
        }
    });

    var photoGallery = $(JST.user_photo({
        photo_total: '100',
        photos: photos
    }));
    var photo_wrapper = $('.photo_wrapper');
    photo_wrapper.append(photoGallery);

    var badges = [
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png'
    ];

    var badgeGallery = $(JST.user_badges({
        badges: badges,
        user_badges: '17',
        available_badges: '100'
    }));
    var badge_wrapper = $('.badge_wrapper');
    badge_wrapper.append(badgeGallery);

});

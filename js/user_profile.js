$(function(){
    var profile = $(JST.user_profile({
        username: 'Andrew Stuart',
        badgeCount: '10',
        mostUploaded: 'Penguins',
        profile_picture: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        cover_photo: 'http://stylopics.com/wp-content/uploads/2013/08/fb_profile_cover_1317410583f25.jpg'
    }));
    var profileWrap = $('.profile_wrapper');
    profileWrap.append(profile);

    var newsfeed = $(JST.newsfeed({
        user_text: 'Info is here'
    }));
    var newsfeedWrap = $('.newsfeed_wrapper');
    newsfeedWrap.append(newsfeed);

    var newsfeed_head = $(JST.newsfeed_head({
        user_photo: 'http://upload.wikimedia.org/wikipedia/commons/e/e0/Anonymous.svg',
        posting_user: 'Peter Nincompoop',
        recieving_user: 'Andrew Stuart',
        time_post: 'Yesterday 16:06' 
    }));
    newsfeedWrap.find('.newshead_wrapper').append(newsfeed_head);

    var photos = [
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
    ];


    var photoGallery = $(JST.user_photo({ 
        photo_total: '100',
        photos: photos
    }));
    var photo_wrapper = $('.photo_wrapper');
    photo_wrapper.append(photoGallery);

    var badges = [
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
    ]

    var badgeGallery = $(JST.user_badges({
        badges: badges,
        user_badges: '17',
        available_badges: '100'
    }));
    var badge_wrapper = $('.badge_wrapper');
    badge_wrapper.append(badgeGallery);
});

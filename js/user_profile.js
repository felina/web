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

    }));
    var newsfeedWrap = $('.newsfeed_wrapper');
    newsfeedWrap.append(newsfeed);

    var photoGallery = $(JST.user_photo({
        photo1: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo2: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo3: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo4: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo5: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo6: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo7: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo8: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg',
        photo9: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg'
    }));
    var photo_wrapper = $('.photo_wrapper');
    photo_wrapper.append(photoGallery);

    var badgeGallery = $(JST.user_badges({
        badge1: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge2: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge3: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge4: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge5: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge6: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge7: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge8: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge9: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge10: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge11: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge12: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge13: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge14: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge15: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge16: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge17: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge18: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge19: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge20: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge21: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge22: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge23: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge24: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
        badge25: 'http://upload.wikimedia.org/wikipedia/en/9/97/Upd_badge_edds_2007.png',
    }));
    var badge_wrapper = $('.badge_wrapper');
    badge_wrapper.append(badgeGallery);
});

$(function(){

    var profTabWrap = $('.profile_tab');

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

    var badgeGallery = $(JST['User_Profile/Badges/user_badges']({
        badges: badges,
        user_badges: '17',
        available_badges: '100'
    }));
    var badge_wrapper = profTabWrap.find('.badge_wrapper');
    badge_wrapper.append(badgeGallery);

});
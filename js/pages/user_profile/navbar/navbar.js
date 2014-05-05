$(function(){
    var navbar = $(JST['user_profile/navigation/user_navigation']({
        photo_count: '100',
        friend_count: '50',
        user_badges: '17',
        available_badges: '100'
    }));
    var navbarWrap = $('.navbar_wrapper');
    navbarWrap.append(navbar);
});

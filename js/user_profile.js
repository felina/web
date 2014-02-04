$(function(){
    var profile = $(JST.user_profile({
        username: 'Andrew Stuart',
        profile_picture: 'http://upload.wikimedia.org/wikipedia/commons/5/5b/Ultraviolet_image_of_the_Cygnus_Loop_Nebula_crop.jpg'
    }));
    var profileWrap = $('.profile_wrapper');
    profileWrap.append(profile);
});

$(function(){
    var profile;

    fl.setSwitcherIcon('user-profile');

    fl.ajax({
        type: 'GET',
        url: 'logincheck',
        success: function(data) {
            if(data.res) {
                // Only works currently if user logged in, will work later
                profile = $(JST['User_Profile/User_Cover/user_profile']({
                    username: data.user.name,
                    userinfo: 'I like penguins', //Get stuff from server
                    profile_picture: '/img/shutter.png',
                    cover_photo: '/img/leopard.jpg'
                }));
                var profileWrap = $('.profile_wrapper');
                profileWrap.append(profile);
                console.log(data.user.name);
            }
        }
    });
    // TAB PROFILE
    // Sends empty data to profile_tab.html, allows easy splitting of files
    var tabP = $(JST['User_Profile/User_Tabs/profile_tab']());
    var profTabWrap = $('.profile_tab');
    profTabWrap.append(tabP);
});

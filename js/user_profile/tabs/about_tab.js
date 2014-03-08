$(function(){ 
    //About Tab

    var atab = $(JST['User_Profile/User_Tabs/about_tab']({
    }));
    var aboutTab = $('.about_tab');
    aboutTab.append(atab);

    var about = $(JST['User_Profile/About/user_about']({
    }));
    var aboutWrap = aboutTab.find('.about_wrapper');
    aboutWrap.append(about);

});
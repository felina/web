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

    var bInfo = $(JST['User_Profile/About/basic_information']({
    }));
    var bWrap = aboutTab.find('.basic_wrapper');
    bWrap.append(bInfo);

    var mupload = $(JST['User_Profile/About/most_uploaded']({
    }));
    var mupWrap = aboutTab.find('.mupload_wrapper');
    mupWrap.append(mupload);

    var uloc = $(JST['User_Profile/About/user_locations']({
    }));
    var locationWrap = aboutTab.find('.ul_wrapper');
    locationWrap.append(uloc);

});
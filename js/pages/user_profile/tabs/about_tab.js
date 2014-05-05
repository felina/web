$(function(){ 
    //about Tab

    var atab = $(JST['user_profile/user_tabs/about_tab']({
    }));
    var aboutTab = $('.about_tab');
    aboutTab.append(atab);

    var about = $(JST['user_profile/about/user_about']({
    }));
    var aboutWrap = aboutTab.find('.about_wrapper');
    aboutWrap.append(about);

    var bInfo = $(JST['user_profile/about/basic_information']({
    }));
    var bWrap = aboutTab.find('.basic_wrapper');
    bWrap.append(bInfo);

    var mupload = $(JST['user_profile/about/most_uploaded']({
    }));
    var mupWrap = aboutTab.find('.mupload_wrapper');
    mupWrap.append(mupload);

    var uloc = $(JST['user_profile/about/user_locations']({
    }));
    var locationWrap = aboutTab.find('.ul_wrapper');
    locationWrap.append(uloc);

});
$(function(){
    //Badges Tab
    var btab = $(JST['user_profile/user_tabs/badges_tab']({
    }));
    var badgesTab = $('.badges_tab');
    badgesTab.append(btab);
});
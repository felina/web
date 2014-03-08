$(function(){
    //Badges Tab
    var btab = $(JST['User_Profile/User_Tabs/badges_tab']({
    }));
    var badgesTab = $('.badges_tab');
    badgesTab.append(btab);
});
$(function(){
    
    var profTabWrap = $('.profile_tab');

    //Sends data to the newsfeed
    var newsfeed = $(JST['User_Profile/Newsfeed_Item/newsfeed']({
        user_text: 'Info is here'
    }));
    var newsfeedWrap = profTabWrap.find('.newsfeed_wrapper');
    newsfeedWrap.append(newsfeed);

    //The head for a newsfeed item
    var newsfeed_head = $(JST['User_Profile/Newsfeed_Item/newsfeed_head']({
        user_photo: '/img/shutter.png',
        posting_user: 'Frank Reynolds',
        recieving_user: 'Andrew Stuart',
        time_post: 'Yesterday 16:06'
    }));
    newsfeedWrap.find('.newshead_wrapper').append(newsfeed_head);
});

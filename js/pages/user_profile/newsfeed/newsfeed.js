$(function(){
    
    var profTabWrap = $('.profile_tab');

    //Sends data to the newsfeed
    var newsfeed = $(JST['user_profile/newsfeed_item/newsfeed']({
        user_text: 'Info is here'
    }));
    var newsfeedWrap = profTabWrap.find('.newsfeed_wrapper');
    newsfeedWrap.append(newsfeed);

    //The head for a newsfeed item
    var newsfeed_head = $(JST['user_profile/newsfeed_item/newsfeed_head']({
        user_photo: 'http://appnovaweb.files.wordpress.com/2013/07/myspacetom.jpg',
        posting_user: 'Frank Reynolds',
        recieving_user: 'Andrew Stuart',
        time_post: 'Yesterday 16:06'
    }));
    newsfeedWrap.find('.newshead_wrapper').append(newsfeed_head);
});

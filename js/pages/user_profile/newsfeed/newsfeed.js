$(function(){
    
    var profTabWrap = $('.profile_tab');

    //Sends data to the newsfeed
    var newsfeed = $(JST['user_profile/newsfeed_item/newsfeed']({
        user_text: 'Earned their first badge'
    }));
    var newsfeed1 = $(JST['user_profile/newsfeed_item/newsfeed']({
        user_text: 'Uploaded 100 Photos'
    }));
    var newsfeed2 = $(JST['user_profile/newsfeed_item/newsfeed']({
        user_text: '"Wow Darwin is the best website ever"'
    }));
    var newsfeed3 = $(JST['user_profile/newsfeed_item/newsfeed']({
        user_text: 'Annotated 10 images'
    }));
    var newsfeed4 = $(JST['user_profile/newsfeed_item/newsfeed']({
        user_text: 'Uloaded 20 Photos'
    }));
    var newsfeed5 = $(JST['user_profile/newsfeed_item/newsfeed']({
        user_text: 'Joined Darwin'
    }));




    var newsfeedWrap = profTabWrap.find('.newsfeed_wrapper');
    newsfeedWrap.append(newsfeed);
    newsfeedWrap.append(newsfeed1);
    newsfeedWrap.append(newsfeed2);
    newsfeedWrap.append(newsfeed3);
    newsfeedWrap.append(newsfeed4);
    newsfeedWrap.append(newsfeed5);

    api.loginCheck(function(data) {
        if(data.res) {


            var today = new Date();
            var hours = today.getHours();
            var minutes = today.getMinutes(); // =>  30
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            today = dd +'/'+ mm +'/'+ yyyy;


            //The head for a newsfeed item
            var newsfeed_head = $(JST['user_profile/newsfeed_item/newsfeed_head']({
                user_photo: 'http://appnovaweb.files.wordpress.com/2013/07/myspacetom.jpg',
                posting_user: data.user.name,
                recieving_user: data.user.name,
                time_post: minutes + ':' + hours + ' ' +today
            }));
            newsfeedWrap.find('.newshead_wrapper').append(newsfeed_head);
        }
    });



    // //The head for a newsfeed item
    // var newsfeed_head = $(JST['user_profile/newsfeed_item/newsfeed_head']({
    //     user_photo: 'http://appnovaweb.files.wordpress.com/2013/07/myspacetom.jpg',
    //     posting_user: data.user.name,
    //     recieving_user: data.user.name,
    //     time_post: 'Yesterday 16:06'
    // }));
    // newsfeedWrap.find('.newshead_wrapper').append(newsfeed_head);
});

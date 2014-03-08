$(function(){

    var profile;

     $.ajax({
        type: 'GET',
        dataType: "json",
        url: fl.server + 'logincheck',
        xhrFields: {
            withCredentials: true
        },
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

    var navbar = $(JST['User_Profile/Navigation/user_navigation']({
        photo_count: '100',
        friend_count: '50',
        user_badges: '17',
        available_badges: '100'
    }));
    var navbarWrap = $('.navbar_wrapper');
    navbarWrap.append(navbar);


    //TAB PROFILE

    //Sends empty data to profile_tab.html, allows easy splitting of files
    var tabP = $(JST['User_Profile/User_Tabs/profile_tab']({
    }));
    var profTabWrap = $('.profile_tab');
    profTabWrap.append(tabP);

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

    var photos = [
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
    ];

    //Gets images that are then displayed in the user photo gallery on the main page
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: fl.server + 'images',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if(data.res) {
                for (var i = 0; i < data.images.length; i++) {
                    photos[i] = fl.server + 'img/' + data.images[i].imageid;
                }
            }
            var photoGallery = $(JST['User_Profile/Photo_Gallery/user_photo']({
                photo_total: '100',
                photo_url: 'photo_url',
                photos: photos
            }));
            var photo_wrapper = profTabWrap.find('.photo_wrapper');
            photo_wrapper.append(photoGallery);
        }
    });

    // var photoGallery = $(JST.user_photo({
    //     photo_total: '100',
    //     photos: photos
    // }));
    // var photo_wrapper = $('.photo_wrapper');
    // photo_wrapper.append(photoGallery);

    var badges = [
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png',
        '/img/shutter.png'
    ];

    var badgeGallery = $(JST['User_Profile/Badges/user_badges']({
        badges: badges,
        user_badges: '17',
        available_badges: '100'
    }));
    var badge_wrapper = profTabWrap.find('.badge_wrapper');
    badge_wrapper.append(badgeGallery);


    //About Tab

    var atab = $(JST['User_Profile/User_Tabs/about_tab']({
    }));
    var aboutTab = $('.about_tab');
    aboutTab.append(atab);

    var about = $(JST['User_Profile/About/user_about']({
    }));
    var aboutWrap = aboutTab.find('.about_wrapper');
    aboutWrap.append(about);


    //Friends Tab
    var ftab = $(JST['User_Profile/User_Tabs/friends_tab']({
    }));
    var friendsTab = $('.friends_tab');
    friendsTab.append(ftab);

    //Photos Tab


    //Badges Tab
    var btab = $(JST['User_Profile/User_Tabs/badges_tab']({
    }));
    var badgesTab = $('.badges_tab');
    badgesTab.append(btab);
});

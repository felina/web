$(function(){
    var profTabWrap = $('.profile_tab');

    var photos = [
        'http://hd.wallpaperswide.com/thumbs/lion_5-t2.jpg',
        'http://3.bp.blogspot.com/-Fo7AHLKOH5M/T8WeqUcZFKI/AAAAAAAAFCc/cQdII_3xu7k/s1600/sloth.jpg',
        'http://4.bp.blogspot.com/-yiqFMaq08ZA/UDko5YqnGGI/AAAAAAAAJgs/PSGs0pFjZNQ/s1600/black_rhino+1.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/8/81/2012_Suedchinesischer_Tiger.JPG',
        'http://www.thetimes.co.uk/tto/multimedia/archive/00224/51989793_SHark_224346c.jpg',
        'http://www.nmfs.noaa.gov/pr/images/fish/mantaray_fgbnms_noaa.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg',
        'http://rack.2.mshcdn.com/media/ZgkyMDE0LzA0LzE4LzdkL0F3a3dhcmRTZWFsLjljMzdlLmpwZw/1a318fd2/ecf/AwkwardSeal.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/a/af/Honey_badger.jpg',
    ];

    //Gets images that are then displayed in the user photo gallery on the main page
    api.getImages(function(data) {
        if(data.res) {
            for (var i = 0; i < data.images.length; i++) {
                photos[i] = api.url + 'img/' + data.images[i].imageid;
            }
        }
        var photoGallery = $(JST['User_Profile/Photo_Gallery/user_photo']({
            photo_total: '100',
            photo_url: 'photo_url',
            photos: photos
        }));
        var photo_wrapper = profTabWrap.find('.photo_wrapper');
        photo_wrapper.append(photoGallery);
    });
});

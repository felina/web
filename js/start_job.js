var fl = require('./shared/common');

$(function(){
    fl.onPageLoad('start_job');

    var data = [
        {
            url: '/img/elephant.jpg',
            title: 'Elephant'
        },
        {
            url: '/img/giraffe.jpg',
            title: 'Giraffe'
        },
        {
            url: '/img/leopard.jpg',
            title: 'Leopard'
        }
    ];

    var gallery = $('#gallery');

    _.each(data, function(item, i) {
        item.id = i;
        gallery.append(JST.gallery_item(item));
    });
});

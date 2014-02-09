$(function(){
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

    for(var i = 0; i < data.length; i++){
        var d = data[i];
        d.id = i;
        gallery.append(JST.gallery_item(d));
    }

    fl.setSwitcherIcon('start-job');
});

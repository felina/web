var fl = require('../../shared/common');

$(function() {
    fl.onPageLoad('user_profile_gallery');

    var GammaSettings = {
        // order is important!
        viewport : [ {
            width : 1200,
            columns : 5
        }, {
            width : 1200,
            columns : 4
        }, {
            width : 1200,
            columns : 3
        }, {
            width : 1200,
            columns : 2
        }, {
            width : 1200,
            columns : 2
        } ]
    };
    // Example how to add more items (just a dummy):
    var page = 0;
    var items = ['<li><div data-alt="img03" data-description="<h3>Sky high</h3>" data-max-width="1800" data-max-height="1350"><div data-src="img/images/xxxlarge/3.jpg" data-min-width="1300"></div><div data-src="img/images/xxlarge/3.jpg" data-min-width="1000"></div><div data-src="img/images/xlarge/3.jpg" data-min-width="700"></div><div data-src="img/images/large/3.jpg" data-min-width="300"></div><div data-src="img/images/medium/3.jpg" data-min-width="200"></div><div data-src="img/images/small/3.jpg" data-min-width="140"></div><div data-src="img/images/xsmall/3.jpg"></div><noscript><img src="img/images/xsmall/3.jpg" alt="img03"/></noscript></div></li>'];

    function addItem(photo, description) {
        var updated = '<li><div data-alt="img03" data-description="<h3>'+description+'</h3>" data-max-width="1800" data-max-height="1350"><div data-src="'+photo+'" data-min-width="1300"></div><div data-src="'+photo+'" data-min-width="1000"></div><div data-src="'+photo+'" data-min-width="700"></div><div data-src="'+photo+'" data-min-width="300"></div><div data-src="'+photo+'" data-min-width="200"></div><div data-src="'+photo+'" data-min-width="140"></div><div data-src="'+photo+'"></div><noscript><img src="'+photo+'" alt="img03"/></noscript></div></li>';
        items[0] = items[0].concat(updated);
    }

    function fncallback() {
        $( '#loadmore' ).show().on( 'click', function() {
            ++page;
            var newitems = items[page-1];
            if( page <= 1 ) {
                Gamma.add( $( newitems ) );
            }
            if( page === 1 ) {
                $( this ).remove();
            }
        });
    }

    api.getImages(function(data) {
        if(data.res) {
            _.each(data.images, function (image) {
                addItem(api.url + 'img/' + image.imageid, "Hello");
            });
        }
    });

    Gamma.init( GammaSettings, fncallback );
});

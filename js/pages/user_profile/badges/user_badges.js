$(function(){

    var profTabWrap = $('.profile_tab');

    var badges = [
        'http://f.thumbs.redditmedia.com/jxVhB21cXGq1RhK_.png',
        'http://d.thumbs.redditmedia.com/h6It3_BUmg0AAfg9.png',
        'http://a.thumbs.redditmedia.com/vu-spkxEpf5x5hKB.png',
        'http://b.thumbs.redditmedia.com/5XrWBMUZ3bBL7xsU.png',
        'http://b.thumbs.redditmedia.com/UGIoI_R6H__Sp9TU.png',
        'http://f.thumbs.redditmedia.com/wgLoC3IsXIE_0j7k.png',
        'http://f.thumbs.redditmedia.com/qFH0DnBSVnIqAqp5.png',
        'http://f.thumbs.redditmedia.com/V6A_4aAv7o687kOY.png',
        'http://f.thumbs.redditmedia.com/XvIgMMrfa4OOm20Y.png',
        'http://e.thumbs.redditmedia.com/is5tiAdGjmJh9jyj.png',
        'http://b.thumbs.redditmedia.com/2AE9uT9imIfTk9t7.png',
        'http://e.thumbs.redditmedia.com/riwl-xOa85PmiBnd.png',
        'http://c.thumbs.redditmedia.com/X2iVKIDLhnoYl66P.png',
        'http://c.thumbs.redditmedia.com/wIc9dRxGeE9Pbx1P.png',
        'http://e.thumbs.redditmedia.com/e5q142g-oEjnqPb4.png',
        'http://d.thumbs.redditmedia.com/5I4eF1jqLryDVN0-.png',
        'http://e.thumbs.redditmedia.com/n3iXDEng201cyGDF.png',
        'http://f.thumbs.redditmedia.com/9QWDnWULTCXRE8kk.png',
        'http://b.thumbs.redditmedia.com/n0_7BYpCg_RYB1j7.png',
        'http://a.thumbs.redditmedia.com/2o2yDW1jNr1QdJjB.png',
        'http://d.thumbs.redditmedia.com/xCAGcmgFb4LvbNeK.png',
        'http://b.thumbs.redditmedia.com/c55rS20Bi6IooEVa.png',
        'http://d.thumbs.redditmedia.com/oRu2iKuU50PE4Sii.png',
        'http://b.thumbs.redditmedia.com/0me15pghMwr1nlK7.png',
        'http://e.thumbs.redditmedia.com/vAckDnDUX9tUmLzv.png'
    ];

    var badgeGallery = $(JST['User_Profile/Badges/user_badges']({
        badges: badges,
        user_badges: '17',
        available_badges: '100'
    }));
    var badge_wrapper = profTabWrap.find('.badge_wrapper');
    badge_wrapper.append(badgeGallery);

});
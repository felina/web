$(function(){
    var user = {
        loggedin: true,
        username: 'John Doe',
        icon: 'icon.jpg'
    };

    var nouser = {
        loggedin: false
    };

    var body = $('body');
    body.prepend(JST.header(user));
    body.append(JST.footer());
    body.append(JST.credits());
});

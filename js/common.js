$(function(){
    var user = {
        loggedin: true,
        username: 'John Doe',
        icon: '8ff364476b280cd51aba531052a0603c'
    };

    var nouser = {
        loggedin: false
    };

    var body = $('body');
    body.prepend(JST.header(user));
    body.append(JST.footer());
    body.append(JST.credits());
});

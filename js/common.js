$(function(){
    var body = $('body');
    body.prepend(JST.header());
    body.append(JST.footer());
    body.append(JST.credits());
});

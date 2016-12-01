/**
 * Created by dong on 2016/12/1.
 */
var parseCookie = function (cookie) {
    var cookies = {};
    if (!cookie) return cookie;
    var list = cookie.split(';');
    list.forEach(function(v, i){
        var pair = v.split('=');
        cookies[pair[0].trim()] = pair[1];
    });
    return cookies;
};
module.exports = parseCookie;
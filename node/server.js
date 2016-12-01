/**
 * Created by dong on 2016/12/1.
 */
var http = require('http'),
    url = require('url'),
    handles = require('./handle'),
    config = require('./config');
    parseCookie = require('./tool/parseCookie');
http.createServer(function (req, res) {
    //req.headers.cookie = "foo=bar; baz=val";
    var pathname = url.parse(req.url).pathname;
    req.query = url.parse(req.url, true).query;
    req.cookies = parseCookie(req.headers.cookie);
    if (pathname == "/favicon.ico"){
        res.end("no img");
        return;
    }
    var paths = pathname.split('/');
    var controller = paths[1] || 'index';
    var action = paths[2] || 'index';
    var args = paths.slice(3);
    console.log('controller', controller);
    console.log('action', action);
    console.log('args', args);
    console.log('pathname', pathname);
    if (handles[controller] && handles[controller][action]) {
        handles[controller][action].apply(null, [req, res].concat(args));
    }
    else {
        res.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"});
        res.end("找不到响应控制器\n");
    }

}).listen(config.port, function () {
    console.log("http://localhost:" + config.port);
});



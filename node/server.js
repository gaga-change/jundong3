/**
 * Created by dong on 2016/12/1.
 */
var http = require('http'),
    url = require('url'),
    handles = require('./handle'),
    config = require('./config'),
    parseCookie = require('./tool/parseCookie'),
    getSession = require('./tool/getSession'),
    serizlize = require('./tool/serialize'),
    sessions = {};
http.createServer(function (req, res) {
    //req.headers.cookie = "foo=bar; baz=val";
    var pathname = url.parse(req.url).pathname;
    if (pathname == "/favicon.ico") {
        res.end("no img");
        return;
    }
    req.query = url.parse(req.url, true).query;
    req.cookies = parseCookie(req.headers.cookie) || {};
    //console.log("headers.cookie" , req.headers.cookie);
    //console.log("cookies", req.cookies);

    /*
     * session {id: ；cookie={}}
     * cookie 保存口令，不会保存姓名啊什么的信息
     * 如果有口令cookie
     *   获取口令，看sessions中有没有相应的session
     *       如果没有session  说明session已近意外消亡
     *           删除该cookie，和没有口令一样的处理
     *       有session（正常情况下）
     *           比较时间状态时间。更新。 或删除
     * 如果没有口令
     *   创建session
     * */
    //获取cookie key为session_id
    var id = req.cookies[config.key];
    var session = sessions[id];
    if (id && session) {
        if (session.cookie.expire > (new Date()).getTime()) {
            session.cookie.expire = (new Date()).getTime() + config.expires;
            req.session = session;
            console.log("更新session");
        }else {
            delete sessions[id];
            req.session = getSession(sessions, config.expires);
            console.log("session 过期了");
        }
    } else {
        req.session = getSession(sessions, config.expires);
        console.log("没有口令 口令不对，或则session消失")
    }
    //res.setHeader('set-cookie', serizlize(config.key, req.session.id));
    var writeHead = res.writeHead;
    res.writeHead = function(){
        var cookies = res.getHeader('set-cookie');
        //console.log('------',cookies);
        //console.log('-----------', req.cookies);
        //var cookies = req.cookies;
        var session = serizlize(config.key, req.session.id);
        cookies = Array.isArray(cookies) ? cookies.concat(session) : [session];
        console.log("cookies", cookies);
        res.setHeader('set-cookie', cookies);
        return writeHead.apply(this, arguments);
    };

    var paths = pathname.split('/');
    var controller = paths[1] || 'index';
    var action = paths[2] || 'index';
    var args = paths.slice(3);
    //console.log('controller', controller);
    //console.log('action', action);
    //console.log('args', args);
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



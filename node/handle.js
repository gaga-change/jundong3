/**
 * Created by dong on 2016/12/1.
 */

var serialize = require('./tool/serialize');
var handles = {};
handles.index = {};
handles.index.index = function (req, res, foo, bar) {
    res.writeHead(200);
    //console.log(req.query);
    console.log(req.cookies);
    if (!req.cookies) {
        res.writeHead(200, {
            "content-type": "text/plain;charset=utf-8",
            "set-cookie": serialize('isVisit', '1', {httpOnly:1, maxAge: 10})
        });
        res.write('没有cookies 您是第一次登入');
    } else {
        res.writeHead(200, {
            "content-type": "text/plain;charset=utf-8"
        });
        res.write('有cookies');
    }
    res.end('index  index ' + foo + ' \n ' + JSON.toString(req.query));

};
module.exports = handles;

/**
 * Created by dong on 2016/12/12.
 */

//    var str = "javascript:void(0);";
//var patt = new RegExp(/javascript:void\(0\)/, "g");
//var isHave = patt.test(str);
//console.log(isHave)

//使用正则表达式对URL进行解析
// function parseUrl(url){
//     var reg = /^(\w+):\/\/([^\/:]*)(?::(\d+))?\/(.*)/
//     reg.exec(url);
//     console.log(RegExp.$1 + ',' + RegExp.$2 + ',' + RegExp.$3 + ',' + RegExp.$4+ ',' + RegExp.$5);
// }
//
//
// function parseUrl2(url){
//     var reg = /^(\w+):\/\/([^\/:]*)(?::(\d+))?\/([^\/]*)(\/.*)/
//     reg.exec(url);
//
//     console.log(RegExp.$1 + ',' + RegExp.$2 + ',' + RegExp.$3 + ',' + RegExp.$4+ ',' + RegExp.$5);
// }
//
//
// function testParseUrl(){
//     var url = "http://ppp.com:8090";
//
//     parseUrl(url);
//
//     var url2 = "http://ppp.com/mximprove/mxt/scripts/views/MainViewController.js";
//
//     parseUrl(url2);
//
// }
// testParseUrl()
//
//
// return ;

let getData = require('./getData'),
    getUrl = require('./getUrl');


function find(url) {
    getData(url, (data) => {
        let list = getUrl(data);
        console.log(list);
    })
}
module.exports = find;


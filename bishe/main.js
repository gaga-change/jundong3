/**
 * Created by dong on 2016/12/12.
 */

// var str = "javascript:void(0);";
// var patt = new RegExp(/javascript:void\(0\)/, "g");
// var isHave = patt.test(str);
// console.log(isHave)
//
// // 使用正则表达式对URL进行解析
// function parseUrl(url) {
//
// }
//
// function testParseUrl() {
//     var url = "http://ppp.com:8090";
//
//     parseUrl(url);
//
//     var url2 = "http://ppp.com:9090/mximprove/mxt/scripts/views/MainViewController.js";
//
//     parseUrl(url2);
//
// }
// testParseUrl()
//
//
// return;


let getData = require('./getData'),
    getUrl = require('./getUrl');


function find(url) {
    getData(url, (data, pathUrl) => {
        console.log("path", pathUrl);
        let path = require('path');
        let base = getUrlBase(url);
        // if (url.substr(-1, 1) != "/")
        //     url = url + '/';
        /*根据判断 获取父层*/
        if (pathUrl.substr(-1, 1) == "/") pathUrl += "index";
        let faUrl = path.dirname(base + pathUrl);
        let list = getUrl(data);
        for (let i in list) {
            list[i].forEach((v, j) => {
                list[i][j] = trun(v);
            });
        }
        // console.log("location", location);
        console.log("base", base);
        console.log("faUrl", faUrl);
        console.log(list);
        return list;
        /*加工路径
         * 1. http:// | https://  开头
         * 2.  /
         * 3. 无
         * 2，3. 都转为 第一种形式
         * */
        function trun(url) {
            if (require('path').isAbsolute(url)) {
                //如果是绝对路径
                return base + url;
            }
            if (url.substr(0, 7) != "http://" && url.substr(0, 7) != "https:/") {
                return faUrl + "/" + url;
            }
            return url;
        }

    })
}
function getUrlBase(url) {
    /*
     *  主要负责 这类型
     *  1. http://localhost:8080/person  有后缀，单不是文件，怎么区分？
     *  2. http://localhost:8080
     *  3. http://yanjundong.com
     *  4. http://yanjundong.com/
     * */
    // console.log("变化前", url);
    if (url.substr(0, 4) != "http")
        url = "http://" + url;
    let arr = url.split("");
    let tar = 3;
    url = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "/") {
            tar--;
            if (tar == 0) break;
        }
        url = url + arr[i];
    }
    // console.log("变化后", url);
    return url;
}

module.exports = find;


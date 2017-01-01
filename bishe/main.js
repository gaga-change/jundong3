/**
 * Created by dong on 2016/12/12.
 */

let getData = require('./getData'),
    getUrl = require('./getUrl');


function find(url, callBack) {
    getData(url, (data, pathUrl) => {
        let path = require('path');
        let base = getUrlBase(url);
        let faUrl;
        if (pathUrl.substr(-1, 1) == "/") {
            faUrl = path.dirname(base + pathUrl + "index");
        } else {
            faUrl = path.dirname(base + pathUrl);

        }
        let list = getUrl(data);
        for (let i in list) {
            list[i].forEach((v, j) => {
                // console.log("geUrl" , v);
                list[i][j] = trun(v);
            });
        }
        // console.log("location", location);
        // console.log("base", base);
        // console.log("faUrl", faUrl);
        // console.log(list);
        // list.base = base;
        // list.pathUrl = pathUrl;
        // return list;
        callBack(list, base, pathUrl);
        /*加工路径
         * 1. http:// | https://  开头
         * 2.  /
         * 3. 无
         * 2，3. 都转为 第一种形式
         * */
        function trun(url) {
            // console.log("获取的url----",url ,"----")
            if(url.substr(0,2) == "//")
                url = "http:" + url;
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


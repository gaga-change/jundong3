/**
 * Created by gaga on 2016/12/29.
 */
/**
 * 返回页面数据
 * @param url  路径
 * @param callBack（data）  回调函数
 *  data ： 用get请求该路径得到的数据
 */
let http = require('http');
function getData(url, callBack) {

    http.get(url, function (req, res) {
        //res.setEncoding('utf-8'); //防止中文乱码
        let d = "";
        req.on('data', function (data) {
            d += data;
        });
        req.on("end", function () {
            //console.log(d)
            callBack(d);
        })
    }).on('error', function (err) {
        console.log(err);
    });
}

module.exports = getData;


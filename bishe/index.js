/**
 * Created by dong on 2016/12/12.
 */

//    var str = "javascript:void(0);";
//var patt = new RegExp(/javascript:void\(0\)/, "g");
//var isHave = patt.test(str);
//console.log(isHave)

//使用正则表达式对URL进行解析
function parseUrl(url){
    var reg = /^(\w+):\/\/([^\/:]*)(?::(\d+))?\/(.*)/
    reg.exec(url);
    console.log(RegExp.$1 + ',' + RegExp.$2 + ',' + RegExp.$3 + ',' + RegExp.$4+ ',' + RegExp.$5);
}


function parseUrl2(url){
    var reg = /^(\w+):\/\/([^\/:]*)(?::(\d+))?\/([^\/]*)(\/.*)/
    reg.exec(url);

    console.log(RegExp.$1 + ',' + RegExp.$2 + ',' + RegExp.$3 + ',' + RegExp.$4+ ',' + RegExp.$5);
}


function testParseUrl(){
    var url = "http://ppp.com:8090";

    parseUrl(url);

    var url2 = "http://ppp.com/mximprove/mxt/scripts/views/MainViewController.js";

    parseUrl(url2);

}
testParseUrl()


return ;

var http = require('http');
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://www.hncj.edu.cn/"; //初始url

var all = {
    img: [],
    css: [],
    js: [],
    html: []
};

/**
 * 请求该url
 * @param url
 */
function find(url) {
    getData(url, function (data) {
            //拿到基础路径  //和/ 的中间， 没有/ 则是//的后面
            //拿到第一个/ 后面的 ，m没有/则 默认是 "/"

            var $ = cheerio.load(data); //采用cheerio模块解析html
            var a = $('a');
            //先从a标签开始找
            for (var i = 0; i < a.length; i++) {
                var url_son = a[i].attribs.href;
                var patt = new RegExp(/javascript:void\(0\)/, "g");
                var isHave = patt.test(url_son);
                if (isHave) continue; //剔除 javascript:void
                console.log(url_son);
                if(path.isAbsolute(url_son)) {
                    console.log("绝对路径", url_son)
                }else {
                    console.log("相对路径", url_son)
                }
            }
            //console.log()
        }
    )
}

/**
 * 返回页面数据
 * @param url  路径
 * @param callBack  回掉函数
 */
function getData(url, callBack) {

    http.get(url, function (req, res) {
        //res.setEncoding('utf-8'); //防止中文乱码
        var d = "";
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

find(url); //开始爬
return;


function fetchPage(x) {     //封装了一层函数
    startRequest(x);
}


function startRequest(x) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            var $ = cheerio.load(html); //采用cheerio模块解析html
            var a = $('a');
            //console.log(a);
            for (var i = 0; i < a.length; i++) {
                console.log(a[i].attribs.href)
            }
        });

    }).on('error', function (err) {
        console.log(err);
    });

}
//该函数的作用：在本地存储所爬取的新闻内容资源
function savedContent($, news_title) {
    $('.article-content p').each(function (index, item) {
        var x = $(this).text();

        var y = x.substring(0, 2).trim();

        if (y == '') {
            x = x + '\n';
//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
            fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
}
//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($, news_title) {
    $('.article-content img').each(function (index, item) {
        var img_title = $(this).parent().next().text().trim();  //获取图片的标题
        if (img_title.length > 35 || img_title == "") {
            img_title = "Null";
        }
        var img_filename = img_title + '.jpg';

        var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url

//采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src, function (err, res, body) {
            if (err) {
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/' + news_title + '---' + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
    })
}
fetchPage(url);      //主程序开始运行
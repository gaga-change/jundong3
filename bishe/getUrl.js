/**
 * Created by gaga on 2016/12/29.
 */


let cheerio = require('cheerio');
/***
 * 获取页面内的url
 * @param data 页面数据
 * @returns {{}} 返回 图片路径（img）和 页面路径(href)
 */
function getUrl(data) {
    let urlList = {};
    let $ = cheerio.load(data); //采用cheerio模块解析html
    // let a = $('a');
    //先从a标签开始找
    urlList.href = reUrl($('a'), "href" );
    urlList.src = reUrl($('img'), "src");
    function reUrl(ele, str) {
        let list = [];
        for (let i = 0; i < ele.length; i++) {
            let url_son = ele[i].attribs[str];
            if(url_son == undefined || url_son.length < 1) continue;
            let re = new RegExp(/javascript:/, "g");
            let isHave = re.test(url_son);
            if (isHave) continue; //剔除 javascript:void
            list.push(url_son);
        }
        return list;
    }
    return urlList;
}
module.exports = getUrl;
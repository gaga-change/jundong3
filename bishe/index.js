/**
 * Created by gaga on 2016/12/29.
 */

let find = require('./main');

/*
 * 爬虫对象
 * */
/*
 * 爬虫对像逻辑
 * 1.需求
 *   > 给定初始url 和 深度
 *   > 缓存爬得到的路径
 *   > 外部可以从缓存中获取一定数量路径、
 *
 */
function Crawler(url, depth) {
    this._url = url;
    this._depth = depth;
    // this.nowDepth = 1;
    this.find = find;
    this.s1 = [1, url];  //s1 中的值，不能出现在s2中
    this.s2 = [];
}
Crawler.prototype.start = function () {
    /*
     * 2.使用广度优先搜索
     *   > 1. 创建一个未搜索的集合 s1 ,和已经搜索过的集合 s2
     *   > 2. s1初始只有一个初始url 和 深度标记位 1 ， s2 初始为空
     *   > 3. 从s1中获取末尾url
     *              >如果是深度标记位
     *                  >符合深度， 把s1中剩余的url放入s2中。结束爬虫
     *                  >不符合深度，在s1末尾添加新深度标记位，continue
     *              >不是深度标记位,url放入s2 中,得到页面内所有href值得集合，
     *   > 4. 把 非href 另搞
     *   > 5. 如果 href集合为空，则代表没有末尾节点  go(3)
     *   > 6. 如果 href集合不为空，把href中所有的url放入s1的起始位置 go(3)
     */
    let self = this;
    let nowUrl;
    // if (self['cbData']) self['cbData'](this._url);
    gaga();
    function gaga() {
        nowUrl = self.s1.pop();
        if(typeof nowUrl != "number" && self.s2.includes(nowUrl)) { //已经遍历过的跳过
            gaga();
        }
        if(self.s1.length + self.s2.length > 2000) {
            self.s1.forEach( v => {
                if(! self.s2.includes(v) && (typeof v != 'number')) {
                    if (self['cbData']) self['cbData'](v);
                }
            });
            if (self['cbEnd']) self['cbEnd']();
            console.log("获取的路径超过 2000 条");

            return;
        }
        // console.log(nowUrl);
        // console.log("s1", self.s1);
        // console.log("s2", self.s2);
        /*
         * 深度到达，把存在s1中的最后一层路径取出
         * */
        if (typeof nowUrl == "number" && nowUrl == self._depth) {
            // console.log("nowUrl ==", nowUrl, self._depth);
            // self.s2.concat(...self.s1);
            // self.onEnd();

            self.s1.forEach( v => {
                if(! self.s2.includes(v)) {
                    if (self['cbData']) self['cbData'](v);
                }
            });

            if (self['cbEnd']) self['cbEnd']();
            return;
        }
        if (typeof nowUrl == "number" && nowUrl != self._depth) {
            // console.log("nowUrl !=", nowUrl, self._depth);
            self.s1.unshift(Number(nowUrl + 1));
            gaga()
        } else {
            self.s2.push(nowUrl);
            if (self['cbData']) self['cbData'](nowUrl);
            find(nowUrl, function (list) {
                if (list['href'].length != 0) {
                    // console.log(list['href']);
                    self.s1.unshift(...list['href']);
                }
                gaga();
            });
        }
    }
};

Crawler.prototype.onData = function (callBack) {
    this.cbData = callBack;
};
Crawler.prototype.onEnd = function (callBack) {
    // callBack();
    this.cbEnd = callBack;
};


module.exports = Crawler;
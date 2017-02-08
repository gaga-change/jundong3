/**
 * Created by 严俊东 on 2017/2/8.
 */
/**
 * 层级关系
 *  1. 主页
 *      * 新闻
 *      * 视屏
 *  2. 个人
 *      * 好友
 *      * 消息
 * */
(function () {
    Vue.use(VueRouter);

    // 主页
    var index = {
        template: `<div class="index">
        <h3>我是主页</h3>
        <router-link to="/index/xinwen">新闻</router-link>
        <router-link to="/shipin">视频(更改了默认路径)</router-link>
        <router-view></router-view>
</div>`
    };
    // 主页下的附属两个子页
    var xinwen = {template: `<div class="xinwen">新闻内容</div>`}
    var shipin = {template: `<div class="shipin">视屏内容</div>`}

    // 个人页
    var person = {template: `<div class="person">
        <h3>我是个人</h3>
        <router-link to="/person/haoyou">好友列表</router-link>
        <router-link to="/person/xiaoxi">消息列表</router-link>
        <router-view></router-view>
</div>`};
    //个人下的附属两个子页
    var haoyou = {template: `<div class="haoyou">好友内容</div>`}
    var xiaoxi = {template: `<div class="xiaoxi">消息内容</div>`}

    // 路由对象
    var router = new VueRouter({
        mode: 'hash',
        routes: [
            {path: '/', redirect: '/shipin'},
            {path: '/index', component: index, children:[
                {path: '', component: xinwen},
                {path: 'xinwen', component: xinwen},
                {path: '/shipin', component: shipin}
            ]},
            {path: '/person', component: person, children: [
                {path: '', component: haoyou},
                {path: 'haoyou', component: haoyou},
                {path: 'xiaoxi', component: xiaoxi}
            ]}
        ]
    });

    new Vue({
        el: '#app',
        render: function (h) {
            return h(pageContent);
        },
        router,
    })


}());
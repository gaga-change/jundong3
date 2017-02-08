/**
 * Created by 严俊东 on 2017/2/8.
 */

var pageContent = {
    template: `
    <div id="app">
        <h1> 多层级Example</h1>
        <ul>
            <router-link to="/index">主页</router-link>
            <router-link to="/person">个人</router-link>
        </ul>
        <router-view></router-view>
    </div>
`
};
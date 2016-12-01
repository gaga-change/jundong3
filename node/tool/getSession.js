/**
 * Created by dong on 2016/12/1.
 */

/***
 * 获取一个session对象
 * @param arr session数组
 * @param expires  过期时间
 * @returns {{}}
 */
var getSession = function (arr, expires) {
    var session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + expires
    };
    arr[session.id] = session;
    return session;
};
module.exports = getSession;
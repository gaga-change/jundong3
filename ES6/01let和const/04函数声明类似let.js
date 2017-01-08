/**
 * Created by gaga on 2017/1/8.
 */
'use strict';
/**
 * 严格模式 下， function效果和 let
 *
 * if(false) 不能缺少 {}
 */
(function () {
    function f() {
        console.log("out")
    }

    let a = 8;
    (function () {
        // if (false) {
        //     function f() {
        //         console.log("in");
        //     }
        // }
        f();
        console.log(a)
    }());
}());
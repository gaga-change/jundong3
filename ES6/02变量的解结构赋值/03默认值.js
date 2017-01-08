/**
 * Created by gaga on 2017/1/8.
 */
/**
 * 只有变量 === undefined 。才会使用默认值
 *
 */

// "use strict";
{
    {
        let [a = true] = [];
        console.log(a); // true;

        let [b = true] = [undefined];
        console.log(b); // true;

        let [c = true] = [null];
        console.log(c); //null
    }
    {
        function get() {
            console.log("gaga");
        }
        let [x = get()] = [1];
        let [y = get()] = []; // 打印 gaga
        console.log(y); //undefined
    }
    {
        // let [x = 1, y = x] = [];     // x=1; y=1
        // let [x = 1, y = x] = [2];    // x=2; y=2
        // let [x = 1, y = x] = [1, 2]; // x=1; y=2
        // let [x = y, y = 1] = [];     // ReferenceError ： y is not defined
    }
}
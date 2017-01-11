/**
 * Created by gaga on 2017/1/11.
 */
/*逐个导出*/
export let a = "a";
export let b = "b";
export let c = "c";

/*和Commonjs不一样，一定时间改变后，import后，改变值，会有影响*/
// setTimeout(() => a = 'baz', 500);

/*另一种写法*/
let d = "d";
let e = "e";
export {d, e};

/*可以导出函数、类*/
export function multiply(x, y) {
    return x * y;
}

/*设置别名*/
function gaga1() {}
function gaga2() {}
export {
    gaga1 as fun1,
    gaga2 as fun2
}

/*必须建立一一对应关系*/
// export 1; //报错
// export f; //报错

/*总结*/
// 写法一
export let m1 = 1;

// 写法二
let m2 = 1;
export {m2};

// 写法三
let m3 = 1;
export {m3 as n};

/*函数和类写法一样*/

/*export default  默认输出 导入时可以随意写变量,可以不写{}， 可以带名字*/
// export  default  1;
// export default function () {
//     console.log('foo');
// }

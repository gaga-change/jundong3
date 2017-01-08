/**
 * Created by gaga on 2017/1/8.
 */

/**
 * 通常全局变量会自动添加到 顶层对象属性中
 */
/*例如在浏览器中*/
(function () {
    var a;
    window.a = 1;
    a; //1;
    a = 2;
    window.a //2
});

(function () {
    this.a = 10;
    console.log(this.a);
}());
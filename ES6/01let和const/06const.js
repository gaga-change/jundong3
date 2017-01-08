/**
 * Created by gaga on 2017/1/8.
 */

/**
 *  常量 const
 *      const作用域和let命令相同
 */

/*不能改变值*/
(function () {
    const PI = 3.14159;
    // PI = 3; //TypeError : Assignment to constant variable.
    console.log(PI);
}());

/*只声明不赋值，会出错*/
(function () {
    // const PI; //SyntaxError: Missing initializer in const declaration
}());

/*赋值对象，其实就是赋值了一个地址*/
(function () {
    const G = {};
    G.a = 10; //不会报错， 如果不想改动对象的属性，可以选择冻结
    console.log(G);
}());
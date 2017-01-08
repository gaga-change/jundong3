/**
 * Created by gaga on 2017/1/8.
 */

/**
 * ES6允许按照一定模式，从数组或对象中提取值，对变量进行赋值，这被称为解结构赋值
 *  只要两边数量匹配，就会赋值相应的值
 *  解构不成功就是 undefined
 *  右边也可以是用 Set ， 其实只要实现了 Iterator 接口即可
 */
{
    /*一般赋值写法*/
    {
        let a = 1;
        let b = 2;
        let c = 3;
        console.log(a, b, c); //1 2 3
    }
    /*不怎么会用的赋值写法*/
    {
        let [a, b, c]= [1, 2, 3];
        console.log(a, b, c); //1 2 3
    }
    /*多层数组*/
    {
        let [a, [b, c]] = [1, [2, 3]];
        console.log(a, b, c); //1 2 3
    }
    /* 三个点 ...*/
    {
        let [a, ...b] = [1, 2, 3];
        console.log(a, b);// 1 [2, 3]
    }
}
/*其它特殊列子*/
{
    {
        let [, , a] = [1, 2, 3];
        console.log(a);
    }
    {
        let [a, b, ...c] = [1];
        console.log(a, b, c); //1 undefined []
    }
}


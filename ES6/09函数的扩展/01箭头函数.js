/**
 * Created by gaga on 2017/1/8.
 */

/**
 * 允许 => 定义函数
 *   不需要参数时， 用 （）代替。
 *   代码部分没有{} 时，默认时 return的值。 如果像返回一个对象，那么外面加个（）
 *   当代码多余一行时，用{}
 *   注意：
 *      1.体内的this对象，就是定义所在的对象，不是使用的对象
 *      2.不可以当作构造函数，即不可以使用new命令
 *      3.不可以使用arguments对象，若需要使用Rest代替
 *      4.不可以使用yield命令，因此箭头函数不能用作Generator函数。
 */
{
    {
        let f = v => v;
        console.log(f(1)); // 1
    }
    {
        let f = function (v) {
            return v;
        }
    }
    {
        let f = v => ({a: 10});
        console.log(f(1)); // {a: 10}
    }
}
//箭头函数的一个变态用法。为了获取值，也是够了。
{
    let a = {x: 1};
    let gaga = {
        get: h => h(a)
    };
    gaga.get(a => {
        console.log(a);
    })

}

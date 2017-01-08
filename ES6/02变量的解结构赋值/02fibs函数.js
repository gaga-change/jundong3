/**
 * Created by gaga on 2017/1/8.
 */

/**
 * fibs是一个Generator函数，原生具有Iterator接口。解构赋值会依次从这个接口获取值。
 */
{
    /*fibs 函数*/
    {
        function* fibs() {
            let a = 0;
            let b = 1;
            while (true) {
                yield a;
                [a, b] = [b, a + b];
            }
        }
        let [first, second, third, fourth, fifth, sixth] = fibs();
        console.log(first);
    }
}
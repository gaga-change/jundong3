/**
 * Created by gaga on 2017/1/8.
 */

/**
 *  只要块级作用域内存在let变量，则它声明的变量就会绑定这个区域。
 *    虽然不存在变量上升，但还是在该作用域内留下了不可磨灭的印记
 */

(function () {
    let a = 10;
    console.log(a);
    {
        /**
         * 这样就意味了 typeof 不再是一个百分百安全的操作
         *  let a上面的区域 为a的死区，用a就死
         *  反而没有声明过的变量用typeof不会出错
         */
        console.log(typeof gaga); //undefined;
        // typeof a;   //a is not defined
        // a = 11;  //a is not defined
        // console.log(a); //a is not defined
        let a = 10;
    }
}());

/*死区另一个案例*/
(function () {
    function gaga(x = y, y = 10) {
        return [x, y];
    }

    // gaga(); // y is not defined
    function gaga(x = 10, y = x) {
        return [x, y];
    }

    console.log(gaga()); // [10, 10];
}());

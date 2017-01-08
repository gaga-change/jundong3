/**
 * Created by gaga on 2017/1/8.
 */
(function () {
    {
        var a = 10;
        let b = 10;
    }
    // console.log(a);
    //console.log(b); //b is not defined
}());


/*for 循环就是一个很好的例子*/
(function () {
    var a = [];
    for (var i = 0; i < 10; i++) {
        a[i] = function () {
            console.log(i)
        }
    }
    a[6](); //10
    // console.log(i); //10
}());
(function () {
    var a = [];
    for (let i = 0; i < 10; i++) {
        a[i] = function () {
            console.log(i)
        }
    }
    a[6](); //10
    // console.log(i); //i is not defined
}());
/**
 * Created by gaga on 2017/1/8.
 */
/**
 * 注意：
 *   class 不存在变量提升
 */
{
    /*ES5的写法*/
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.prototype.show = function () {
        console.log("x: " + this.x, "y: " + this.y);
    };
    new Point(1, 1).show();
}
{
    /*ES6写法*/
    class Point {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
            return Object.create(null); //不写也会默认创建
        }

        show() {
            console.log("x: " + this.x, "y: " + this.y);
        }
    }
    new Point().show();
}
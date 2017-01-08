/**
 * Created by gaga on 2017/1/8.
 */

/**
 *
 * 1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
 * 2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
 *
 * */

{
    class Point {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        };

        show() {
            console.log("x: " + this.x, "y: " + this.y)
        }
    }
    class Point3D extends Point {
        constructor(x, y, z = 0) {
            super(x, y);
            this.z = z;
        }
    }
    console.log(new Point3D());
    new Point3D().show();
}
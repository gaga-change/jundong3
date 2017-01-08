/**
 * Created by gaga on 2017/1/8.
 */
/**
 *  和函数一样，类也可以使用表达式的形式
 */

{
    const Gaga = class Me {
        showName() {
            console.log(Me.name);
        }
    };
    new Gaga().showName(); // Me 和 书上说的不一样。
}
/*立即 class*/
{
    let a = new class{
        constructor(name){
            this.name = name;
        }
        show() {
            console.log(this.name);
        }
    }("gaga");
    a.show();
}
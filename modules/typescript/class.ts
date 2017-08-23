//创建一个类
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return `hello ${this.greeting}`;
    }
}

let greeter = new Greeter('world');

//继承父类
//省略了构造函数窃取,元素扩展等概念的学习,直接使用
class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}`)
    }
}

class Snake extends Animal {
    constructor(name:string) {
        //直接调用父类方法,无需关心构造函数窃取
        super(name)
    }
    //函数重载,重写父类方法
    move(distanceMeters = 5) {
        console.log("Slithering...");
        super.move(distanceMeters);
    }
}
let sam = new Snake("Sammy the python");
sam.move();

//属性及方法的权限控制
//类似静态语言的 protected,private,public
class Person {
    protected name: string;
    constructor(name : string) {
        this.name = name;
    }
}
function createId(): string {
    return (Math.random()*1e10%1e5).toFixed();
}
class Employee extends  Person {
    private  department : string;
    readonly id: string = createId();
    constructor(name :string,department : string) {
        super(name);
        this.department = department;

    }
    public getElevatorPitch() {
        return `hello ,my name is ${this.name} and i work in ${this.department}`;
    }
}

let howard = new Employee('Howard','Sales');
console.log(howard.getElevatorPitch());
//id 为只读变量不允许赋值
console.log(howard.id);

//支持静态属性和方法
//无需无需实例化在创建
//在 js 中使用静态方法并不适用,会导致每个类都创建相同的函数对象
//静态属性有价值,可以产生共有空间
class Grid {
   static origin = {x:0,y:0};
   static calculateDistanceFromOrigin(point: {
       x:number,y:number;
   }) {
       let xDist = (point.x - Grid.origin.x);
       let yDist = (point.y - Grid.origin.y);
   }
   constructor (public  scale: number){};
}

let gird1 = new Grid(1.0);
let gird2 = new Grid(5.0);

console.log(Grid.calculateDistanceFromOrigin({x:10,y:10}));
console.log(Grid.calculateDistanceFromOrigin({x:10,y:10}));

//支持抽象类操作,和接口的概念不一样
//子类必须补充实现父类方法和属性
abstract class Department {
    constructor(public name:string) {

    }
    printName() : void {
        console.log(`Department name: ${this.name}`)
    }
    abstract printMeeting() : void;

}
class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing");
    }
    printMeeting():void {
        console.log("the Accounting Department meets each Monday at 10 am");
    }

    //无法在抽象类上扩展方法
    //todo 只能申明为静态和非公有方法才可,这样是否合理
    public hello(): void {
        console.log("Generating accounting reports ...");
    }
}

let department: Department = new AccountingDepartment();
department.printName();
department.printMeeting();

//混用类和接口
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z: number;
}

let  point3d: Point3d = {x:1,y:2,z:3};

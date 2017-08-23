var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//创建一个类
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "hello " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('world');
//继承父类
//省略了构造函数窃取,元素扩展等概念的学习,直接使用
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters);
    };
    return Animal;
}());
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        //直接调用父类方法,无需关心构造函数窃取
        return _super.call(this, name) || this;
    }
    //函数重载,重写父类方法
    Snake.prototype.move = function (distanceMeters) {
        if (distanceMeters === void 0) { distanceMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceMeters);
    };
    return Snake;
}(Animal));
var sam = new Snake("Sammy the python");
sam.move();
//属性及方法的权限控制
//类似静态语言的 protected,private,public
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
function createId() {
    return (Math.random() * 1e10 % 1e5).toFixed();
}
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.id = createId();
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "hello ,my name is " + this.name + " and i work in " + this.department;
    };
    return Employee;
}(Person));
var howard = new Employee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
//id 为只读变量不允许赋值
console.log(howard.id);
//支持静态属性和方法
//无需无需实例化在创建
//在 js 中使用静态方法并不适用,会导致每个类都创建相同的函数对象
//静态属性有价值,可以产生共有空间
var Grid = (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
    };
    ;
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var gird1 = new Grid(1.0);
var gird2 = new Grid(5.0);
console.log(Grid.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(Grid.calculateDistanceFromOrigin({ x: 10, y: 10 }));
//支持抽象类操作,和接口的概念不一样
//子类必须补充实现父类方法和属性
var Department = (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("Department name: " + this.name);
    };
    return Department;
}());
var AccountingDepartment = (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, "Accounting and Auditing") || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log("the Accounting Department meets each Monday at 10 am");
    };
    //无法在抽象类上扩展方法
    //todo 只能申明为静态和非公有方法才可,这样是否合理
    AccountingDepartment.prototype.hello = function () {
        console.log("Generating accounting reports ...");
    };
    return AccountingDepartment;
}(Department));
var department = new AccountingDepartment();
department.printName();
department.printMeeting();
//混用类和接口
var Point = (function () {
    function Point() {
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };

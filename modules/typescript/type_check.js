/*
* 原始类型检查,用来对数据,函数,对象等进行输入限制
* 避免由于类型错误造成的 bug
* */
//限定函数输入参数
function hello(name) {
    console.log(name);
}
hello('tom');
//限定输入对象只能包含的属性和类型
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var obj = { label: 'str', size: 10 };
//todo 注意变量必须定义后才能使用,不能直接在函数中传入未申明的值
printLabel(obj);
function sayHello(obj) {
    console.log(obj.name);
}
var p1 = { name: 'tom' };
sayHello(p1);
function sayNickName(obj) {
    console.log(obj.name);
}
var p2 = { name: 'tom', nickName: 'super' };
sayNickName(p2);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var p = { x: 10, y: 20 };
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    // 限定函数的输入和返回值及其有用
    return result > -1;
};

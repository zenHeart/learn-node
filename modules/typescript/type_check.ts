/*
* 原始类型检查,用来对数据,函数,对象等进行输入限制
* 避免由于类型错误造成的 bug
* */
//限定函数输入参数
function hello(name: string) {
    console.log(name);
}

hello('tom');

//限定输入对象只能包含的属性和类型
function printLabel(labelledObj: {label: string}) {
    console.log(labelledObj.label);
}
let obj = {label:'str',size:10};
//todo 注意变量必须定义后才能使用,不能直接在函数中传入未申明的值
printLabel(obj);

//利用 interface 限制传入参数
interface PersonName {
    name : string;
}
function sayHello(obj : PersonName){
    console.log(obj.name);
}
let p1 = {name:'tom'};

sayHello(p1);

//利用 ? 限定可选参数
interface PersonInfo {
    name : string;
    nickName ?: string;
}
function sayNickName(obj : PersonInfo){
    console.log(obj.name);
}
let p2 = {name:'tom',nickName:'super'};

sayNickName(p2);


//利用 interface 限定传入参数类型,不太清楚函数后的配置含义
//利用此方法避免对象没有此属性时产生的错误
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

//限定元素只读,当元素配赋值时会报错
//const 使用与变量
//readonly 使用与属性,对于私有属性非常有用
interface Point {
    readonly x: number;
    readonly y: number;
}
let p : Point = { x: 10, y: 20 };


//函数类型限定
//限定函数接收 (<name>:<type>,[,<name>:<type>]...)
//返回值限定 () : <type>
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    // 限定函数的输入和返回值及其有用
    return result > -1;
}

//限定属性类型
interface NumberDictionary {
    [index: string]: number; //限定所有字符串所有的数据类型为 字符串
    length: number;    // ok, length is a number
}

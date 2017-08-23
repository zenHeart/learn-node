//定义函数传入参数类型和返回值
//同时也限定了参数的传入各数
function add(x:number,y:number) : number {
    return x + y;
}
console.log(add(1,23));
// console.log(add(1,23,1)); 多传入的参数会报错

//支持多个参数传入给一个变量
function  buildName(firstName : string,...restOfName : Array<string>) {
    return firstName + ' ' + restOfName.join(' ');
}
console.log(buildName('Joseph','Aamuel','Lucas'));

//支持函数重载
//todo 添加函数重载范例


//注意 this
//添加 this 范例
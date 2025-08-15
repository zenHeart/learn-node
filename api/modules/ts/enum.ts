
// 对于 ts 扩展特性需要使用 --experimental-transform-types 属性运行，不然会报错
enum Color {
  Red,
  Green,
  Blue
}
const a: Color = Color.Red;

namespace ColorNamespace {
  export const b: Color = Color.Green;
}

// 注意装饰器语法暂时不支持
// function log(target: any, propertyKey: string) {
//    console.log(`Property decorated: ${propertyKey}`);
// }

// class Example {
//    @log
//    value: number = 42;
// }

console.log(a); // 输出: 0
console.log(ColorNamespace.b); // 输出: 1
// console.log(new Example().value); // 输出: 42
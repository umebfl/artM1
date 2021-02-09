
export default {
    name: 'TypeScript',
    def: 'JS的超集，支持ECMAScript6标准',
    major: true,
    logo: {
      type: 'jpg',
      url: 'https://www.runoob.com/wp-content/uploads/2019/01/typescript-logo.jpg',
    },
    url: 'https://www.tslang.cn',
    // 文档列表
    article: [

    ],
    // 特性列表 - demo
    features: [
      {
        title: '基础类型',
        def: 'TypeScript支持与JavaScript几乎相同的数据类型',
        list: [
          {
            title: 'boolean',
            def: '简单的true/false值',
            jump: 'code',
            code: `
let isDone: boolean = false
            `,
          },
          {
            title: 'number',
            def: 'TypeScript里的所有数字都是浮点数',
            jump: 'code',
            code: `
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
            `,
          },
          {
            title: 'string',
            def: '文本数据类型',
            jump: 'code',
            code: `
let name: string = "bob";
name = "smith";
            `,
          },
          {
            title: '数组',
            def: '有两种方式可以定义数组',
            jump: 'code',
            code: `
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
            `,
          },
          {
            title: '元组 Tuple',
            def: '元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同',
            jump: 'code',
            code: `
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

// 当访问一个已知索引的元素，会得到正确的类型：
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

// 当访问一个越界的元素，会使用联合类型替代：
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
            `,
          },
          {
            title: '枚举',
            def: '对JavaScript标准数据类型的一个补充',
            jump: 'code',
            code: `
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
            `,
          },
          {
            title: 'Any',
            def: '为那些在编程阶段还不清楚类型的变量指定一个类型',
            jump: 'code',
            code: `
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

//
let list: any[] = [1, true, "free"];

list[1] = 100;
            `,
          },
          {
            title: 'Void',
            def: 'void类型像是与any类型相反，它表示没有任何类型',
            jump: 'code',
            code: `
function warnUser(): void {
  console.log("This is my warning message");
}
            `,
          },
          {
            title: 'Null 和 Undefined',
            def: 'undefined和null两者各自有自己的类型分别叫做undefined和null',
            jump: 'code',
            explain: [
              '默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。',
              '然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。',
            ],
            code: `
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
            `,
          },
          {
            title: 'Never',
            def: '永不存在的值的类型',
            jump: 'code',
            explain: [
              'never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。',
            ],
            code: `
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
            `,
          },
          {
            title: 'Object',
            def: 'object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。',
            jump: 'code',
            code: `
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
            `,
          },
          {
            title: '转型',
            def: '类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。',
            jump: 'code',
            explain: [
              '它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。',
            ],
            code: `
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

//

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
            `,
          },
        ],
      },
    ],
}
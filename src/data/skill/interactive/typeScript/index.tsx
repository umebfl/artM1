
export default {
    name: 'TypeScript',
    def: 'JS的超集，支持ECMAScript6标准',
    major: true,
    logo: {
      type: 'jpg',
      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3746182100,898429560&fm=26&gp=0.jpg',
      full: true,
    },
    url: 'https://www.tslang.cn',
    // 文档列表
    article: [
      {
        title: '教程',
        list: [
            {
                title: 'TypeScript 教程',
                url: 'https://www.runoob.com/typescript/ts-tutorial.html',
                def: '基础教程',
                jump: 'webview',
            },
        ],
    },
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

//  Up使用初始化为 1。 其余的成员会从 1开始自动增长。
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

// 字符串enum
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// 反向映射
enum Enum {
  A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"



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
            def: 'Undefined用于初始化变量为一个未定义的值; Null表示对象值缺失, 表示一个空对象引用',
            jump: 'code',
            explain: [
              '默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。',
              '然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。',
            ],
            code: `
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined;    // 运行错误
x = null;    // 运行错误

// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
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

          {
            title: '泛型',
            def: '类型参数只影响使用其做为类型一部分的结果类型',
            jump: 'code',
            explain: [
              '它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。',
            ],
            code: `

// x和y是兼容的，因为它们的结构使用类型参数时并没有什么不同
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x

//
interface NotEmpty<T> {
  data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // Error, because x and y are not compatible

// 对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。
let identity = function<T>(x: T): T {
  // ...
}

let reverse = function<U>(y: U): U {
  // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any



            `,
          },
          
          {
            title: '类型推论',
            def: '',
            jump: 'code',
            explain: [
              '在有些没有明确指出类型的地方，类型推论会帮助提供类型',
            ],
            code: `
// 最佳通用类型
let x = 3;

// 上下文类型

            `,
          },


        ],
      },

      {
        title: '函数',
        def: '主要的定义行为的地方',
        list: [
          {
            title: '定义',
            def: '可以创建有名字的函数和匿名函数',
            jump: 'code',
            code: `
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };


// 书写完整函数类型
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };

// 推断类型
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters x and y have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
            `,
          },

          {
            title: '可选参数和默认参数',
            def: '设置参数可选的，可传可不传',
            jump: 'code',
            explain: [
              '可选参数必须跟在必须参数后面。',
              '可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。',
              '在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。',
              '带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。',
              '剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。',
            ],
            code: `
// 可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right


// 默认参数
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right

// 默认参数 放在前面
function buildName(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"

// 多参
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");


            `,
          },



        ]
      },

      {
        title: '接口',
        def: '一系列抽象方法的声明，是一些方法特征的集合',
        list: [
          {
            title: '定义',
            def: '这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法',
            jump: 'code',      
            code: `
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string o
} 
  
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
            `,
          },

          {
            title: '接口和数组',
            def: '将数组的索引值和元素设置为不同类型，索引值可以是数字或字符串',
            jump: 'code',
            code: `
interface namelist { 
  [index:number]:string 
} 

var list2:namelist = ["John",1,"Bran"] // 错误元素 1 不是 string 类型
interface ages { 
  [index:string]:number 
} 

var agelist:ages; 
agelist["John"] = 15   // 正确 
agelist[2] = "nine"   // 错误
            `,
          },

          {
            title: '接口继承',
            def: '通过其他接口来扩展自己, 允许接口继承多个接口',
            jump: 'code',
            code: `

interface Person { 
  age:number 
} 

interface Musician extends Person { 
  instrument:string 
} 

var drummer = <Musician>{}; 
drummer.age = 27 
drummer.instrument = "Drums" 
console.log("年龄:  "+drummer.age)
console.log("喜欢的乐器:  "+drummer.instrument)

// 

interface IParent1 { 
    v1:number 
} 
  
interface IParent2 { 
    v2:number 
} 
  
interface Child extends IParent1, IParent2 { } 
var Iobj:Child = { v1:12, v2:23} 
console.log("value 1: "+Iobj.v1+" value 2: "+Iobj.v2)
            `,
          },
        ],
      },

      {
        title: '对象',
        def: '对象是包含一组键值对的实例。 值可以是标量、函数、数组、对象等',
        list: [
          {
            title: '对象实例',
            def: '实例化',
            jump: 'code',
            code: `
  var object_name = { 
    key1: "value1", // 标量
    key2: "value",  
    key3: function() {
        // 函数
    }, 
    key4:["content1", "content2"] //集合
}
            `,
          },

          {
            title: '类型模板',
            def: 'Typescript 中的对象必须是特定类型的实例',
            jump: 'code',
            code: `
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
            `,
          },

          {
            title: 'Duck Typing',
            def: '动态类型的一种风格，是多态(polymorphism)的一种形式',
            jump: 'code',
            code: `
interface IPoint { 
    x:number 
    y:number 
} 
function addPoints(p1:IPoint,p2:IPoint):IPoint { 
    var x = p1.x + p2.x 
    var y = p1.y + p2.y 
    return {x:x,y:y} 
} 
  
// 正确
var newPoint = addPoints({x:3,y:4},{x:5,y:1})  
  
// 错误 
var newPoint2 = addPoints({x:1},{x:4,y:3})
            `,
          },
        ],

      },


      {
        title: '其他',
        def: '细节',
        list: [
          {
            title: 'Symbols',
            def: '新的原生类型, 不可改变且唯一',
            jump: 'code',
            code: `
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols是唯一的
            `,
          },
        ],
      },



    ],
}

export default {
  name: 'Jest',
  def: '一个令人愉快的 JavaScript 测试框架，专注于 简洁明快',
  major: true,
  logo: {
    type: 'jpg',
    // full: true,
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fjestesmyaktywni.pcpr.pl%2Fdownload%2Fzalacznik_1601.jpg&refer=http%3A%2F%2Fjestesmyaktywni.pcpr.pl&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617255622&t=95be6f08253a25e06cc6d534c31f4b24',
  },
  url: 'https://www.jestjs.cn/docs/getting-started',
  // 文档列表
  article: [
    {
      title: 'Hooks',
      list: [
        {
          title: '常用expect方法',
          url: 'https://blog.csdn.net/qq_37464887/article/details/88640412',
          def: '简单明了',
          jump: 'webview',
        },
      ],
    },
  ],
  // 特性列表 - demo
  features: [
    {
      title: 'Global',
      def: '全局方法',
      list: [
        {
          title: 'describe(name, fn)',
          def: '创建一个将几个相关测试组合在一起作为一个模块',
          url: 'https://jestjs.io/docs/zh-Hans/api#describename-fn',
          jump: 'code',
          code: `
const myBeverage = {
  delicious: true,
  sour: false,
};

describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
          `,
        },
        {
          title: 'it(name, fn, timeout)',
          def: '运行测试的方法',
          url: 'https://jestjs.io/docs/zh-Hans/api#describename-fn',
          jump: 'code',
          code: `
test('did not rain', () => {
  expect(inchesOfRain()).toBe(0);
});
          `,
        },
        {
          title: 'it.todo(name)',
          def: '编写测试计划',
          url: 'https://jestjs.io/docs/zh-Hans/api#describename-fn',
          jump: 'code',
          code: `
const add = (a, b) => a + b;

test.todo('add should be associative');
          `,
        },
      ],
    },
    {
      title: 'Expect',
      def: '断言',
      list: [
        {
          title: 'expect(value)',
          def: '断言某个值',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
test('the best flavor is grapefruit', () => {
  expect(bestLaCroixFlavor()).toBe('grapefruit');
});
          `,
        },
        {
          title: 'expect.anything()',
          def: '匹配null或undefined以外的任何内容',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
// 如果要检查是否使用非空参数调用了模拟函数
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
});
          `,
        },
        {
          title: 'expect.arrayContaining(array)',
          def: '期望的数组是接收到的数组的子集',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});
          `,
        },
        {
          title: 'expect.toBe(value)',
          def: '比较原始值或检查对象实例的引用一致性',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          explain: [
            '请勿.toBe与浮点数一起使用。例如，由于舍入，在JavaScript0.2 + 0.1中不严格等于0.3。如果您有浮点数，请尝试.toBeCloseTo。',
          ],
          code: `
const can = {
  name: 'pamplemousse',
  ounces: 12,
};

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12);
  });

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse');
  });
});
          `,
        },
        {
          title: 'expect.toEqual(value)',
          def: '递归比较对象实例的所有属性',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
};

describe('the La Croix cans on my desk', () => {
  test('have all the same properties', () => {
    expect(can1).toEqual(can2);
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  });
});
          `,
        },
        {
          title: 'expect.toBeCalled()',
          def: '确认模拟功能得到调用',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
function drinkAll(callback, flavour) {
  if (flavour !== 'octopus') {
    callback(flavour);
  }
}

describe('drinkAll', () => {
  test('drinks something lemon-flavoured', () => {
    const drink = jest.fn();
    drinkAll(drink, 'lemon');
    expect(drink).toHaveBeenCalled();
  });

  test('does not drink something octopus-flavoured', () => {
    const drink = jest.fn();
    drinkAll(drink, 'octopus');
    expect(drink).not.toHaveBeenCalled();
  });
});
          `,
        },
        {
          title: 'expect.toHaveReturned()',
          def: '至少一次测试该模拟功能是否成功返回',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
test('drinks returns', () => {
  const drink = jest.fn(() => true);

  drink();

  expect(drink).toHaveReturned();
});
          `,
        },
        {
          title: 'expect.toHaveReturnedWith(value)',
          def: '确保模拟函数返回的特定值',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
test('drink returns La Croix', () => {
  const beverage = {name: 'La Croix'};
  const drink = jest.fn(beverage => beverage.name);

  drink(beverage);

  expect(drink).toHaveReturnedWith('La Croix');
});
          `,
        },
        {
          title: 'expect.toContain(item)',
          def: '要检查的项目是在数组中',
          url: 'https://jestjs.io/docs/zh-Hans/expect',
          jump: 'code',
          code: `
test('the flavor list contains lime', () => {
  expect(getAllFlavors()).toContain('lime');
});
          `,
        },
        {
          title: 'Expect.assertions',
          def: '验证在测试期间调用了一定数量的断言。在测试异步代码时，这通常很有用，以确保实际调用了回调中的断言。',
          url: 'https://www.bookstack.cn/read/jest-v24.1/spilt.6.30.md',
          jump: 'code',
          code: `
// 假设我们有一个函数doAsync接收两个回调callback1和callback2，它将以未知顺序异步调用这两个回调。我们可以使用以下方法进行测试
// 该expect.assertions(2)调用可确保两个回调都实际被调用。
test('doAsync calls both callbacks', () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }
  doAsync(callback1, callback2);
});
          `,
        },
      ],
    },
    {
      title: '快照测试',
      def: '确保自己的UI不会有意外的改变',
      list: [
        {
          title: '基本使用',
          def: '测试React组件时可以采用类似的方法',
          url: 'https://jestjs.io/docs/zh-Hans/snapshot-testing',
          jump: 'code',
          code: `
import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link.react';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
          `,
        },
        {
          title: '更新快照',
          def: '执行 jest -u',
          jump: 'code',
        },
        {
          title: '变量通配',
          def: 'Jest允许为任何属性提供非对称匹配器',
          jump: 'code',
          code: `
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});
          `
        },
      ],
    },
  ],
}

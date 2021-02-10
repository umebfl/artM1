
import code1 from './code/1'
import code2 from './code/2'
import { code3, code3exp, code3expthree, } from './code/3'
import code4 from './code/4'
import code5 from './code/5'
import { c6_exp, c6_app_1, c6_app_2, } from './code/6'
import code7 from './code/7'
import code8 from './code/8'
import code9 from './code/9'
import { c10_exp, c10_app, } from './code/10'
import { c11_exp, c11_app, } from './code/11'
import code12 from './code/12'
import { codeSplite_1, codeSplite_2, codeSplite_3, codeSplite_4, } from './code/13'


export default {
  name: 'React',
  def: '用于构建用户界面的 JavaScript 库',
  major: true,
  logo: {
    // type: 'svg',
    // url: 'https://ahooks.js.org/logo.svg',
    type: 'svg',
    url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
    // url: 'https://avatars2.githubusercontent.com/u/65340384?s=200&v=4',
  },
  url: 'https://react.html.cn/',
  article: [
    {
      title: 'Hooks',
      list: [
        {
          title: 'React Hooks完全上手指南',
          def: '蚂蚁 RichLab 前端团队',
          jump: 'webview',
          url: 'https://zhuanlan.zhihu.com/p/92211533',
        },
        {
          title: 'useEffect和useLayoutEffect的区别',
          def: '简书文章',
          jump: 'webview',
          url: 'https://www.jianshu.com/p/412c874c5add',
        },
        {
          title: 'React Hooks 使用详解',
          def: '表述清晰',
          jump: 'webview',
          url: 'https://blog.csdn.net/sinat_17775997/article/details/89087266',
        },
        {
          title: 'React Hooks',
          def: '官方文档',
          jump: 'webview',
          url: 'https://react.html.cn/docs/hooks-custom.html',
        },
      ],
    },
  ],
  features: [
    {
      title: '核心组件',
      def: '一些内置的核心组件',
      list: [
        {
          title: 'react-native-webview',
          def: '创建一个原生的WebView',
          jump: 'code',
          url: 'https://www.react-native.cn/docs/webview',
          code: `
<WebView
useWebKit={true}
startInLoadingState={true}
onNavigationStateChange={handleJump}
ref={webRef}
style={{
    flex: 1,
    backgroundColor: theme.navigationTabBarBackgound,
}} source={{ uri: 'https://cn.bing.com/search?q=react' }} />
          `,
        },
        {
          title: '@react-native-async-storage/async-storage',
          def: '用于React Native的异步，未加密，持久的键值存储系统',
          jump: 'code',
          url: 'https://react-native-async-storage.github.io/async-storage/docs/usage',
          code: `
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}

//

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}          
          `,
        },
      ],
    },
    {
      title: 'Hooks',
      def: '在不更改组件层次结构的情况下重用有状态逻辑(16.7)',
      list: [
        {
          title: 'useState',
          def: '返回 stateful(有状态) 值，以及更新这个状态值的函数',
          url: 'https://react.html.cn/docs/hooks-reference.html#basic-hooks',
          jump: 'detailLv2',
          features: [
            {
              title: '基本',
              list: [
                {
                  title: '函数式更新',
                  def: '该函数将接收先前的值，并返回更新的值',
                  jump: 'code',
                  code: code1,
                },
                {
                  title: '延迟初始化',
                  def: '如果初始状态是高开销的计算结果，则可以改为提供函数，该函数仅在初始渲染时执行',
                  jump: 'code',
                  code: code2,
                },
              ],
            },
          ],
        },
        {
          title: 'useEffect',
          def: '接受一个函数，该函数包含强制性，可能有 effectful（副作用） 代码的函数',
          url: 'https://react.html.cn/docs/hooks-reference.html#basic-hooks',
          explain: [
            '每次渲染后 useEffect 都会运行',
            '如果你的 effect 返回一个函数，React 将在清理时运行它',
            '基本上90%的情况下,都应该用这个,这个是在render结束后,你的callback函数执行,但是不会block browser painting,算是某种异步的方式吧,但是class的componentDidMount 和componentDidUpdate是同步的,在render结束后就运行,useEffect在大部分场景下都比class的方式性能更好',
          ],
          jump: 'code',
          code: [
            code3,
            code3exp,
            code3expthree,
          ],
        },
        {
          title: 'useContext',
          def: '接受一个 context（上下文）对象（从 React.createContext 返回的值）并返回当前 context 值，由最近 context 提供程序给 context',
          jump: 'code',
          code: [
            c10_app,
            c10_exp,
          ],
        },
        {
          title: 'useReducer',
          def: 'useState 的替代方案',
          explain: [
            '接受类型为 (state, action) => newState 的reducer，并返回与 dispatch 方法配对的当前状态。',
            '当你涉及多个子值的复杂 state(状态) 逻辑时，useReducer 通常优于 useState 。它还允许你优化触发深度更新的组件的性能，因为 你可以传递调度而不是回调。',
          ],
          jump: 'detailLv2',
          features: [
            {
              title: '基本',
              list: [
                {
                  title: '使用',
                  def: '使用demo',
                  jump: 'code',
                  code: code8,
                },
                {
                  title: '延迟初始化',
                  def: 'useReducer 接受可选的第三个参数 initialAction 。如果提供，则在初始渲染期间应用初始操作。',
                  jump: 'code',
                  code: code9,
                },
              ],
            },
          ],
        },
        {
          title: 'useCallback',
          def: '将返回一个 callback(回调) 的 memoized 版本，该版本仅在其中一个输入发生更改时才会更改',
          url: 'https://zhuanlan.zhihu.com/p/56975681',
          jump: 'code',
          code: [code7],
        },
        {
          title: 'useMemo',
          def: '帮助我们优化子组件的渲染',
          jump: 'code',
          code: [c6_exp, c6_app_1, c6_app_2],
          url: 'https://blog.csdn.net/sinat_17775997/article/details/89087266',
          explain: [
            '返回一个memoized值。 传递“创建”函数和依赖项数组。useMemo只会在其中一个依赖项发生更改时重新计算memoized值。此优化有助于避免在每个渲染上进行昂贵的计算。',
            '在 A 组件中有两个子组件 B 和 C，当 A 组件中传给 B 的 props 发生变化时，A 组件状态会改变，重新渲染。此时 B 和 C 也都会重新渲染。其实这种情况是比较浪费资源的，现在我们就可以使用 useMemo 进行优化，B 组件用到的 props 变化时，只有 B 发生改变，而 C 却不会重新渲染。'
          ],
        },
        {
          title: 'useRef',
          def: '返回一个可变的 ref 对象',
          jump: 'code',
          code: code5,
          explain: [
            '因为在函数式组件里没有了 this 来存放一些实例的变量，所以 React 建议使用 useRef 来存放一些会发生变化的值，useRef 并不再单单是为了 DOM 的 ref 准备的，同时也会用来存放组件实例的属性',
          ],
        },
        {
          title: 'useImperativeMethods',
          def: '公开子类ref给父组件使用',
          jump: 'code',
          code: code4,
        },
        {
          title: 'useLayoutEffect',
          def: '与 useEffect 相同，但在所有 DOM 变化后同步触发',
          explain: [
            '这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制',
          ],
          jump: 'code',
          code: code3,
        },
        {
          title: '自定义hooks',
          def: '构建你自己的 Hooks',
          explain: [
            '将组件逻辑提取到可重用的函数中',
            '自定义 Hook 是一个 JavaScript 函数，其名称以 ”use” 开头，可以调用其他 Hook。',
          ],
          jump: 'code',
          code: [c11_exp, c11_app],
        },
        {
          title: '在 Hooks 之间传递信息',
          def: '由于 Hooks 是函数，所以我们可以在它们之间传递信息',
          jump: 'code',
          code: code12,
        },
      ],
    },
    {
      title: '代码拆分',
      def: '减少了初始加载过程中的代码量',
      list: [
        {
          title: '动态import()',
          def: '将代码拆分引入到应用程序中的最好方法是通过动态 import() 语法。',
          jump: 'code',
          code: codeSplite_1,
          explain: [
            '在使用 Babel 时，你需要确保 Babel 能够解析动态导入语法，但目前 Babel 还不能直接对其进行转换。 为此，你需要使用 babel-plugin-syntax-dynamic-import。',
          ],
        },
        {
          title: 'React.lazy',
          def: '函数允许您渲染动态导入为常规组件',
          jump: 'code',
          code: codeSplite_2,
        },
        {
          title: 'Suspense',
          def: '渲染时尚未加载包含 OtherComponent 的模块，我们必须在等待加载时显示一些后备内容',
          jump: 'code',
          code: codeSplite_3,
        },
        {
          title: '基于路由的代码拆分',
          def: '网上的大多数人都习惯于页面过渡，知道页面需要花费一定的时间来加载。',
          jump: 'code',
          code: codeSplite_4,
        },
        {
          title: '命名导出(Exports)',
          def: 'React.lazy 目前仅支持默认导出',
          jump: 'code',
          code: [],
        },
      ],
    },
  ],

}
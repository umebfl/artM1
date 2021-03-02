import { SkillPlatform, SkillUnit, SkillStep, } from '../../../variable'

import jest from './jest'
import react from './react'
import reactNative from './react-native'
import typeScript from './typeScript'
import Yarn from './yarn'


const JavaScript = {
    name: 'JavaScript',
    def: '一种解释型或即时编译型的编程语言',
    major: true,
    logo: {
        type: 'jpg',
        full: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.jinqiaojob.com%2Fuploads%2Fallimg%2F200113%2F1-200113194504a8.jpg&refer=http%3A%2F%2Fwww.jinqiaojob.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617253889&t=c33f92d7fd8556ce833a0f923537b3fb',
    },
    url: 'https://www.w3school.com.cn/js/index.asp',
    // 文档列表
    doc: [

    ],
    // 特性列表 - demo
    features: [

    ],
}

const Dart = {
    name: 'Dart',
    def: '一个为全平台构建快速应用的编程语言',
    logo: {
        type: 'jpg',
        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=977863321,390860137&fm=15&gp=0.jpg',
    },
    url: 'https://dart.cn/',
    // 文档列表
    doc: [

    ],
    // 特性列表 - demo
    features: [

    ],
}

const Html5 = {
    name: 'Html5',
    def: '超文本标记语言',
    logo: {
        type: 'jpg',
        full: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F89%2F73%2F3456ee42a409867.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617253923&t=7f465f9ddf774853926f72537bb1c0c8',
    },
    url: 'https://www.w3school.com.cn/html5/index.asp',
    // 文档列表
    doc: [

    ],
    // 特性列表 - demo
    features: [

    ],
}

const Less = {
    name: 'Less',
    def: '一门向后兼容的 CSS 扩展语言',
    logo: {
        type: 'jpg',
        full: true,
        url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2500836854,3966017427&fm=15&gp=0.jpg',
    },
    url: 'https://less.bootcss.com/#%E6%A6%82%E8%A7%88',
    // 文档列表
    doc: [

    ],
    // 特性列表 - demo
    features: [

    ],
}

const Css = {
    name: 'Css',
    def: '控制网页的样式和布局',
    major: true,
    logo: {
        type: 'jpg',
        full: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F86%2F51%2F2456eb8bc0270d9.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617253990&t=239b9cd2dcbb9423540085c11ed93e1d',
    },
    url: 'https://www.runoob.com/css/css-intro.html',
}

const Swift = {
    name: 'Swift',
    def: '一种功能强大且直观的编程语言',
    logo: {
        type: 'jpg',
        full: true,
        url: 'https://static.oschina.net/uploads/logo/swift-lang_ABKjp.png',
    },
    url: 'https://developer.apple.com/swift/',
    // 文档列表
    doc: [

    ],
    // 特性列表 - demo
    features: [

    ],
}

const Ramda = {
    name: 'Ramda',
    def: '实用的 JavaScript 函数式编程库',
    major: true,
    logo: {
        type: 'png',
        full: true,
        // url: 'http://www.ruanyifeng.com/blogimg/asset/2017/bg2017030901.jpg',
        url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4174873472,1476613346&fm=26&gp=0.jpg',
    },
    url: 'https://ramda.cn/',
    // 文档列表
    article: [
        {
            title: 'Hooks',
            list: [
                {
                    title: 'Ramda 函数库参考教程',
                    url: 'http://www.ruanyifeng.com/blog/2017/03/ramda.html',
                    def: '简书文章',
                    jump: 'webview',
                },
            ],
        },
    ],
    // 特性列表 - demo
    features: [

    ],
}

const AntDesign = {
    name: 'Ant Design',
    def: '基于 Ant Design 设计体系的 React UI 组件库',
    major: true,
    platform: SkillPlatform.react,
    logo: {
        type: 'jpg',
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FrQO8ekDyWcz7eKQhnCZyQRicibU3ia5PibYiaYXGNyVIiaI5fjAaMePkVniaA7VURty1VNBx4qNIC95KUtpiaUzgB3B9GA%2F640%3Fwx_fmt%3Dpng&refer=http%3A%2F%2Fmmbiz.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617255092&t=f11e2630fcfe8853da16447e37a8cd8f',
    },
    url: 'https://ant.design/docs/react/introduce-cn',
}

const Webpack = {
    name: 'Webpack',
    def: '用于现代 JavaScript 应用程序的_静态模块打包工具',
    major: true,
    logo: {
        type: 'png',
        // full: true,
        url: 'https://www.webpackjs.com/32dc115fbfd1340f919f0234725c6fb4.png',
        // url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180305%2F240dc32f8648479eaad84a7ab28a0469.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617255747&t=a661639a6e294d2f973feee8a45334a9',
    },
    url: 'https://webpack.docschina.org/',
}

export default {
    name: '前端',
    // 技术链
    chain: [
        {
            title: 'React技术栈',
            list: [
                typeScript,
                react,
                AntDesign,
                Less,
                Ramda,
                jest,
                Webpack,
                Yarn,
            ],
        },
    ],
    list: [
        {
            name: '语言',
            list: [
                JavaScript,
                typeScript,
                Swift,
                Dart,
                Html5,
                Less,
                Css,
            ],
        },
        {
            name: '视图',
            list: [
                react,
                reactNative,
            ],
        },
        {
            name: '数据',
            list: [
                Ramda,
                {
                    name: 'Ahooks',
                    def: '致力于面向中台场景的Hooks库',
                    major: true,
                    logo: {
                        // type: 'svg',
                        // url: 'https://ahooks.js.org/logo.svg',
                        type: 'jpg',
                        url: 'https://pic1.zhimg.com/80/v2-a42735923d9304eed6e74ecf37df81f8_1440w.jpg',
                        // url: 'https://avatars2.githubusercontent.com/u/65340384?s=200&v=4',
                    },
                    url: 'https://ahooks.js.org/zh-CN/hooks/async',
                    doc: [

                    ],
                    api: [
                        {
                            title: 'Async',
                            list: [
                                {
                                    title: 'useRequest',
                                    def: '一个强大的管理异步数据请求的 Hook',
                                },
                            ],
                        },
                        {
                            title: 'State',
                            list: [
                                {
                                    title: 'useUrlState',
                                    def: '一个同步组件内部状态和 query 参数的 hook',
                                },
                                {
                                    title: 'useBoolean',
                                    def: '一个同步组件内部状态和 query 参数的 hook',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Redux',
                    def: 'JavaScript 状态容器，提供可预测化的状态管理',
                    major: true,
                    platform: SkillPlatform.react,
                    logo: {
                        type: 'png',
                        url: 'https://www.redux.org.cn/assets/images/logo.png',
                    },
                    url: 'https://www.redux.org.cn/',
                },
            ],
        },
        {
            name: '数据可视化',
            list: [
                {
                    name: 'React-native-chart-kit',
                    def: '基于React、TypeScript封装了所有的G2Plot图表',
                    major: true,
                    platform: SkillPlatform.react,
                    logo: {
                        type: 'icon',
                        url: 'chart-pie',
                    },
                    url: 'https://charts.ant.design/zh-CN/guide',
                    demo: [
                        {
                            title: '基本使用',
                            path: 'skill/demo/1',
                        },
                    ],
                },
                {
                    name: 'Ant Design Charts',
                    def: '基于React、TypeScript封装了所有的G2Plot图表',
                    major: true,
                    platform: SkillPlatform.react,
                    logo: {
                        type: 'svg',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    },
                    url: 'https://charts.ant.design/zh-CN/guide',
                },
                {
                    name: 'Antv',
                    def: '蚂蚁集团全新一代数据可视化解决方案',
                    logo: {
                        type: 'png',
                        url: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
                    },
                    url: 'https://antv.vision/',
                },
                {
                    name: 'D3',
                    def: '帮助您使用HTML，SVG和CSS使数据栩栩如生',
                    logo: {
                        type: 'png',
                        url: 'https://avatars.observableusercontent.com/avatar/c29cf4d85eece3bf402bbaffe1e260c6e5881a490c99c6a1e52a8a2f3f6fb10e?s=128',
                    },
                    url: 'https://observablehq.com/@d3/gallery',
                },
                {
                    name: 'echarts',
                    def: '一个基于 JavaScript 的开源可视化图表库',
                    logo: {
                        type: 'png',
                        url: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/logo.png?_v_=20200710_1',
                    },
                    url: 'https://echarts.apache.org/zh/index.html',
                },
            ],
        },
        {
            name: '路由导航',
            list: [
                {
                    name: 'React-Navigation',
                    def: 'React Native中应用的路由和导航',
                    major: true,
                    logo: {
                        type: 'svg',
                        url: 'https://reactnavigation.org/img/spiro.svg',
                    },
                    url: 'https://reactnavigation.org',
                    website: [
                        {
                            title: 'React-Navigation中文网',
                            url: 'https://www.reactnavigation.org.cn/docs/guide-intro',
                        },
                    ],
                },
                {
                    name: 'React-Native-Swiper',
                    def: '适用于React Native的Swiper组件',
                    // logo: 'https://ahooks.js.org/logo.svg',
                    url: 'https://github.com/leecade/react-native-swiper#installation',
                    website: [
                        // {
                        //     title: 'React-Navigation中文网',
                        //     url: 'https://www.reactnavigation.org.cn/docs/guide-intro',
                        // },
                    ],
                },
                {
                    name: 'React-Native-Tab-View',
                    def: '用于React Native的跨平台Tab组件',
                    logo: {
                        type: 'jpg',
                        full: true,
                        url: 'https://d1wp6m56sqw74a.cloudfront.net/~assets/8c5bf6c47149bcc9550601ac917f81b5',
                    },
                    url: 'https://github.com/satya164/react-native-tab-view',
                },
                {
                    name: 'React-Native-Scrollable-Tab-View',
                    def: '这是React Native纯JS实现导航',
                    // logo: {
                    //   type: 'svg',
                    //   url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    // },
                    url: 'https://github.com/ptomasroos/react-native-scrollable-tab-view',
                },
            ],
        },
        {
            name: '测试',
            list: [
                jest,
            ],
        },
        {
            name: '工程化',
            list: [
                Webpack,
                Yarn,
                {
                    name: 'Babel',
                    def: '一个 JavaScript 编译器',
                    major: true,
                    logo: {
                        type: 'png',
                        url: 'https://www.babeljs.cn/img/babel.png',
                    },
                    url: 'https://www.babeljs.cn/',
                },
                {
                    name: 'eslint',
                    def: '查找并修复JavaScript代码中的问题',
                    logo: {
                        type: 'svg',
                        url: 'https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg',
                    },
                    url: 'https://eslint.org/',
                },
                {
                    name: 'gulp',
                    def: '用自动化构建工具增强你的工作流程',
                    major: false,
                    ftStep: SkillStep.flag,
                    step: SkillStep.good,
                    logo: {
                        type: 'svg',
                        url: 'https://www.gulpjs.com.cn/img/gulp-white-text.svg',
                        bg: '#EEE',
                    },
                    url: 'https://www.gulpjs.com.cn/',
                },
            ],
        },
        {
            name: 'UI组件',
            list: [
                AntDesign,
                {
                    name: 'React-native-blur',
                    def: '一种模糊的毛玻璃效果',
                    // logo: {
                    //   type: 'svg',
                    //   url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    // },
                    url: 'https://github.com/Kureev/react-native-blur',
                },
                {
                    name: 'React-native-syntax-highlighter',
                    def: 'RN的代码高亮组件',
                    // logo: {
                    //   type: 'svg',
                    //   url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    // },
                    url: 'https://github.com/conorhastings/react-native-syntax-highlighter',
                },

                {
                    name: 'React-native-actionsheet',
                    def: '该组件实现了自定义ActionSheet',
                    major: true,
                    platform: SkillPlatform.reactNative,
                    url: 'https://github.com/beefe/react-native-actionsheet',
                },

                {
                    name: 'React-json-view',
                    def: '用于显示和编辑javascript数组和JSON对象',
                    platform: SkillPlatform.react,
                    url: 'https://github.com/mac-s-g/react-json-view',
                },

                {
                    name: 'React-native-json-tree',
                    def: '基于react-json-tree的React Native JSON Viewer组件',
                    major: true,
                    platform: SkillPlatform.reactNative,
                    url: 'https://github.com/mac-s-g/react-json-view',
                },

                {
                    name: 'React-native-root-toast',
                    def: 'React Native的toast组件',
                    major: true,
                    platform: SkillPlatform.reactNative,
                    url: 'https://github.com/magicismight/react-native-root-toast',
                },

                {
                    name: 'react-native-easy-toast',
                    def: 'React Native的toast组件',
                    platform: SkillPlatform.reactNative,
                    url: 'https://github.com/crazycodeboy/react-native-easy-toast',
                },

                {
                    name: 'statsjs',
                    def: '帮助您监视代码性能',
                    // 目标阶段
                    ftStep: SkillStep.good,
                    // 当前阶段
                    step: SkillStep.flag,
                    platform: SkillPlatform.react,
                    url: 'https://www.npmjs.com/package/stats-js',
                },

                {
                    name: 'react-native-splash-screen',
                    def: '控制启动页显示和隐藏, 处理启动白屏问题',
                    platform: SkillPlatform.reactNative,
                    url: 'https://github.com/crazycodeboy/react-native-splash-screen',
                },

            ],
        },
        {
            name: '集成框架',
            list: [
                {
                    name: 'Ant Design Pro',
                    def: '企业级中后台前端/设计解决方案',
                    major: true,
                    platform: SkillPlatform.react,
                    logo: {
                        type: 'svg',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    },
                    url: 'https://beta-pro.ant.design/docs/introduction-cn',
                },
            ],
        },
        {
            name: '动画',
            list: [
                {
                    name: 'Ant Motion',
                    def: '快速在 React 框架中使用动画',
                    major: true,
                    platform: SkillPlatform.react,
                    logo: {
                        type: 'svg',
                        url: 'https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg',
                    },
                    url: 'https://motion.ant.design/index-cn',
                },
            ],
        },

        {
            name: '辅助开发',
            list: [
                {
                    name: 'TinyPNG',
                    def: '智能PNG和JPEG压缩',
                    major: true,
                    platform: SkillPlatform.react,
                    // 目标阶段
                    ftStep: SkillStep.flag,
                    // 当前阶段
                    step: SkillStep.good,
                    // logo: {
                    //     type: 'svg',
                    //     url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    // },
                    url: 'https://tinypng.com/',
                },
                {
                    name: 'uupoop',
                    def: '在线PS,轻松编辑你的图片',
                    major: true,
                    // 目标阶段
                    ftStep: SkillStep.flag,
                    // 当前阶段
                    step: SkillStep.good,
                    platform: SkillPlatform.react,
                    // logo: {
                    //     type: 'svg',
                    //     url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    // },
                    url: 'https://www.uupoop.com/#/',
                },
                {
                    name: 'pushy',
                    def: 'ReactNative 热更新',
                    major: true,
                    ftStep: SkillStep.flag,
                    step: SkillStep.good,
                    platform: SkillPlatform.reactNative,
                    // logo: {
                    //     type: 'svg',
                    //     url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    // },
                    url: 'https://pushy.reactnative.cn/',
                },
                {
                    name: 'react-native-debugger',
                    def: 'ReactNative调试工具',
                    major: true,
                    ftStep: SkillStep.flag,
                    step: SkillStep.good,
                    platform: SkillPlatform.reactNative,
                    // logo: {
                    //     type: 'svg',
                    //     url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    // },
                    url: 'https://github.com/jhen0409/react-native-debugger',
                },

            ],
        },
    ],
}


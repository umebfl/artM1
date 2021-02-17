import { SkillPlatform, SkillUnit, } from '../../../variable'

import jest from './jest'
import react from './react'
import typeScript from './typeScript'

export default {
    name: '前端',
    list: [
        {
            name: '语言',
            list: [
                {
                    name: 'JavaScript',
                    def: '一种解释型或即时编译型的编程语言',
                    major: true,
                    logo: {
                      type: 'jpg',
                      url: 'https://bkimg.cdn.bcebos.com/pic/9922720e0cf3d7ca7bcb5f6d2155a9096b63f62403df?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
                    },
                    url: 'https://www.w3school.com.cn/js/index.asp',
                    // 文档列表
                    doc: [
                
                    ],
                    // 特性列表 - demo
                    features: [
                
                    ],
                },
                typeScript,
                {
                    name: 'Swift',
                    def: '一种功能强大且直观的编程语言',
                    logo: {
                      type: 'jpg',
                      url: 'https://static.oschina.net/uploads/logo/swift-lang_ABKjp.png',
                    },
                    url: 'https://developer.apple.com/swift/',
                    // 文档列表
                    doc: [
                
                    ],
                    // 特性列表 - demo
                    features: [
                
                    ],
                },
                {
                    name: 'Dart',
                    def: '一个为全平台构建快速应用的编程语言',
                    logo: {
                      type: 'png',
                      url: 'https://dartpad.cn/dart-192.png',
                    },
                    url: 'https://dart.cn/',
                    // 文档列表
                    doc: [
                
                    ],
                    // 特性列表 - demo
                    features: [
                
                    ],
                },
                {
                    name: 'Html',
                    def: '超文本标记语言',
                    logo: {
                      type: 'jpg',
                      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.0574nb.cn%2FUploadImg%2Fnews%2F1429244091.jpg&refer=http%3A%2F%2Fwww.0574nb.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612878791&t=0b8239772e21f05663d2d865c836041a',
                    },
                    url: 'https://www.w3school.com.cn/html5/index.asp',
                    // 文档列表
                    doc: [
                
                    ],
                    // 特性列表 - demo
                    features: [
                
                    ],
                },
                {
                    name: 'Less',
                    def: '一门向后兼容的 CSS 扩展语言',
                    logo: {
                      type: 'jpg',
                      url: 'https://less.bootcss.com/public/img/less_logo.png',
                    },
                    url: 'https://less.bootcss.com/#%E6%A6%82%E8%A7%88',
                    // 文档列表
                    doc: [
                
                    ],
                    // 特性列表 - demo
                    features: [
                
                    ],
                },
                {
                    name: 'css',
                    def: '控制网页的样式和布局',
                    major: true,
                    logo: {
                      type: 'jpg',
                      url: 'https://bkimg.cdn.bcebos.com/pic/279759ee3d6d55fbe2fea0a66f224f4a20a4dd72?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
                    },
                    url: 'https://www.runoob.com/css/css-intro.html',
                },                
            ],
        },
        {
            name: '视图',
            list: [
                react,
                {
                    name: 'React-native',
                    def: '使用React和应用平台的原生功能来构建 Android 和 iOS 应用的开源框架',
                    major: true,
                    logo: {
                      type: 'svg',
                      url: 'https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/img/header_logo.svg',
                    },
                    url: 'https://www.react-native.cn/docs/intro-react-native-components',
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
                },
            ],
        },
        {
            name: '数据',
            list: [
                {
                    name: 'Ramda',
                    def: '实用的 JavaScript 函数式编程库',
                    major: true,
                    logo: {
                      type: 'png',
                      url: 'http://www.ruanyifeng.com/blogimg/asset/2017/bg2017030901.jpg',
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
                },
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
                    name: 'webpack',
                    def: '用于现代 JavaScript 应用程序的_静态模块打包工具',
                    major: true,
                    logo: {
                        type: 'png',
                        url: 'https://www.webpackjs.com/32dc115fbfd1340f919f0234725c6fb4.png',
                    },
                    url: 'https://webpack.docschina.org/',
                },
                {
                    name: 'yarn',
                    def: '快速、可靠、安全的依赖管理工具',
                    logo: {
                        type: 'png',
                        url: 'https://static.oschina.net/uploads/logo/yarn-js_rSKLj.png',
                    },
                    url: 'https://www.yarnpkg.cn/',
                },
                {
                    name: 'gulp',
                    def: '用自动化构建工具增强你的工作流程',
                    major: false,
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
            name: 'UI组件',
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
                    platform: SkillPlatform.reactNative,
                    url: 'https://github.com/mac-s-g/react-json-view',
                },

                {
                    name: 'React-native-root-toast',
                    def: 'React Native的toast组件',
                    platform: SkillPlatform.reactNative,
                    url: 'https://github.com/magicismight/react-native-root-toast',
                },
                
            ],
        },
    ],
}
export default {
    name: 'React-native',
    def: '使用React和应用平台的原生功能来构建 Android 和 iOS 应用的开源框架',
    version: '0.63',
    major: true,
    logo: {
        type: 'svg',
        url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
    
        // type: 'jpg',
        // url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2397649907,2993998491&fm=26&gp=0.jpg',
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

        {
            title: '开发指南',
            def: '常见场景处理',
            list: [
                {
                    title: '正式发布',
                    def: '常见场景处理',
                    url: 'https://www.react-native.cn/docs/publishing-to-app-store',
                    jump: 'detailLv2',
                    features: [
                        {
                            title: '正式发布',
                            list: [
                                {
                                    title: '上架App Store',
                                    def: '上架应用的过程和任何其它原生 iOS 应用一样，但有一些额外的注意事项要考虑',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/publishing-to-app-store',
                                    code:
                                        `
1. Enable App Transport Security
2. 配置 release scheme
3. 关于启动屏的优化技巧
4. 编译发布 app
                        `,
                                },

                                {
                                    title: '热更新',
                                    def: '极速热更新框架 for React Native',
                                    jump: 'code',
                                    url: 'https://pushy.reactnative.cn/',
                                    code:
                                        `
$ pushy login
email: <输入你的注册邮箱>
password: <输入你的密码>

$ pushy createApp --platform ios
App Name: <输入应用名字>
$ pushy createApp --platform android
App Name: <输入应用名字>

$ pushy selectApp --platform ios
1) 鱼多多(ios)
2) 招财旺(ios)

Total 2 ios apps
Enter appId: <输入应用前面的编号>

//
Xcode 中运行设备选真机或 Generic iOS Device
菜单中选择 Product - Archive
Archive 完成后选择Export生成.ipa 文件，此时建议取消 bitcode 选项以减少 ipa 大小
然后运行如下命令上传到 pushy 服务器以供后续版本比对之用
$ pushy uploadIpa <your-package.ipa>

                        `,
                                },
                            ],
                        },
                    ],
                },

                {
                    title: '链接原生库',
                    def: '根据自己的需求添加需要的特性',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/linking-libraries-ios',
                    code: `
自动链接
    npm install 某个带有原生依赖的库
    npx react-native link
    如果只需要链接某一个库：
    react-native link 某已安装的具体库名


手动链接
                    `,
                  },

                  {
                    title: '在iOS模拟器上运行',
                    def: '启动模拟器',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/running-on-simulator-ios#%E5%90%AF%E5%8A%A8%E6%A8%A1%E6%8B%9F%E5%99%A8',
                    code: `
启动模拟器
npx react-native run-ios

指定模拟的设备类型
npx react-native run-ios --simulator "iPhone 4s"
查看具体可用的设备名称
xcrun simctl list devices

                    `,
                  },

                  {
                    title: '和原生端通信',
                    def: '启动模拟器',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/communication-ios',
                    code: `

                    `,
                  },

                  {
                    title: 'iOS应用扩展',
                    def: '在主应用程序之外提供自定义功能和内容',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/app-extensions',
                    code: `

                    `,
                  },

                  {
                    title: '直接操作节点更新',
                    def: '有时候我们需要直接改动组件并触发局部的刷新，但不使用 state 或是 props',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/direct-manipulation',
                    explain: [
                        '什么时候使用 setNativeProps 呢？在（不得不）频繁刷新而又遇到了性能瓶颈的时候。',
                        '在 React Native 中，setNativeProps就是等价于直接操作 DOM 节点的方法',
                        '直接操作组件并不是应该经常使用的工具。一般来说只是用来创建连续的动画，同时避免渲染组件结构和同步太多视图变化所带来的大量开销。',
                    ],
                    code: `
setOpacityTo(value) {
    // Redacted: animation related code
    this.refs[CHILD_REF].setNativeProps({
      opacity: value
    });
  },
                    `,
                  },

                  {
                    title: '访问网络',
                    def: '从远程地址中获取数据或资源',
                    jump: 'code',
                    explain: [
                        'React Native 提供了和 web 标准一致的Fetch API，用于满足开发者访问网络的需求',
                    ],
                    url: 'https://www.react-native.cn/docs/network',
                    code: `
fetch("https://mywebsite.com/endpoint/", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        firstParam: "yourValue",
        secondParam: "yourOtherValue",
    }),
    });


// 注意这个方法前面有async关键字
async function getMoviesFromApi() {
  try {
    // 注意这里的await语句，其所在的函数必须有async关键字声明
    let response = await fetch(
      "https://facebook.github.io/react-native/movies.json"
    );
    let responseJson = await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
}
                    `,
                  },

                  {
                    title: '网络安全策略',
                    def: '搭建一个完全无懈可击的软件是不可能的',
                    jump: 'detailLv2',
                    features: [
                        {
                            title: '基本',
                            list: [
                                {
                                    title: '保存敏感信息',
                                    def: '',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/security',
                                    code:
                                        `
                        `,
                                },

                                {
                                    title: 'Async Storage',
                                    def: '',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/security',
                                    code:
                                        `
                        `,
                                },

                                {
                                    title: 'Secure Storage',
                                    def: '',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/security',
                                    code:
                                        `
iOS - Keychain Services
                        `,
                                },

                                {
                                    title: 'Authentication and Deep Linking',
                                    def: '',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/security',
                                    code:
                                        `
                        `,
                                },

                                {
                                    title: 'OAuth2 and Redirects',
                                    def: '',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/security',
                                    code:
                                        `
                        `,
                                },

                                {
                                    title: 'SSL加密',
                                    def: '',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/security',
                                    code:
                                        `
                        `,
                                },


                            ],
                        },
                    ],
                  },

                  {
                    title: 'iOS 原生模块',
                    def: '在主应用程序之外提供自定义功能和内容',
                    jump: 'code',
                    explain: [
                        '一个“原生模块”就是一个实现了“RCTBridgeModule”协议的 Objective-C 类',
                        '有时候 App 需要访问平台 API，但 React Native 可能还没有相应的模块封装；或者你需要复用 Objective-C、Swift 或 C++代码，而不是用 JavaScript 重新实现一遍；又或者你需要实现某些高性能、多线程的代码，譬如图片处理、数据库、或者各种高级扩展等等。',
                    ],
                    url: 'https://www.react-native.cn/docs/native-modules-ios',
                    code: `

                    `,
                  },

                  {
                    title: 'JavaScript环境',
                    def: '-',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/javascript-environment',
                    code: `
// JavaScript运行时环境
大多数情况下，React Native使用的是JavaScriptCore，也就是Safari所使用的JavaScript引擎。但是在iOS上JavaScriptCore并没有使用即时编译技术（JIT），因为在iOS中应用无权拥有可写写入的内存页（因此无法动态生成代码）。
在使用Chrome调试时，所有的JavaScript代码都运行在Chrome中，并通过WebSocket与原生代码通信。此时的运行环境是V8引擎。

// JavaScript语法转换器
React Native内置了Babel转换器。您可以查看Babel的文档来了解有关它可以转换的语法的详情。
                    `,
                  },

                  {
                    title: '定时器',
                    def: 'React Native实现了和浏览器一致的计时器Timer。',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/timers',
                    explain: [
                        '务必在卸载组件前清除定时器',
                    ],
                    code: `
setTimeout，clearTimeout
setInterval，clearInterval
setImmediate，clearImmediate
requestAnimationFrame，cancelAnimationFrame

requestAnimationFrame（）：用于执行在内部内部控制视图动画的代码
setImmediate / setTimeout / setInterval（）：在稍后执行代码。
runAfterInteractions（）：在以后执行代码，不会延迟当前进行的动画。
                    `,
                  },

                  {
                    title: 'iOS 原生UI组件',
                    def: '在 React Naitve 应用程序中封装和植入已有的组件',
                    jump: 'code',
                    url: 'https://www.react-native.cn/docs/native-components-ios',
                    code: `
// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view
{
    return [[MKMapView alloc] init];
}

@end

//


// MapView.js

import { requireNativeComponent } from 'react-native';

// requireNativeComponent 自动把'RNTMap'解析为'RNTMapManager'
export default requireNativeComponent('RNTMap');

// MyApp.js

import MapView from './MapView.js';

...

render() {
    return <MapView style={{ flex: 1 }} />;
}
                    `,
                  },
            ],
        },

        {
            title: '性能调优',
            def: '',
            list: [
                {
                    title: '性能总结',
                    def: '使用React Native替代基于WebView的框架来开发App的一个强大的理由，就是为了使App可以达到每秒60帧（足够流畅），并且能有类似原生App的外观和手感',
                    url: 'https://www.react-native.cn/docs/performance',
                    jump: 'detailLv2',
                    features: [
                        {
                            title: '基本',
                            list: [
                                {
                                    title: '关于“帧”你所需要知道的',
                                    def: 'iOS设备提供了每秒60帧率，由此留给了开发者和UI系统大约16.67ms来完成生成一张静态图片（帧）所需要的所有工作',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/performance',
                                    code: ``,
                                },

                                {
                                    title: 'JS帧率（JavaScript线程）',
                                    def: '这是React应用所在的线程，也是发生API调用，以及处理触摸事件等操作的线程。',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/performance',
                                    code: ``,
                                },

                                {
                                    title: 'UI帧率（主线程）',
                                    def: 'NavigatorIOS的性能要比老的纯JS的实现Navigator好的多。原因就是它的切换动画是完全在主线程上执行的，因此不会被的JavaScript线程上的掉帧所影响',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/performance',
                                    code: ``,
                                },
                                {
                                    title: '性能问题的常见原因',
                                    def: '-',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/performance',
                                    code: ``,
                                },
                            ],
                        },
                    ],
                },
            ],
        },


        {
            title: '交互',
            def: '一些内置的核心组件',
            list: [
                {
                    title: '动画',
                    def: '流畅、有意义的动画对于移动应用用户体验来说是非常重要的',
                    url: 'https://www.react-native.cn/docs/animations',
                    jump: 'detailLv2',
                    features: [
                        {
                            title: '基本',
                            list: [
                                {
                                    title: 'Animated',
                                    def: '用于创建精细的交互控制的动画',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/animations',
                                    code:
                                        `
import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const FadeInView = (props) => {
const fadeAnim = useRef(new Animated.Value(0)).current  // 透明度初始值设为0

React.useEffect(() => {
Animated.timing(                  // 随时间变化而执行动画
fadeAnim,                       // 动画中的变量值
{
toValue: 1,                   // 透明度最终变为1，即完全不透明
duration: 10000,              // 让动画持续一段时间
}
).start();                        // 开始执行动画
}, [fadeAnim])

return (
<Animated.View                 // 使用专门的可动画化的View组件
style={{
...props.style,
opacity: fadeAnim,         // 将透明度绑定到动画变量值
}}
>
{props.children}
</Animated.View>
);
}

// 然后你就可以在组件中像使用View那样去使用FadeInView了
export default () => {
return (
<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
<FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
<Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
</FadeInView>
</View>
)
}
                        `,
                                },

                                {
                                    title: '配置动画',
                                    def: 'easing 函数、延迟、持续时间、衰减系数、弹性常数等',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/animations',
                                    code:
                                        `
Animated.timing(this.state.xPosition, {
toValue: 100,
easing: Easing.back(),
duration: 2000
}).start();
                    `,
                                },

                                {
                                    title: '组合动画',
                                    def: '多个动画可以通过parallel（同时执行）、sequence（顺序执行)等',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/animations',
                                    code:
                                        `
Animated.sequence([
// decay, then spring to start and twirl
Animated.decay(position, {
// coast to a stop
velocity: { x: gestureState.vx, y: gestureState.vy }, // velocity from gesture release
deceleration: 0.997
}),
Animated.parallel([
// after decay, in parallel:
Animated.spring(position, {
toValue: { x: 0, y: 0 } // return to start
}),
Animated.timing(twirl, {
// and twirl
toValue: 360
})
])
]).start(); // start the sequence group
                    `,
                                },
                            ],
                        },
                    ],
                },
                {
                    title: '处理触摸事件',
                    def: '移动应用上的用户交互基本靠“摸”',
                    url: 'https://www.react-native.cn/docs/handling-touches',
                    jump: 'detailLv2',
                    features: [
                        {
                            title: 'Button',
                            def: '通过按钮组件提供触控响应',
                            list: [
                                {
                                    title: 'Button',
                                    def: '通过按钮组件提供触控响应',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/handling-touches',
                                    code: `
<Button
onPress={this._onPressButton}
title="Press Me"
/>
                    `,
                                },
                            ],
                        },

                        {
                            title: 'Touchable',
                            def: '通过Touchable定制自己所需要的按钮',
                            list: [
                                {
                                    title: 'TouchableHighlight',
                                    def: '注意此组件的背景会在用户手指按下时变暗',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/touchablehighlight',
                                    code: `
<TouchableHighlight
activeOpacity={0.6}
underlayColor="#DDDDDD"
onPress={() => alert("Pressed!")}
>
                    `,
                                },

                                {
                                    title: 'TouchableOpacity',
                                    def: '封装的视图的不透明度会降低',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/touchablehighlight',
                                    code: `
<TouchableOpacity
style={styles.button}
onPress={this.onPress}
>
<Text>Press Here</Text>
</TouchableOpacity>
                    `,
                                },

                                {
                                    title: 'TouchableWithoutFeedback',
                                    def: '本组件没有任何视觉反馈',
                                    jump: 'code',
                                    url: 'https://www.react-native.cn/docs/touchablewithoutfeedback',
                                    code: `
<TouchableWithoutFeedback onPress={onPress}>
<View style={styles.button}>
    <Text>Touch Here</Text>
</View>
</TouchableWithoutFeedback>
                    `,
                                },
                            ],
                        },
                    ],
                }
            ],
        },
    ],
}
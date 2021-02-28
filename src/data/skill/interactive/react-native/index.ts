export default {
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
    features: [{
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
}],
}
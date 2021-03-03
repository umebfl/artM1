import { SkillPlatform, SkillUnit, SkillStep, SKillJumpToURI, } from '../../../../variable'

const AntDesign: SkillUnit = {
    name: 'Ant Design',
    def: '基于 Ant Design 设计体系的 React UI 组件库',
    major: true,
    platform: SkillPlatform.react,
    version: '4.1.2',
    logo: {
        type: 'jpg',
        full: true,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FrQO8ekDyWcz7eKQhnCZyQRicibU3ia5PibYiaYXGNyVIiaI5fjAaMePkVniaA7VURty1VNBx4qNIC95KUtpiaUzgB3B9GA%2F640%3Fwx_fmt%3Dpng&refer=http%3A%2F%2Fmmbiz.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617255092&t=f11e2630fcfe8853da16447e37a8cd8f',
    },
    url: 'https://ant.design/docs/react/introduce-cn',
    ftStep: SkillStep.well,
    step: 20,

    features: [
        {
            title: '开始使用',
            def: '',
            list: [
                {
                    title: '概要',
                    def: '基本理念及优点',
                    jump: SKillJumpToURI.code,
                    url: 'https://ant.design/docs/react/getting-started-cn',
                    explain: [
                        '主要用于研发企业级中后台产品',
                        '提炼自企业级中后台产品的交互语言和视觉风格',
                        '开箱即用的高质量 React 组件',
                        '使用 TypeScript 开发，提供完整的类型定义文件',
                        '全链路开发和设计工具体系。',
                        '数十个国际化语言支持。',
                        '深入每个细节的主题定制能力。',
                    ],
                },

                {
                    title: '兼容浏览器',
                    def: '基本理念及优点',
                    jump: SKillJumpToURI.code,
                    url: 'https://ant.design/docs/react/getting-started-cn',
                    explain: [`
现代浏览器和 IE11（需要 polyfills）。
支持服务端渲染。
Electron
`,
                    ],
                },

                {
                    title: '快速上手',
                    def: '一个例子',
                    jump: SKillJumpToURI.code,
                    url: 'https://ant.design/docs/react/getting-started-cn',
                    code: [`
import React, { useState } from 'react';
import { render } from 'react-dom';
import { ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';

moment.locale('zh-cn');

const App = () => {
    const [date, setDate] = useState(null);
    const handleChange = value => {
    message.info(\`您选择的日期是: \${value ? value.format('YYYY年MM月DD日') : '未选择'}\`);
    setDate(value);
    };
    return (
    <ConfigProvider locale={zhCN}>
        <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
            当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}
        </div>
        </div>
    </ConfigProvider>
    );
};

render(<App />, document.getElementById('root'));
`,
                    ],
                },


            ],
        },

        {
            title: '组件',
            def: 'antd 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践',
            list: [
                {
                    title: '通用',
                    def: '基础类型组件合集',
                    jump: SKillJumpToURI.detailLv2,
                    features: [
                        {
                            title: '',
                            list: [
                                {
                                    title: 'Button',
                                    def: '按钮用于开始一个即时操作。',
                                    jump: SKillJumpToURI.code,
                                    url: 'https://ant.design/components/button-cn/',
                                    explain: [
                                        '何时使用',
                                        '代码演示',
                                        'API',
                                    ],
                                    code: [
`
在 Ant Design 中我们提供了五种按钮。

主按钮：用于主行动点，一个操作区域只能有一个主按钮。

默认按钮：用于没有主次之分的一组行动点。

虚线按钮：常用于添加操作。

文本按钮：用于最次级的行动点。

链接按钮：用于作为外链的行动点。

以及四种状态属性与上面配合使用。

危险：删除/移动/修改权限等危险操作，一般需要二次确认。

幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。

禁用：行动点不可用的时候，一般需要文案解释。

加载中：用于异步操作等待反馈的时候，也可以避免多次提交。
`,

                                        `<Button type="primary">Primary Button</Button>`,

                                    ],
                                },
                                {
                                    title: 'Icon',
                                    def: '语义化的矢量图形',
                                    jump: SKillJumpToURI.code,
                                    url: 'https://ant.design/components/icon-cn/',
                                    explain: [
                                        '使用图标组件，你需要安装 @ant-design/icons 图标组件包: npm install --save @ant-design/icons',
                                        '图标列表',
                                        '代码演示',
                                        'API',
                                        '关于 SVG 图标',
                                        '双色图标主色',
                                        '自定义 font 图标',
                                        '自定义 SVG 图标',
                                    ],
                                    code: [
`import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

<StarOutlined />
<StarFilled />
<StarTwoTone twoToneColor="#eb2f96" />`,

                                    ],
                                },
                            ]
                        },
                    ],
                },
            ],
        },

    ],
}

export default AntDesign
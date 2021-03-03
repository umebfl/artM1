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

                                {
                                    title: 'Typography',
                                    def: '文本的基本格式排版。',
                                    jump: SKillJumpToURI.code,
                                    url: 'https://ant.design/components/icon-cn/',
                                    explain: [
                                        '何时使用',
                                        '代码演示',
                                        '介绍',
                                        '设计资源',
                                        'API',
                                        'FAQ',
                                    ],
                                    code: [
`import { Typography } from 'antd';

const { Title } = Typography;

ReactDOM.render(
  <>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>
  </>,
  mountNode,
);`,

`
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

ReactDOM.render(
  <Space direction="vertical">
    <Text>Ant Design (default)</Text>
    <Text type="secondary">Ant Design (secondary)</Text>
    <Text type="success">Ant Design (success)</Text>
    <Text type="warning">Ant Design (warning)</Text>
    <Text type="danger">Ant Design (danger)</Text>
    <Text disabled>Ant Design (disabled)</Text>
    <Text mark>Ant Design (mark)</Text>
    <Text code>Ant Design (code)</Text>
    <Text keyboard>Ant Design (keyboard)</Text>
    <Text underline>Ant Design (underline)</Text>
    <Text delete>Ant Design (delete)</Text>
    <Text strong>Ant Design (strong)</Text>
    <Link href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link>
  </Space>,
  mountNode,
);
`,

`
import React, { useState } from 'react';
import { Typography } from 'antd';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Paragraph } = Typography;

const Demo: React.FC = () => {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [customIconStr, setCustomIconStr] = useState('Custom Edit icon and replace tooltip text.');
  const [hideTooltipStr, setHideTooltipStr] = useState('Hide Edit tooltip.');
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    'This is an editable text with limited length.',
  );

  return (
    <>
      <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined />,
          tooltip: 'click to edit text',
          onChange: setCustomIconStr,
        }}
      >
        {customIconStr}
      </Paragraph>
      <Paragraph editable={{ tooltip: false, onChange: setHideTooltipStr }}>
        {hideTooltipStr}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: setLengthLimitedStr,
          maxLength: 50,
          autoSize: { maxRows: 5, minRows: 3 },
        }}
      >
        {lengthLimitedStr}
      </Paragraph>
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Paragraph>
      <Paragraph
        copyable={{
          icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />],
          tooltips: ['click here', 'you clicked!!'],
        }}
      >
        Custom Copy icon and replace tooltips text.
      </Paragraph>
      <Paragraph copyable={{ tooltips: false }}>Hide Copy tooltips.</Paragraph>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
`,
`
import { Typography, Switch } from 'antd';

const { Paragraph, Text } = Typography;

const Demo = () => {
  const [ellipsis, setEllipsis] = React.useState(true);

  return (
    <>
      <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
      />

      <Paragraph ellipsis={ellipsis}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>

      <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>

      <Text
        style={ellipsis ? { width: 100 } : undefined}
        ellipsis={ellipsis ? { tooltip: 'I am ellipsis now!' } : false}
      >
        Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Text>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
`,
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
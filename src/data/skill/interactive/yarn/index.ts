
import { SkillPlatform, SkillUnit, SkillStep, } from '../../../../variable'

export default {
    name: 'Yarn',
    def: '快速、可靠、安全的依赖管理工具',
    version: '2',
    major: true,
    ftStep: SkillStep.overview,
    step: 100,
    logo: {
        type: 'png',
        full: true,
        url: 'https://static.oschina.net/uploads/logo/yarn-js_rSKLj.png',
    },
    url: 'https://www.yarnpkg.cn/',
    // 文档列表
    article: [
        {
            title: '教程',
            list: [
                {
                    title: 'yarn、npm、cnpm三者如何优雅的在一起使用 ？',
                    def: 'yarn与npm的区别',
                    url: 'https://segmentfault.com/a/1190000019299845',
                    jump: 'webview',
                },
            ],
        },
    ],
    features: [
        {
            title: '基础',
            def: '-',
            list: [
                {
                    title: '使用',
                    def: 'yarn init',
                    jump: 'code',
                    code: `
// 初始化一个新项目
yarn init

// 添加依赖包
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

// 分别添加到 devDependencies、peerDependencies 和 optionalDependencies 类别
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional

// 升级依赖包
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

// 移除依赖包
yarn remove [package]

// 安装项目的全部依赖
yarn install
              `,
                },


                {
                    title: '配置',
                    def: 'package.json各项配置',
                    jump: 'code',
                    url: 'https://yarn.bootcss.com/docs/package-json/',
                    code: `
              `,
                },

                {
                    title: '固化依赖',
                    def: 'yarn.lock 文件来确保依赖解析时又快又稳定',
                    jump: 'code',
                    url: 'https://yarn.bootcss.com/docs/configuration/',
                    explain: [
                        '你无须碰这个文件，yarn 会报关这个文件并在管理依赖项时修改这个文件。',
                        '为了保证你应用的行为保持一致，你应该把 yarn.lock 文件提交到代码仓库中。',
                    ],
                    code: ``,
                },
            ],
        },
    ],
}
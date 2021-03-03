import { SkillPlatform, SkillUnit, SkillStep, SKillJumpToURI, } from '../../../variable'


export default {
    name: '基础',
    list: [
        {
            name: '网络',
            list: [
                {
                    name: 'HTTP',
                    def: '一个基于TCP/IP通信协议来传递数据',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://tse1-mm.cn.bing.net/th/id/OIP.lc-6FOUQnY6V-79dt3FdpgHaD_?pid=ImgDet&rs=1',
                    },
                    url: 'https://www.runoob.com/http/http-tutorial.html',
                },
                {
                    name: 'TCP',
                    def: '面向连接的、可靠的、基于字节流的传输层通信协议',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fftp.chinafix.com%2Fportal%2F201711%2F20%2F092900iii5p55lrfngiliy.jpg&refer=http%3A%2F%2Fftp.chinafix.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617274553&t=ab472e17b2950f7218edc83dea14e018',
                    },
                    url: 'https://www.runoob.com/tcpip/tcpip-tutorial.html',
                },
                {
                    name: 'UDP',
                    def: '一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3861921816,2794589959&fm=26&gp=0.jpg',
                    },
                    url: '',
                },
            ],
        },
        {
            name: '安全',
            list: [
                {
                    name: '跨域',
                    def: '现代浏览器所通用的"同源策略"',
                    major: false,
                    platform: SkillPlatform.web,
                    logo: {
                      type: 'icon',
                      url: 'repeat-off',
                    },
                    url: 'https://www.cnblogs.com/liubingyjui/p/10804785.html',
                },
                {
                    name: '常见前端网络攻击',
                    def: 'XSS, CSRF, 点击劫持攻击防御等',
                    major: false,
                    platform: SkillPlatform.web,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://tse1-mm.cn.bing.net/th/id/OIP.b_YutsV4U7BKA-s4A40T4AAAAA?pid=ImgDet&rs=1',
                    },
                    url: 'https://www.cnblogs.com/liubingyjui/p/10804785.html',
                },
            ],
        },
        {
            name: '操作系统',
            list: [
                {
                    name: 'linux',
                    def: '一种自由和开放源码的类 UNIX 操作系统',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://th.bing.com/th/id/Rf57bbb6295ffade226d015f4850937e8?rik=xTV1rU3CW4k2xg&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f03%2fColor-of-the-Linux-Logo.jpg&ehk=Hii7pvgOcDq2g41%2b9D%2bfbEoQqCN%2bTmPuB%2b9mujPkcnk%3d&risl=&pid=ImgRaw',
                    },
                    url: 'https://www.runoob.com/linux/linux-tutorial.html',
                },

                {
                    name: 'macOS',
                    def: '基于XNU混合内核的图形化操作系统',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1403754502,2928659230&fm=15&gp=0.jpg',
                    },
                    url: 'https://support.apple.com/zh-cn/macos',
                },
            ],
        },
        {
            name: '脚本',
            list: [
                {
                    name: 'shell',
                    def: '一种为 shell 编写的脚本程序',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.tuicool.com%2FymyyyqV.jpg%21web&refer=http%3A%2F%2Fimg2.tuicool.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617275886&t=0d7535f81586093ce0d5d1e98c055ab2',
                    },
                    url: 'https://www.runoob.com/linux/linux-shell.html',
                },
                {
                    name: 'linux命令行',
                    def: 'linux命令行常用命令',
                    major: false,
                    platform: SkillPlatform.all,
                    // logo: {
                    //   type: 'icon',
                    //   url: 'security',
                    // },
                    url: 'https://www.runoob.com/linux/linux-command-manual.html',
                },
            ],
        },
        {
            name: '编程范式',
            list: [
                {
                    name: '函数式编程',
                    def: '一种编程范式',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.music.126.net%2FvbGh8tpNUIiXr6xqzJemiQ%3D%3D%2F109951163373186733.jpg&refer=http%3A%2F%2Fp2.music.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617275968&t=6a4673572731df4f888b1254befe0d32',
                    },
                    url: 'https://github.com/getify/Functional-Light-JS',
                },
            ],
        },
        {
            name: '数据',
            list: [
                {
                    name: '正则表达式',
                    def: '一种字符串匹配的模式',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'jpg',
                      full: true,
                      url: 'https://tse1-mm.cn.bing.net/th/id/OIP.cJ3K16wNAanyNzkLe9wJvQHaHa?pid=ImgDet&rs=1',
                    },
                    url: 'https://www.runoob.com/regexp/regexp-syntax.html',
                },
            ],
        },
        {
            name: '代码管理',
            list: [
                {
                    name: 'git',
                    def: '开源的分布式版本控制系统',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'png',
                        url: 'https://git-scm.com/images/logo@2x.png',
                    },
                    url: 'https://www.runoob.com/git/git-tutorial.html',
                },
            ],
        },
        {
            name: '项目管理',
            list: [
                {
                    name: 'JIRA',
                    def: '集项目计划、任务分配、需求管理、错误跟踪于一体',
                    major: true,
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'jpg',
                        full: true,
                        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3574637191,1493203823&fm=26&gp=0.jpg',
                    },
                    url: 'https://zhuanlan.zhihu.com/p/44837233',
                },
                {
                    name: 'Project',
                    def: '囊括项目管理各个阶段',
                    major: true,
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'jpg',
                        full: true,
                        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fvasilijegroup.com%2Fwp-content%2Fuploads%2F2014%2F06%2FMSProject-logo.png&refer=http%3A%2F%2Fvasilijegroup.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617075317&t=28890aac09b901f17dd715d74b13cc08',
                    },
                    url: 'https://blog.csdn.net/huangxinfeng/article/details/81194380',
                },
            ],
        },
        {
            name: '调试',
            list: [
                {
                    name: '浏览器调试',
                    def: '使用浏览器的调试工具',
                    major: true,
                    platform: SkillPlatform.all,
                    url: 'https://www.runoob.com/js/js-debugging.html',
                },

                {
                    name: 'ReactNative调试',
                    def: '使用ReactNative调试App',
                    major: true,
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'svg',
                        full: true,
                        url: 'https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/img/header_logo.svg',
                    },
                    url: 'https://reactnative.cn/docs/debugging',
                },
            ],
        },
        {
            name: '跟踪',
            list: [
                {
                    name: '日志埋点跟踪',
                    def: '通过分级日志输出跟踪信息',
                    major: true,
                    platform: SkillPlatform.all,
                    // logo: {
                    //     type: 'png',
                    //     url: 'https://git-scm.com/images/logo@2x.png',
                    // },
                    url: 'https://blog.csdn.net/u012852374/article/details/78134346/',
                },
                {
                    name: 'Google Analytics',
                    def: '了解和研究访问者的行为',
                    major: true,
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'svg',
                        full: true,
                        url: 'https://www.gstatic.cn/analytics-suite/header/suite/v2/ic_analytics.svg',
                    },
                    url: '',
                },
            ],
        },
        {
            name: '性能优化',
            list: [

            ],
        },
        {
            name: '交互设计',
            list: [
                {
                    name: 'Ant Design - 设计',
                    def: '专注于更好的用户体验',
                    major: true,
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'svg',
                        full: true,
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    },
                    url: 'https://ant.design/docs/spec/introduce-cn',
                },
            ],
        },
        {
            name: '面试',
            list: [

            ],
        },
        {
            name: '代码规范',
            list: [

            ],
        },
        {
            name: '算法',
            list: [

            ],
        },
        {
            name: '重构',
            list: [

            ],
        },
        {
            name: '技术选型',
            list: [

            ],
        },
        {
            name: '敏捷开发',
            list: [

            ],
        },
        {
            name: '编辑器',
            list: [

                {
                    name: 'VS Code',
                    def: '免费的。 建立在开源上。无处不在。',
                    major: true,
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'jpg',
                        full: true,
                        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3102802095,1274108669&fm=26&gp=0.jpg',
                    },
                    url: 'https://code.visualstudio.com/',
                    
                    features: [
                        {
                            title: '使用',
                            def: '',
                            list: [
                                {
                                    title: '折叠代码',
                                    def: '折叠代码快捷键使用',
                                    jump: SKillJumpToURI.code,
                                    url: 'https://www.cnblogs.com/eret9616/p/11607947.html',
                                    explain: [
                                        '设置 -> 快捷键设置 -> 输入fold -> 点击设置',
                                        '当前设置: 折叠: alt + 1-7 | 展开所有 alt + 0',
                                    ],
                                },
                            ],
                        },
                    ],
                },

                {
                    name: 'Atom',
                    def: 'github专门为程序员推出的一个跨平台文本编辑器',
                    platform: SkillPlatform.all,
                    logo: {
                        type: 'png',
                        full: true,
                        url: 'https://pics7.baidu.com/feed/0e2442a7d933c895127557994747e4f6830200a0.jpeg?token=dd60bf6a4a798e4e8c6bef785950a4d0',
                    },
                    url: 'https://atom-china.org/uploads/default/original/2X/2/28ab544a5cc952eda6e8c9860d8b86ee9d582af1.png',
                },
            ],
        },
    ],
}
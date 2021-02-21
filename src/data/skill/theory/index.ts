import { SkillPlatform, SkillUnit, } from '../../../variable'

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
                      type: 'icon',
                      url: 'web',
                    },
                    url: 'https://www.runoob.com/http/http-tutorial.html',
                },
                {
                    name: 'TCP',
                    def: '面向连接的、可靠的、基于字节流的传输层通信协议',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'icon',
                      url: 'battlenet',
                    },
                    url: 'https://www.runoob.com/tcpip/tcpip-tutorial.html',
                },
                {
                    name: 'UDP',
                    def: '一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'icon',
                      url: 'contactless-payment',
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
                      type: 'icon',
                      url: 'security',
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
                    // logo: {
                    //   type: 'icon',
                    //   url: 'security',
                    // },
                    url: 'https://www.runoob.com/linux/linux-tutorial.html',
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
                    // logo: {
                    //   type: 'icon',
                    //   url: 'security',
                    // },
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
                    // logo: {
                    //   type: 'png',
                    //   url: 'https://git-scm.com/images/logo@2x.png',
                    // },
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
                    // logo: {
                    //   type: 'png',
                    //   url: 'https://git-scm.com/images/logo@2x.png',
                    // },
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
            name: '项目管理',
            list: [

            ],
        },
    ],
}
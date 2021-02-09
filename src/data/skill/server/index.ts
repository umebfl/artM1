import { SkillPlatform, SkillUnit, } from '../../../variable'

export default {
    name: '后台',
    list: [
        {
            name: '平台',
            list: [
                {
                    name: 'node',
                    def: '一个基于 Chrome V8 引擎 的 JavaScript 运行时。',
                    major: true,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'svg',
                      url: 'http://static.nodejs.cn/_static/img/logo.svg',
                    },
                    url: 'https://nodejs.org/zh-cn/',
                },
            ],
        },
        {
            name: '框架',
            list: [
                {
                    name: 'nest',
                    def: '用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架',
                    major: true,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      url: 'https://nestjs.bootcss.com/img/logo.png',
                    },
                    url: 'https://nestjs.bootcss.com/',
                },
                {
                    name: 'egg',
                    def: '为企业级框架和应用而生',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'svg',
                      url: 'https://zos.alipayobjects.com/rmsportal/VTcUYAaoKqXyHJbLAPyF.svg',
                    },
                    url: 'https://eggjs.org/zh-cn/intro/index.html',
                },
                {
                    name: 'express',
                    def: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
                    major: false,
                    platform: SkillPlatform.node,
                    // logo: {
                    //   type: 'png',
                    //   url: 'https://nestjs.bootcss.com/img/logo.png',
                    // },
                    url: 'https://www.expressjs.com.cn/',
                },
            ],
        },
        {
            name: '数据库',
            list: [
                {
                    name: 'MongoDB',
                    def: '一个基于分布式文件存储的数据库',
                    major: true,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3435757484,2524118334&fm=26&gp=0.jpg',
                    },
                    url: 'https://www.runoob.com/mongodb/mongodb-tutorial.html',
                },
                {
                    name: 'mysql',
                    def: '关系型数据库管理系统',
                    major: false,
                    platform: SkillPlatform.all,
                    logo: {
                      type: 'png',
                      url: 'https://www.runoob.com/wp-content/uploads/2014/03/mysql.jpg',
                    },
                    url: 'https://www.runoob.com/mysql/mysql-tutorial.html',
                },
            ],
        },
        {
            name: '网络请求',
            list: [
                {
                    name: 'postman',
                    def: 'API & HTTP 请求调试插件',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      url: 'https://src.onlinedown.net/d/file/p/2019-03-08/c9cbe27769e1de14c484e9b4130fb8e5.png',
                    },
                    url: 'https://www.postman.com/',
                },
            ],
        },
        {
            name: '项目管理',
            list: [

            ],
        },
    ],
}
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
                      type: 'jpg',
                      full: true,
                      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=238001970,1745368623&fm=26&gp=0.jpg',
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
                      full: true,
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
                      full: true,
                      url: 'https://zos.alipayobjects.com/rmsportal/VTcUYAaoKqXyHJbLAPyF.svg',
                    },
                    url: 'https://eggjs.org/zh-cn/intro/index.html',
                },
                {
                    name: 'express',
                    def: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2693920121,3280527363&fm=15&gp=0.jpg',
                    },
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
                      full: true,
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
                      full: true,
                      url: 'https://www.runoob.com/wp-content/uploads/2014/03/mysql.jpg',
                    },
                    url: 'https://www.runoob.com/mysql/mysql-tutorial.html',
                },
                {
                    name: 'mongobooster',
                    def: 'MongoDB CLI界面中非常流行的GUI工具',
                    major: true,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2188650053,2502556176&fm=26&gp=0.jpg',
                    },
                    url: 'https://nosqlbooster.com/',
                },
                {
                    name: 'navicat for mysql',
                    def: 'mysql CLI界面中非常流行的GUI工具',
                    major: true,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'http://www.navicat.com.cn/images/02.Product_00_AllProducts_Premium15.png',
                    },
                    url: 'http://www.navicat.com.cn/',
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
                      full: true,
                      url: 'https://src.onlinedown.net/d/file/p/2019-03-08/c9cbe27769e1de14c484e9b4130fb8e5.png',
                    },
                    url: 'https://www.postman.com/',
                },
            ],
        },
        {
            name: '工具库',
            list: [
                {
                    name: 'Moment.js',
                    def: 'JavaScript 日期处理类库',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://tse1-mm.cn.bing.net/th/id/OIP.3uK6AdhfnwXu5FTXU1KIBwHaDR?pid=ImgDet&w=536&h=237&rs=1',
                    },
                    url: 'http://momentjs.cn/',
                },
                {
                    name: 'log4js',
                    def: '选择log4js来完成日志记录的功能',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://tse4-mm.cn.bing.net/th/id/OIP.JTYuTy6aCFnl5erX7_WgfwAAAA?pid=ImgDet&rs=1',
                    },
                    url: 'https://gitee.com/mirrors/log4js',
                },
                {
                    name: 'Later.js',
                    def: '帮助你快速简单执行定时循环操作的JavaScript类库',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://tse4-mm.cn.bing.net/th/id/OIP.3EDqMLBIwIK_023KQyDEygHaCg?pid=ImgDet&rs=1',
                    },
                    url: 'https://blog.csdn.net/tyygming/article/details/84542298',
                },
            ],
        },
        {
            name: '部署',
            list: [
                {
                    name: 'pm2',
                    def: '简化性能监控、自动重启、负载均衡等繁琐任务',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://tse2-mm.cn.bing.net/th/id/OIP.nio3CzcEkbTmBFTVLTfdsgHaBz?pid=ImgDet&w=6138&h=1493&rs=1',
                    },
                    url: 'https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/',
                },
                {
                    name: 'forever',
                    def: 'nodejs的守护进程,能够启动,停止,重启应用',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://th.bing.com/th/id/Re7b197224f2d04d6f125f1c2ea7ea1c5?rik=U04iTBz2NGMpfw&riu=http%3a%2f%2fwww.originaloe.com%2fmedias%2fimages%2flogo-fbo-1.jpg&ehk=Xrf3SWXF19FqM1u0KvQzFLHcV6yVNJvBz4tnkcBlWWs%3d&risl=&pid=ImgRaw',
                    },
                    url: 'https://www.npmjs.com/package/forever',
                },
            ],
        },
        {
            name: '开发辅助',
            list: [
                {
                    name: 'ApiDoc',
                    def: 'Node.js可以利用ApiDoc生成接口文档',
                    major: false,
                    platform: SkillPlatform.node,
                    logo: {
                      type: 'png',
                      full: true,
                      url: 'https://th.bing.com/th/id/R8f3be1eec793aa6cc88366d6332a3a97?rik=jBkxqd4vSbuFCQ&riu=http%3a%2f%2fgreendoc.hu%2ffaces%2fjavax.faces.resource%2flogo-488x400.png%3bjsessionid%3de4f3c3476674e53712fc89f3c723%3fln%3dimages&ehk=nkZR9kL%2fkTA3zuS7kw82%2frX240x80M2E6auanYfxvOE%3d&risl=&pid=ImgRaw',
                    },
                    url: 'https://apidocjs.com/',
                },

            ],
        },
    ],
}
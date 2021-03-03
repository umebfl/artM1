import R from 'ramda'
import * as color from '@ant-design/colors'

import React, { useReducer, createContext, } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SkillPlatform, SkillUnit, } from './variable'

import interactive from './data/skill/interactive'
import server from './data/skill/server'
import theory from './data/skill/theory'

import navigation from './data/navigation.json'

import { info, debug, error, } from './util/log'
import idBuilder from './util/idBuilder'

const STORE_DATA_KEY = 'STORE_DATA_KEY'

export const clearData = async () => {
    try {
        info('清理本地缓存')
        // const jsonValue = JSON.stringify(initState)
        await AsyncStorage.setItem(STORE_DATA_KEY, '')
    } catch (e) {
        // saving error
        error('clearData 清理本地存储异常')
    }
}

const setData = async (value) => {
    try {
        info(`设置本地缓存`)

        // 需要存储到本地的节点
        const data = {
            debug: {
                open: value.debug.open,
            },
            navigation: value.navigation,
            // navigation: {
            //     home: {
            //         tab: {
            //             info: {
            //                 tab: {
            //                     toRead: {
            //                         list: value.navigation.home.tab.info.tab.toRead.list,
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // },
        }

        const jsonValue = JSON.stringify(data)

        await AsyncStorage.setItem(STORE_DATA_KEY, jsonValue)
    } catch (e) {
        // saving error
        error('setData 设置本地存储异常')
    }
}

export const getData = async () => {
    try {
        info('获取本地缓存')
        const jsonValue = await AsyncStorage.getItem(STORE_DATA_KEY)

        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // error reading value
        error('getData 获取本地存储异常')
    }
}


// 系统数据
export const initState = {

    theme: {
        main: 'rgba(49, 123, 246, 1)',
        mainA1: 'rgba(49, 123, 246, 0.1)',
        second: 'rgba(76, 146, 227, 1)',
        navigationTabBarBackgound: 'white',
        navigationTabBarBackgoundSecond: 'rgba(248, 249, 250, 1)',

        ...color,

        borderWidth: 0.7,
        borderColor: 'rgba(100, 100, 100, 0.2)',
        size: {
            lg: 34,
            md: 20,
            normal: 12,
            sm: 8,
        },

        textDark: color.grey[9],
        textNormal: 'rgb(51, 51, 52)',
        textLight2: 'rgb(167, 167, 167)',
        textLight: 'rgb(204, 204, 204)',
        textDanger: color.red[5],
    },

    // 系统导航数据
    navigation,
    // navigation: {
    //     home: {
    //         initialRouteName: 'skill',
    //         tab: {
    //             info: {
    //                 name: 'info',
    //                 text: '资讯',
    //                 icon: 'waze',
    //                 tab: {
    //                     toRead: {
    //                         title: '阅读清单',
    //                         list: [
    //                             {
    //                                 title: '一个强大的管理异步数据请求的一个强大的管理异步数据请求的',
    //                                 def: '一个强大的管理异步数据请求的 Hook',
    //                                 url: 'https://www.baidu.com/s?ie=UTF-8&wd=useState',
    //                             },
    //                         ],
    //                     },
    //                     favWebsite: {
    //                         title: '关注站点',
    //                         list: [
    //                             {
    //                                 name: '知乎',
    //                                 url: 'https://www.zhihu.com',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F4.pic.paopaoche.net%2Fup%2F2014-5%2F201452817146.png&refer=http%3A%2F%2F4.pic.paopaoche.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616515442&t=35573a5b064ad71011c9d91621bde9a0',
    //                                 },
    //                             },
    //                             {
    //                                 name: 'Github',
    //                                 url: 'https://github.com',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fzkres1.myzaker.com%2F202004%2F5e9e4f75b15ec0103b5e897c_1024.jpg&refer=http%3A%2F%2Fzkres1.myzaker.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616514382&t=fcc58da0512c5f122a153ba905135da1',
    //                                 },
    //                             },
    //                             {
    //                                 name: '开源中国',
    //                                 url: 'https://www.oschina.net/project',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=828382003,4039207230&fm=26&gp=0.jpg',
    //                                 },
    //                             },
    //                             {
    //                                 name: 'StackOverflow',
    //                                 url: 'https://stackoverflow.com/',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2842250216,1189554690&fm=26&gp=0.jpg',
    //                                 },
    //                             },
    //                             {
    //                                 name: 'GoogleDev',
    //                                 url: 'https://developers.google.cn/china/',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2832977923,3336233045&fm=26&gp=0.jpg',
    //                                 },
    //                             },
    //                             {
    //                                 name: '大前端',
    //                                 url: 'https://www.daqianduan.com/nav',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2470067681,1546475391&fm=15&gp=0.jpg',
    //                                 },
    //                             },
    //                             {
    //                                 name: '印记中文',
    //                                 url: 'https://docschina.org/',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F01%2F06%2F2564b954ed6f38916c8e5ecaf1167e79.jpg%21%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fku.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616515852&t=dc45a89d65d6a5fd508dbae319b9ce3f',
    //                                 },
    //                             },
    //                             {
    //                                 name: '前端导航',
    //                                 url: 'https://www.kwgg2020.com/',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1148848736,974362383&fm=26&gp=0.jpg',
    //                                 },
    //                             },
    //                             {
    //                                 name: '博客园',
    //                                 url: 'https://www.cnblogs.com/',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3049606950,442899264&fm=26&gp=0.jpg',
    //                                 },
    //                             },
    //                             {
    //                                 name: 'W3cplus',
    //                                 url: 'https://www.w3cplus.com/',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3694819829,1688866966&fm=26&gp=0.jpg',
    //                                 },
    //                             },
    //                             {
    //                                 name: '前端笔记',
    //                                 url: 'https://www.kancloud.cn/surahe/front-end-notebook/781957',
    //                                 logo: {
    //                                     type: 'jpg',
    //                                     full: true,
    //                                     url: 'https://static.kancloud.cn/asset/app/images/logo.png',
    //                                 },
    //                             },

    //                         ],
    //                     },
    //                 },
    //             },
    //             // skill: {
    //             //     name: 'skill',
    //             //     text: '技能',
    //             //     icon: 'electron-framework',
    //             //     tab: {
    //             //         interactive,
    //             //         server,
    //             //         theory,
    //             //     },
    //             // },
    //             interactive: {
    //                 name: 'interactive',
    //                 text: '前端',
    //                 icon: 'electron-framework',
    //                 data: interactive,
    //             },
    //             server: {
    //                 name: 'server',
    //                 text: '后台',
    //                 icon: 'nodejs',
    //                 data: server,
    //             },
    //             theory: {
    //                 name: 'theory',
    //                 text: '基础',
    //                 icon: 'midi-port',
    //                 data: theory,
    //             },
    //             // futu: {
    //             //     name: 'futu',
    //             //     text: '期货',
    //             //     icon: 'battlenet',
    //             // },
    //             // todo: {
    //             //     name: 'todo',
    //             //     text: '待办',
    //             //     icon: 'checkbox-marked-circle-outline',
    //             // },
    //             other: {
    //                 name: 'other',
    //                 text: '设置',
    //                 icon: 'vanish',
    //             },
    //         },
    //     },
    // },

    // 模块

    system: {
        version: '2.0.3',
    },

    // debug
    debug: {
        // 是否启动调试模式
        open: true,

        // 初次渲染耗时统计
        renderTime: [
            // {
            //     // 模块
            //     name: 'App',
            //     // ms
            //     time: 200,
            // },
        ],

        // 各模块渲染次数统计
        renderCount: {
            // 模块
            App: {
                count: 20,
            },
        },
    },

    // 搜索引擎
    search: 'https://cn.bing.com/search?q=',
}

export const reducer = (state, action) => {

    info(`执行: ${action.type}`)

    return R.cond([
        [
            R.equals('debug'),
            () => R.cond([
                [
                    R.equals('toggle'),
                    () => R.compose(
                        R.tap(newState => setData(newState)),
                        R.assocPath(['debug', 'open'], !state.debug.open),
                    )(state),
                ],
                [
                    R.equals('renderTime_add'),
                    () => R.compose(
                        // R.tap(newState => setData(newState)),
                        R.assocPath(['debug', 'renderTime'], [action.payload, ...state.debug.renderTime,]),
                    )(state),
                ],
            ])(action.type),
        ],
        [
            R.equals('system'),
            () => R.cond([
                [
                    R.equals('init'),
                    // () => R.compose(
                    //     // v => {
                    //     //     alert(`system init: ${JSON.stringify(v)}`)
                    //     //     return v
                    //     // },
                    //     R.mergeDeepRight(state, action.payload)
                    // ),
                    () => R.mergeDeepRight(state, action.payload),
                ],

                [
                    R.equals('fix'),
                    // () => R.compose(
                    //     // v => {
                    //     //     alert(`system init: ${JSON.stringify(v)}`)
                    //     //     return v
                    //     // },
                    //     R.mergeDeepRight(state, action.payload)
                    // ),
                    () => {
                        // 将列表都添加id
                        // const path = ['navigation', 'home', 'tab', 'interactive', 'data', 'list']
                        // const path = ['navigation', 'home', 'tab', 'server', 'data', 'list']
                        const path = ['navigation', 'home', 'tab', 'theory', 'data', 'list']

                        const list = R.path(path)(state)

                        const newList = R.addIndex(R.map)(
                            R.compose(
                                (v, k) => ({
                                    id: idBuilder(k),
                                    ...v,
                                    list: R.addIndex(R.map)(
                                        (v2, k2) => ({
                                            id: idBuilder(k2),
                                            ...v2,
                                            article: R.addIndex(R.map)(
                                                (v3, k3) => ({
                                                    id: idBuilder(k3),
                                                    ...v3,
                                                    list: R.addIndex(R.map)(
                                                        (v4, k4) => ({
                                                            id: idBuilder(k4),
                                                            ...v4,
                                                        }),
                                                    )(v3.list || []),
                                                })
                                            )(v2.article || []),
    
                                            features: R.addIndex(R.map)(
                                                (v3, k3) => ({
                                                    id: idBuilder(k3),
                                                    ...v3,
                                                    list: R.addIndex(R.map)(
                                                        (v4, k4) => ({
                                                            id: idBuilder(k4),
                                                            ...v4,
                                                        }),
                                                    )(v3.list || []),
                                                })
                                            )(v2.features || [])
                                        })
                                    )(v.list),
                                })
                            )
                        )(list)

                        const newState = R.assocPath(path, newList)(state)

                        return newState
                    },
                ],

                // [
                //     R.equals('toggleCategoryEditing'),
                //     () => {
                //         const {
                //             target,
                //         } = action.payload

                //         const path = ['navigation', 'home', 'tab', target, 'data']
                //         const data = R.path(path)(state)
                //         const newState = R.assocPath(path, {
                //             ...data,
                //             editing: !data.editing,
                //         })(state)

                //         setData(newState)
                //         return newState
                //     },
                // ],

                [
                    R.equals('addCategory'),
                    () => {
                        const {
                            target,
                            value,
                        } = action.payload

                        const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        const list = R.path(path)(state)
                        const newState = R.assocPath(path, [{
                            id: idBuilder(list.length),
                            name: value,
                            list: [],
                        }, ...list])(state)

                        // setData(newState)
                        return newState
                    },
                ],

                [
                    R.equals('removeCategory'),
                    () => {
                        const {
                            target,
                            id,
                        } = action.payload

                        const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        const list = R.path(path)(state)
                        const newList = R.filter(v => v.id !== id)(list)
                        const newState = R.assocPath(path, newList)(state)

                        setData(newState)
                        return newState
                    },
                ],

                [
                    R.equals('addCategoryLv1'),
                    () => {
                        const {
                            target,
                            categoryId,
                            value,
                        } = action.payload

                        const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        const list = R.path(path)(state)

                        const categoryIndex = R.findIndex(
                            v => v.id === categoryId
                        )(list)

                        const category = list[categoryIndex]

                        const newList = R.adjust(
                            categoryIndex,
                            v => ({
                                ...category,
                                list: [
                                    {
                                        id: idBuilder(category.list.length),
                                        name: value,
                                        def: 'def',
                                        major: true,
                                        logo: {
                                            type: "jpg",
                                            full: true,
                                            url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.jinqiaojob.com%2Fuploads%2Fallimg%2F200113%2F1-200113194504a8.jpg&refer=http%3A%2F%2Fwww.jinqiaojob.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617253889&t=c33f92d7fd8556ce833a0f923537b3fb"
                                        },
                                        url: "https://www.w3school.com.cn/js/index.asp",
                                        features: [],
                                        article: [],
                                        api: [],
                                    },
                                    ...category.list,
                                ],
                            }),
                            list
                        )

                        const newState = R.assocPath(path, newList)(state)

                        setData(newState)
                        return newState
                    },
                ],

                [
                    R.equals('removeCategoryLv1'),
                    () => {
                        const {
                            target,
                            categoryId,
                            nodeId,
                        } = action.payload

                        const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        const list = R.path(path)(state)

                        const categoryIndex = R.findIndex(
                            v => v.id === categoryId
                        )(list)

                        const category = list[categoryIndex]

                        const newList = R.adjust(
                            categoryIndex,
                            v => ({
                                ...category,
                                list: R.filter(v => v.id !== nodeId)(category.list),
                            }),
                            list
                        )

                        const newState = R.assocPath(path, newList)(state)

                        setData(newState)
                        return newState
                    },
                ],
                
                [
                    R.equals('editCategoryName'),
                    () => {

                        const {
                            target,
                            id,
                            value,
                        } = action.payload


                        const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        const list = R.path(path)(state)


                        // const fix = (id, value, path, list, state) => {

                            const index = R.findIndex(
                                v => v.id === id
                            )(list)

                            const newList = R.adjust(
                                index,
                                v => ({
                                    ...v,
                                    name: value,
                                    edit: false,
                                }),
                                list
                            )

                            // alert(JSON.stringify(newList[0]))


                            const newState = R.assocPath(path, newList)(state)

                            // return newState
                        // }

                        // const newState = fix(id, value, path, list, state)

                        // info(JSON.stringify(newState, null, 2))

                        setData(newState)
                        return newState
                    },
                ],

            ])(action.type),
        ],
        [
            R.equals('info_toRead'),
            () => {
                const path = ['navigation', 'home', 'tab', 'info', 'tab', 'toRead', 'list']
                const list = R.path(path)(state)

                return R.cond([
                    [
                        R.equals('del'),
                        () => {
                            const filterList = R.filter(v => v.url !== action.payload.url)(list)
                            const newState = R.assocPath(path, filterList)(state)
                            setData(newState)
                            return newState
                        },
                    ],
                    [
                        R.equals('add'),
                        () => R.compose(
                            // 写入到本地存储
                            R.tap(newState => setData(newState)),
                            R.assocPath(path, [...list, action.payload]),
                        )(state),
                    ],
                ])(action.type)
            },
        ],
        [
            R.T,
            () => {
                throw new Error('找不到匹配的action.mod')
            },
        ],
    ])(action.mod)
}

export default createContext()
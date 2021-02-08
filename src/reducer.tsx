import React, { useReducer, createContext, } from 'react'

// 系统数据
export const initState = {
    
    theme: {
        main: 'rgba(49, 123, 246, 1)',
        mainA1: 'rgba(49, 123, 246, 0.1)',
        second: 'rgba(76, 146, 227, 1)',
        navigationTabBarBackgound: 'white',
        navigationTabBarBackgoundSecond: 'rgba(248, 249, 250, 1)',
    },

    // 系统导航数据
    navigation: {
        home: {
            initialRouteName: 'info',
            tab: [
                {
                    name: 'info',
                    text: '资讯',
                    icon: 'waze',
                    toRead: {
                        title: '阅读清单',
                        list: [
                            {
                                title: '一个强大的管理异步数据请求的一个强大的管理异步数据请求的',
                                def: '一个强大的管理异步数据请求的 Hook',
                                url: 'https://www.baidu.com/s?ie=UTF-8&wd=useState',
                            },
                        ],
                    },
                },
                {
                    name: 'skill',
                    text: '技能',
                    icon: 'electron-framework',
                },
                {
                    name: 'futu',
                    text: '期货',
                    icon: 'battlenet',
                },
                {
                    name: 'todo',
                    text: '待办',
                    icon: 'checkbox-marked-circle-outline',
                },
                {
                    name: 'other',
                    text: '其它',
                    icon: 'vanish',
                },
            ],
        },
    },

    // 模块
    system: {
        version: '0.0.1',
    },

    // debug
    debug: {
        count: 0,
        count2: 0,
        list: [
            {
                mod: 'test',
                lv: 'debug',
                title: 'test',
                msg: 'count: 1',
            },
        ],
    },

    // 搜索引擎
    search: 'https://cn.bing.com/search?q=',
}

export const reducer = (state, action) => {

    switch (action.type) {
        case ('debug_count'):
            return {
                ...state,
                debug: {
                    ...state.debug,
                    count: state.debug.count + 1,
                },
            }
        case ('debug_count2'):
            return {
                ...state,
                debug: {
                    ...state.debug,
                    count2: state.debug.count2 + 1,
                },
            }
        default:
            return state
    }
}

export default createContext()
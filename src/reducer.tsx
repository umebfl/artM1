import * as color from '@ant-design/colors'

import React, { useReducer, createContext, } from 'react'

import { SkillPlatform, SkillUnit, } from './variable'

import interactive from './data/skill/interactive'
import server from './data/skill/server'
import theory from './data/skill/theory'

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
    },

    // 系统导航数据
    navigation: {
        home: {
            initialRouteName: 'skill',
            tab: {
                info: {
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
                skill: {
                    name: 'skill',
                    text: '技能',
                    icon: 'electron-framework',
                    tab: {
                        interactive,
                        server,
                        theory,
                    },
                },
                futu: {
                    name: 'futu',
                    text: '期货',
                    icon: 'battlenet',
                },
                todo: {
                    name: 'todo',
                    text: '待办',
                    icon: 'checkbox-marked-circle-outline',
                },
                other: {
                    name: 'other',
                    text: '其它',
                    icon: 'vanish',
                },
            },
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
        case ('info_toRead_add'):
            return {
                ...state,
                debug: {
                    ...state.debug,
                    count: state.debug.count + 1,
                },
            }

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
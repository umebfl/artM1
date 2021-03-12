import R from 'ramda'
import * as color from '@ant-design/colors'

import React, { useReducer, createContext, } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


import navigation from '../data/navigation.json'
import data from '../data/data.json'

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
        // const data = {
        //     debug: {
        //         open: value.debug.open,
        //     },
        //     navigation: value.navigation,
        //     data: value.data,
        // }

        const data = R.pick(['debug', 'navigation', 'data'], value)

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
        // main: 'rgba(73, 74, 75, 0.86)',
        // mainA1: 'rgba(87, 88, 89, 0.1)',
        // second: 'rgba(87, 88, 89, 1)',

        // main: 'rgba(25, 101, 139, 1)',
        // second: 'rgba(25, 101, 139, 1)',
        // mainA1: 'rgba(87, 88, 89, 0.1)',

        main: 'rgba(49, 123, 246, 1)',
        mainA1: 'rgba(49, 123, 246, 0.1)',
        second: 'rgba(76, 146, 227, 1)',
        navigationTabBarBackgound: 'white',
        navigationTabBarBackgoundSecond: 'rgba(248, 249, 250, 1)',

        ...color,

        borderWidth: 0.6,
        borderColor: 'rgba(100, 100, 100, 0.1)',

        textDark: color.grey[9],
        textNormal: 'rgb(51, 51, 52)',
        textLight2: 'rgb(167, 167, 167)',
        textLight: 'rgb(204, 204, 204)',
        textDanger: color.red[5],

        // 支持暗黑模式和自定义主题
        model: 0, // light | dark | custom

        screenBackgroundColor: ['white', 'black', 'rgba(49, 123, 246, 1)'],
        // screenBackgroundGreyColor: ['rgb(241, 242, 243)', 'rgb(247, 248, 249)'],
        screenBackgroundGreyColor: ['rgb(243, 244, 245)', 'rgb(247, 248, 249)'],
    },

    // 系统导航数据
    navigation,

    // 用户数据集
    data,

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
            // App: {
            //     count: 20,
            // },
        },
    },

    // 搜索引擎
    search: 'https://cn.bing.com/search?q=',
}

export const reducer = (state, action) => {

    info(`执行: ${action.type}`)

    return R.cond([
        [
            R.equals('path'),
            () => R.cond([
                [
                    R.equals('del'),
                    () => R.compose(
                        R.tap(newState => setData(newState)),
                        R.dissocPath(action.payload.path),
                    )(state),
                ],
                [
                    R.anyPass([R.equals('add'), R.equals('edit')]),
                    () => R.compose(
                        R.tap(newState => setData(newState)),
                        R.assocPath(action.payload.path, action.payload.val),
                    )(state),
                ],
            ])(action.type),
        ],
        [
            R.equals('debug'),
            () => R.cond([
                [
                    R.equals('toggle'),
                    // () => R.compose(
                    //     R.tap(newState => setData(newState)),
                    //     R.assocPath(['debug', 'open'], !state.debug.open),
                    // )(state),
                    () => {
                        state.debug.open = !state.debug.open
                        return {
                            ...state,
                        }
                    }
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
                    () => R.mergeRight(state, action.payload),
                    // () => R.mergeDeepRight(state, action.payload),
                ],

                [
                    R.equals('addCategory'),
                    () => {
                        const {
                            target,
                            value,
                        } = action.payload

                        const path = ['data', 'category', target]
                        const categorySet = R.path(path)(state)

                        const len = R.compose(
                            R.length,
                            R.values
                        )(categorySet)

                        const newCategory = {
                            id: idBuilder(len),
                            name: value,
                            list: [],
                        }

                        const newState = R.assocPath(
                            path,
                            {
                                [newCategory.id]: newCategory,
                                ...categorySet,
                            },
                            // R.assoc(
                            //     [newCategory.id],
                            //     newCategory
                            // )(categorySet)
                        )(state)

                        // const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        // const list = R.path(path)(state)
                        // const newState = R.assocPath(path, [{
                        //     id: idBuilder(list.length),
                        //     name: value,
                        //     list: [],
                        // }, ...list])(state)

                        setData(newState)
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


                        // const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        // const list = R.path(path)(state)
                        // const newList = R.filter(v => v.id !== id)(list)
                        // const newState = R.assocPath(path, newList)(state)

                        const path = ['data', 'category', target]
                        const categorySet = R.path(path)(state)

                        const newState = R.assocPath(
                            path,
                            R.dissoc(id)(categorySet)
                        )(state)

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

                        // const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        // const list = R.path(path)(state)


                        // // const fix = (id, value, path, list, state) => {

                        // const index = R.findIndex(
                        //     v => v.id === id
                        // )(list)

                        // const newList = R.adjust(
                        //     index,
                        //     v => ({
                        //         ...v,
                        //         name: value,
                        //         edit: false,
                        //     }),
                        //     list
                        // )

                        // // alert(JSON.stringify(newList[0]))


                        // const newState = R.assocPath(path, newList)(state)

                        // // return newState
                        // // }

                        // // const newState = fix(id, value, path, list, state)

                        // // info(JSON.stringify(newState, null, 2))

                        const path = ['data', 'category', target, id]
                        const category = R.path(path)(state)
                        const newState = R.assocPath(
                            path,
                            { ...category, name: value },
                        )(state)

                        setData(newState)
                        return newState
                    },
                ],

                [
                    // 节点 - 添加/修改
                    R.equals('editNode'),
                    () => {
                        const {
                            node,
                        } = action.payload

                        // const path = ['navigation', 'home', 'tab', modKey, 'data', 'list']
                        // const list = R.path(path)(state)

                        // const categoryIndex = R.findIndex(
                        //     v => v.id === categoryId
                        // )(list)

                        // const category = list[categoryIndex]

                        // let newList = []

                        // const data = state.data

                        // // 添加
                        // if (node.id === null) {
                        //     node.id = idBuilder(category.list.length)

                        //     newList = R.adjust(
                        //         categoryIndex,
                        //         v => ({
                        //             ...category,
                        //             list: [
                        //                 node,
                        //                 ...category.list,
                        //             ],
                        //         }),
                        //         data.node
                        //     )
                        // } else {
                        //     // 修改
                        //     const nodeIndex = R.findIndex(
                        //         v => v.id === node.id
                        //     )(category.list)

                        //     newList = R.adjust(
                        //         categoryIndex,
                        //         v => ({
                        //             ...category,
                        //             list: R.adjust(
                        //                 nodeIndex,
                        //                 v => ({
                        //                     ...v,
                        //                     ...node,
                        //                 }),
                        //                 category.list
                        //             ),
                        //         }),
                        //         list
                        //     )
                        // }

                        // const newState = R.assocPath(path, newList)(state)

                        const type = node.id ? 'edit' : 'add'

                        let id

                        if (type === 'add') {
                            const len = R.compose(
                                R.length,
                                R.values
                            )(state.data.node[node.mod])

                            id = idBuilder(len)

                            node.id = id
                        } else {
                            id = node.id
                        }

                        const newState = {
                            ...state,
                            data: {
                                ...state.data,
                                node: {
                                    ...state.data.node,
                                    [node.mod]: {
                                        ...state.data.node[node.mod],
                                        [node.id]: node,
                                    },
                                },
                                category: type === 'edit' ? state.data.category : {
                                    ...state.data.category,
                                    [node.mod]: {
                                        ...state.data.category[node.mod],
                                        [node.categoryId]: {
                                            ...state.data.category[node.mod][node.categoryId],
                                            list: [id, ...state.data.category[node.mod][node.categoryId].list,],
                                        },
                                    },
                                },
                            },
                        }

                        setData(newState)
                        return newState
                    },
                ],


                [
                    R.equals('removeNode'),
                    () => {
                        const {
                            modKey,
                            nodeId,
                        } = action.payload

                        // const path = ['navigation', 'home', 'tab', target, 'data', 'list']
                        // const list = R.path(path)(state)

                        // const categoryIndex = R.findIndex(
                        //     v => v.id === categoryId
                        // )(list)

                        // const category = list[categoryIndex]

                        // const newList = R.adjust(
                        //     categoryIndex,
                        //     v => ({
                        //         ...category,
                        //         list: R.filter(v => v.id !== nodeId)(category.list),
                        //     }),
                        //     list
                        // )

                        // const newState = R.assocPath(path, newList)(state)

                        // const newState = R.assocPath(
                        //     ['data', 'node'],
                        //     {...category, name: value},
                        // )(state)

                        const node = state.data.node[modKey][nodeId]
                        const categoryId = node.categoryId

                        const newState = {
                            ...state,
                            // 从node中移除
                            data: {
                                ...state.data,
                                node: {
                                    ...state.data.node,
                                    [modKey]: R.dissoc(nodeId)(state.data.node[modKey]),
                                },
                                // 从分类中移除
                                category: {
                                    ...state.data.category,
                                    [modKey]: {
                                        ...state.data.category[modKey],
                                        [categoryId]: {
                                            ...state.data.category[modKey][categoryId],
                                            list: R.filter(v => v !== nodeId)(state.data.category[modKey][categoryId].list),
                                        },
                                    },
                                },
                            },
                        }

                        setData(newState)
                        return newState
                    },
                ],

            ])(action.type),
        ],
        [
            R.equals('info_toRead'),
            () => {
                const path = ['data', 'toRead', 'node']
                const toRead = R.path(path)(state)

                return R.cond([
                    [
                        R.equals('del'),
                        () => R.compose(
                            R.tap(newState => setData(newState)),
                            R.assocPath(path, R.dissoc(action.payload.url)(toRead)),
                        )(state),
                    ],
                    [
                        R.equals('add'),
                        () => R.compose(
                            R.tap(newState => setData(newState)),
                            R.assocPath(path, {...toRead, [action.payload.url]: action.payload,}),
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
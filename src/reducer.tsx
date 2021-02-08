import React, { useReducer, createContext, } from 'react'

// 系统数据
export const initState = {
    
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
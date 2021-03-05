import R from 'ramda'
import React, { useContext, useEffect, useMemo, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import ScreenWrapper from '../../component/ScreenWrapper'
import SearchWrapper from '../../component/SearchWrapper'
import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WhiteSpace'

import SkillListView from '../../screen/skillListView'

import Context from '../../reducer'

import { info, debug, } from '../../util/log'

export default ({ navigation, }) => {

    info('[前端]: 入口')

    const startTime = new Date()

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        navigation: {
            home: {
                tab: {
                    interactive,
                },
            },
        },
    } = state

    useEffect(() => {
        const endTime = new Date()
    
        dispatch({
          mod: 'debug',
          type: 'renderTime_add',
          payload: {
            // 模块
            mod: 'interactive',
            name: '前端',
            // startTime,
            // endTime,
            // ms
            time: endTime - startTime,
          },
        })
      }, [])

    const data = {
        name: interactive.text,
        category: state.data.category.interactive,
        chain: state.data.chain.interactive,
    }

    const node = useMemo(
        () => {
            info(`模块[前端]]useMemo执行渲染`)
            return <SkillListView navigation={navigation} data={data} modKey={interactive.name} />
        },
        [state.data.category.interactive, state.data.node.interactive]
    )

    return <View style={{ flex: 1, }}>{node}</View>
}
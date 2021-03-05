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

import { info, } from '../../util/log'

export default ({ navigation, }) => {

    info('[后台]: 入口')

    const startTime = new Date()

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        navigation: {
            home: {
                tab: {
                    server,
                },
            },
        },
    } = state

    useEffect(() => {

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'server',
                name: '后台',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

    }, [])

    const data = {
        name: server.text,
        category: state.data.category.server,
        chain: state.data.chain.server,
    }

    const node = useMemo(
        () => {
            info(`模块[后台]]useMemo执行渲染`)
            return <SkillListView navigation={navigation} data={data} modKey={server.name} />
        },
        [state.data.category.server, state.data.node.server]
    )

    return <View style={{ flex: 1, }}>{node}</View>
}
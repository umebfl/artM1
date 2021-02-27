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

    const startTime = new Date()

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        navigation: {
            home: {
                tab: {
                    theory: {
                        data,
                    },
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
                mod: 'theory',
                name: '理论',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

    }, [])

    info('theory render')

    const Node = () => <SkillListView navigation={navigation} data={data} />

    const node = useMemo(
        () => <Node />,
        [data]
    )

    return <View style={{ flex: 1, }}>{node}</View>
}
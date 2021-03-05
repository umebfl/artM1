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

    // useEffect(() => {
    //     const endTime = new Date()
    
    //     dispatch({
    //       mod: 'debug',
    //       type: 'renderTime_add',
    //       payload: {
    //         // 模块
    //         mod: 'interactive',
    //         name: '前端',
    //         // startTime,
    //         // endTime,
    //         // ms
    //         time: endTime - startTime,
    //       },
    //     })
    //   }, [])

    info(`模块[${interactive.text}]执行渲染`)

    const data = {
        name: interactive.text,
        category: state.data.category.interactive,
        chain: state.data.chain.interactive,
    }

    return <SkillListView navigation={navigation} data={data} modKey={'interactive'} />
    // const Node = () => <SkillListView navigation={navigation} data={data} modKey={'interactive'} />

    // const node = useMemo(
    //     () => <Node />,
    //     [state.data]
    // )

    // return <View style={{ flex: 1, }}>{node}</View>
}
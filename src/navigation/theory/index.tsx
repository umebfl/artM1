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

    info('[理论]: 入口')
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        navigation: {
            home: {
                tab: {
                    theory,
                },
            },
        },
    } = state

    const data = {
        name: theory.text,
        category: state.data.category.theory,
        chain: state.data.chain.theory,
    }

    const node = useMemo(
        () => {
            info(`模块[理论]]useMemo执行渲染`)
            return <SkillListView navigation={navigation} data={data} modKey={theory.name} />
        },
        [state.data.category.theory, state.data.node.server]
    )

    return <View style={{ flex: 1, }}>{node}</View>
}
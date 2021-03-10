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
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'

import SkillListView from '../../screen/skillListView'

import Context from '../../reducer'

import { info, debug, } from '../../util/log'

export default ({ navigation, }) => {
    // info('[前端]: 入口')
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

    const node = useMemo(
        () => {
            info(`[前端]]useMemo执行渲染`)
            const data = {
                name: interactive.text,
                category: state.data.category.interactive,
                chain: state.data.chain.interactive,
                node: state.data.node,
            }

            return <SkillListView
                        theme={theme}
                        navigation={navigation}
                        data={data}
                        modKey={interactive.name} />
        },
        [state.data.category.interactive, state.data.node.interactive]
    )

    return <View style={{ flex: 1, }}>{node}</View>
}
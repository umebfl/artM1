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

import { info, } from '../../util/log'

export default ({ navigation, }) => {
    // info('[后台]: 入口')
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

    const node = useMemo(
        () => {
            info(`[后台]]useMemo执行渲染`)
            const data = {
                name: server.text,
                category: state.data.category.server,
                chain: state.data.chain.server,
                node: state.data.node,
            }

            return <SkillListView
                        theme={theme}
                        navigation={navigation}
                        data={data}
                        modKey={server.name} />
        },
        [state.data.category.server, state.data.node.server]
    )

    return <View style={{ flex: 1, }}>{node}</View>
}
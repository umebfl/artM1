import React, { useContext, useEffect, } from 'react'
import R from 'ramda'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    NativeModules,
    Platform,
    StatusBar,
} from 'react-native'

import ScreenHeader from '../../component/ScreenHeader'
import Context from '../../reducer'
import { SwipeListItem, } from '../../component/SwipeList'
import { info } from '../../util/log'

export default ({ route, navigation }) => {

    const { state, dispatch, } = useContext(Context)
    const {
        theme,
        data: {
            node,
        },
    } = state

    const { data, title, modKey, } = route.params

    const startTime = new Date()

    useEffect(() => {
        info('[查看全部列表页]初始化完成')

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - unitListView',
                name: '查看全部列表页',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

        return () => {
            info('[查看全部列表页]执行卸载')
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: theme.navigationTabBarBackgound, }}>
            <ScreenHeader navigation={navigation} backTitle={title} safeArea={true} />

            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 15,
                paddingBottom: 10,
            }}>
                {
                    R.addIndex(R.map)(
                        (v ,k) => <SwipeListItem key={k} k={k} item={node[modKey][v]} list={data} theme={theme} navigation={navigation} />
                    )(data)
                }
                <View style={{ height: 50, }}></View>
            </ScrollView>
        </View>
    )
}
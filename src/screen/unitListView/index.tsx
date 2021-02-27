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

export default ({ route, navigation }) => {

    const { state, dispatch, } = useContext(Context)
    const {
        theme,
    } = state

    const { data, title, } = route.params

    const startTime = new Date()

    useEffect(() => {

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - unitListView',
                name: '全部技能列表',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.navigationTabBarBackgound, }}>
            <ScreenHeader navigation={navigation} backTitle={title}/>

            <ScrollView style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 15,
                paddingBottom: 10,
            }}>
                {
                    R.addIndex(R.map)(
                        (v ,k) => <SwipeListItem key={k} k={k} item={v} list={data} theme={theme} navigation={navigation} />
                    )(data)
                }
            </ScrollView>
        </SafeAreaView>
    )
}
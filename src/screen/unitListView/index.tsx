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
    info('[全部节点列表页]]: 入口')

    const { state, dispatch, } = useContext(Context)
    const {
        theme,
        data: {
            node,
        },
    } = state

    const { data, title, modKey, } = route.params

    useEffect(() => {
        info('[查看全部列表页]初始化完成')
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
                        (v ,k) => <SwipeListItem key={v.id} k={k} item={node[modKey][v]} list={data} theme={theme} navigation={navigation} />
                    )(data)
                }
                <View style={{ height: 50, }}></View>
            </ScrollView>
        </View>
    )
}
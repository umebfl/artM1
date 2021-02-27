import R from 'ramda'
import React, { useContext, useEffect, useMemo, useState, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    FlatList,
    NativeModules,
} from 'react-native'

import ScreenWrapper from '../../component/ScreenWrapper'
import SwipeList from '../../component/SwipeList'
import { LargeTitle, } from '../../component/Text'

import Context from '../../reducer'

import { info, } from '../../util/log'

import { statusBarHeight, } from '../../util/StatusBarManager'

export default ({ navigation, data, }) => {

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
    // alert(type)
    const item = data

    // const list = useMemo(
    //     () => (
    //         <FlatList
    //             style={{
    //                 paddingTop: statusBarHeight,
    //             }}
    //             tabLabel={item.name}
    //             showsVerticalScrollIndicator={false}
    //             data={item.list}
    //             initialNumToRender={3}
    //             renderItem={({ item, index, separators }) => (
    //                 <SwipeList keyExtractor={item.name + index} navigation={navigation} title={item.name} unit={item.list} />
    //             )} />
    //     ),
    //     [data]
    // )
    const startTime = new Date()

    useEffect(() => {

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - skillListView',
                name: '技能列表',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

    }, [])

    info(`${item.name} -> skillListView render`)

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1,
        }}>
            <FlatList
                style={{
                    paddingTop: statusBarHeight,
                }}
                ListHeaderComponent={() => {
                    return (
                        <View style={{
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}>
                            <LargeTitle>{item.name}</LargeTitle>
                        </View>
                    )
                }}
                ListFooterComponent={() => {
                    if (item.list) {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                aliginItem: 'center',
                                paddingBottom: 70,
                            }}>
                                <Text style={{
                                    color: theme.textLight2,
                                    fontSize: 11,
                                }}>- 已经到底了 -</Text>
                            </View>
                        )
                    }
                    return null
                }}
                tabLabel={item.name}
                showsVerticalScrollIndicator={false}
                data={item.list}
                initialNumToRender={3}
                renderItem={({ item, index, separators }) => (
                    <SwipeList keyExtractor={item.name + index} navigation={navigation} title={item.name} unit={item.list} />
                )} />

            {/* {list} */}

            {/* <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    paddingTop: 7,
                    backgroundColor: theme.navigationTabBarBackgound,
                }}>
                {
                    R.addIndex(R.map)(
                        (v, k) => (
                            <SwipeList key={k} navigation={navigation} title={v.name} unit={v.list} />
                        )
                    )(item.list || [])
                }
            </ScrollView> */}
        </View>
    )
}
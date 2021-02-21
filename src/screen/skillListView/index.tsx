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

    info(`${item.name} -> skillListView render`)

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1,
        }} LinearGradientBackground={false} navigation={navigation} theme={theme} imageBackground={null} >
            <FlatList
                style={{
                    paddingTop: statusBarHeight,
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
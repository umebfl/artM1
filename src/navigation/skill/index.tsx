import R from 'ramda'
import React, { useContext, useEffect, } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Context from '../../reducer'
import ScrollableTabBar from '../../component/ScrollableTabBar'
import SwipeList from '../../component/SwipeList'

import { info, } from '../../util/log'
import { calTime } from '../../util/calTime'

export default ({ navigation, }) => {
    const { state, } = useContext(Context)

    const {
        navigation: {
            home: {
                tab: {
                    skill: {
                        tab,
                    },
                },
            },
        },
        theme
    } = state

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.navigationTabBarBackgound, }}>
            <ScrollableTabView prerenderingSiblingsNumber={Infinity}
                renderTabBar={payload => <ScrollableTabBar theme={theme} {...payload} />}>
                {
                    R.compose(
                        R.values,
                        R.map(
                            tabItem => (
                                <FlatList
                                    key={tabItem.name}
                                    tabLabel={tabItem.name}
                                    showsVerticalScrollIndicator={false}
                                    data={tabItem.list}
                                    renderItem={({ item, index, separators }) => (
                                        <SwipeList keyExtractor={item.name + index} navigation={navigation} title={item.name} unit={item.list} />
                                    )} />
                                // <ScrollView
                                //     key={tabItem.name}
                                //     tabLabel={tabItem.name}
                                //     showsVerticalScrollIndicator={false}
                                //     style={{
                                //         flex: 1,
                                //         paddingTop: 7,
                                //         backgroundColor: theme.navigationTabBarBackgound,
                                //     }}>
                                //         {
                                //             R.addIndex(R.map)(
                                //                 (v, k) => (
                                //                     <SwipeList key={k} navigation={navigation} title={v.name} unit={v.list} />
                                //                 )
                                //             )(tabItem.list || [])
                                //         }
                                // </ScrollView>
                            )
                        ),
                    )(tab)
                }
            </ScrollableTabView>
        </SafeAreaView>
    )
}
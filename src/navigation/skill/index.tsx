import R from 'ramda'
import React, { useContext, } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Context from '../../reducer'
import ScrollableTabBar from '../../component/ScrollableTabBar'
import SwipeList from '../../component/SwipeList'

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
                renderTabBar={payload => <ScrollableTabBar {...payload} />}>
                {
                    R.compose(
                        R.values,
                        R.map(
                            tabItem => (
                                <ScrollView
                                    key={tabItem.name}
                                    tabLabel={tabItem.name}
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
                                            )(tabItem.list || [])
                                        }
                                </ScrollView>
                            )
                        ),
                    )(tab)
                }
            </ScrollableTabView>
        </SafeAreaView>
    )
}
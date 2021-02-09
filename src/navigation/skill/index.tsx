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

// import TheoryScreen from './navigation/theory'
// import ServerScreen from './navigation/server'

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
                            v => (
                                <ScrollView
                                    key={v.text}
                                    tabLabel={v.text}
                                    showsVerticalScrollIndicator={false}
                                    style={{
                                        flex: 1,
                                        paddingTop: 7,
                                        backgroundColor: theme.navigationTabBarBackgound,
                                    }}>
                                        <Text>123</Text>
                                </ScrollView>
                            )
                        ),
                    )(tab)
                }
            </ScrollableTabView>
        </SafeAreaView>
    )
}
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
} from 'react-native'

import ScreenWrapper from '../../component/ScreenWrapper'
import SwipeList from '../../component/SwipeList'

import Context from '../../reducer'

import { info, } from '../../util/log'

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
    //         <Rxp />
    //         // <FlatList
    //         //     key={item.name}
    //         //     tabLabel={item.name}
    //         //     showsVerticalScrollIndicator={false}
    //         //     data={item.list}
    //         //     renderItem={({ item, index, separators }) => (
    //         //         <SwipeList keyExtractor={item.name + index} navigation={navigation} title={item.name} unit={item.list} />
    //         //     )} />
    //     ),
    //     [data]
    // )

    info(`${item.name} -> skillListView render`)

    return (
        <ScreenWrapper LinearGradientBackground={false} navigation={navigation} theme={theme} imageBackground={null} >
            <FlatList
                tabLabel={item.name}
                showsVerticalScrollIndicator={false}
                data={item.list}
                renderItem={({ item, index, separators }) => (
                    <SwipeList keyExtractor={item.name + index} navigation={navigation} title={item.name} unit={item.list} />
                )} />

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
                    )(tabItem.list || [])
                }
            </ScrollView> */}
        </ScreenWrapper>
    )
}
import R from 'ramda'
import React, { useContext, useEffect, useMemo, useRef, useState, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    FlatList,
    NativeModules,
    TextInput,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ScreenWrapper from '../../component/ScreenWrapper'
import SwipeList from '../../component/SwipeList'
import { LargeTitle, DefText, } from '../../component/Text'

import Context from '../../reducer'

import { info, } from '../../util/log'

import { statusBarHeight, } from '../../util/StatusBarManager'
import SwipeIconList from '../../component/SwipeIconList'
import TouchView from '../../component/TouchView'
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import SimpleScreen from '../../component/View/SimpleScreen'
import ScrollEndLine from '../../component/ScrollEndLine'

interface payload {
    navigation: any
    theme: any
    data: {
        name: string,
        category: {},
        chain?: {},
        node: {},
    }
    modKey: string
}

export default (payload: payload) => {
    // info('[skillListView]入口')

    const {
        navigation,
        theme,
        data: {
            name,
            category,
            chain,
            node,
        },
        modKey,
    } = payload

    return useMemo(
        () => {
            // info('[skillListView]执行useMemo')
            const list = R.values(category)
            const chainList = R.values(chain || {})

            return (
                <SimpleScreen
                    theme={theme}
                    noPadding={true}
                    formScreen={true}
                    navigation={navigation}
                    ScreenHeaderConf={{
                        title: name,
                        left: <></>,
                        right: (
                            <TouchView onPress={() => navigation.push('unitEditCategoryView', { modKey, })}>
                                <Icon name={'circle-edit-outline'} size={32} color={theme.main} style={{
                                    opacity: 0.68,
                                    marginRight: 18,
                                }} />
                            </TouchView>
                        )
                    }}>

                    <FlatList
                        ListHeaderComponent={() => {
                            return (
                                <View style={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}>
                                    <WingBlank style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <LargeTitle>{name}</LargeTitle>

                                    </WingBlank>

                                    {/* 技术链条 */}
                                    {
                                        R.map(
                                            payload => {
                                                const nodeList = R.map(key => node[modKey][key])(R.keys(payload.node || {}))
                                                const handlePress = payload => navigation.push('unitDetailView', payload)

                                                return (
                                                    <WhiteSpace key={payload.id} style={{
                                                        borderTopWidth: theme.borderWidth,
                                                        borderColor: theme.borderColor,
                                                        paddingTop: 10,
                                                    }}>
                                                        <SwipeIconList
                                                            theme={theme}
                                                            onPress={handlePress}
                                                            title={payload.title}
                                                            radius={8}
                                                            navigation={navigation}
                                                            data={nodeList} />
                                                    </WhiteSpace>
                                                )
                                            }
                                        )(chainList)
                                    }
                                </View>
                            )
                        }}
                        ListFooterComponent={() => {
                            if (list) {
                                return (
                                    <ScrollEndLine></ScrollEndLine>
                                )
                            }
                            return null
                        }}
                        tabLabel={name}
                        showsVerticalScrollIndicator={false}
                        data={list}
                        initialNumToRender={3}
                        renderItem={({ item, index, separators }) => (
                            <SwipeList
                                modKey={modKey}
                                id={item.id}
                                key={name + index}
                                navigation={navigation}
                                title={item.name}
                                unit={item.list} />
                        )} />
                </SimpleScreen>
            )
        }, [category, theme]
    )
}
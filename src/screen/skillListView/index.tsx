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
import WhiteSpace from '../../component/WhiteSpace'
import SwipeIconList from '../../component/SwipeIconList'
import WingBlank from '../../component/WingBlank'
import TouchView from '../../component/TouchView'

interface payload {
    navigation: any
    data: {
        name: string,
        category: {},
        chain?: {},
    }
    modKey: string
}

export default (payload: payload) => {

    const { state, dispatch, } = useContext(Context)

    const [addingCategory, setAddingCategory] = useState(false)

    const {
        navigation,
        data: {
            name,
            category,
            chain,
        },
        modKey,
    } = payload

    const {
        theme,
        data: {
            node,
        },
    } = state

    // const list = useMemo(
    //     () => (
    //         <FlatList
    //             style={{
    //                 paddingTop: statusBarHeight,
    //             }}
    //             tabLabel={name}
    //             showsVerticalScrollIndicator={false}
    //             data={item.list}
    //             initialNumToRender={3}
    //             renderItem={({ item, index, separators }) => (
    //                 <SwipeList keyExtractor={name + index} navigation={navigation} title={name} unit={item.list} />
    //             )} />
    //     ),
    //     [data]
    // )
    // const startTime = new Date()

    // useEffect(() => {

    //     // 渲染计时 结束时间
    //     const endTime = new Date()

    //     dispatch({
    //         mod: 'debug',
    //         type: 'renderTime_add',
    //         payload: {
    //             // 模块
    //             mod: 'screen - skillListView',
    //             name: `${name} - 技能列表`,
    //             // startTime,
    //             // endTime,
    //             // ms
    //             time: endTime - startTime,
    //         },
    //     })

    // }, [])

    // info(`${name} -> skillListView render`)


    // const handleToggleCategoryEditing = () => {
    //     dispatch({
    //         mod: 'system',
    //         type: 'toggleCategoryEditing',
    //         payload: {
    //             target: modKey,
    //         },
    //     })
    // }

    const list = R.values(category)
    const chainList = R.values(chain || {})

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
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}>
                            <WingBlank style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <LargeTitle>{name}</LargeTitle>

                                <TouchView onPress={() => navigation.push('unitEditCategoryView', { modKey, })}>
                                    <Icon name={'circle-edit-outline'} size={32} color={theme.main} style={{ opacity: 0.68, }} />
                                </TouchView>
                            </WingBlank>

                            {/* 技术链条 */}
                            {
                                R.map(
                                    payload => {
                                        const nodeList = R.map( key => node[key] )(R.keys(payload.node || {}))
                                        const handlePress = payload => navigation.push('unitDetailView', payload)

                                        return (
                                            <WhiteSpace key={payload.id} size={'normal'} style={{
                                                borderTopWidth: theme.borderWidth,
                                                borderColor: theme.borderColor,
                                                paddingTop: 10,
                                            }}>
                                                <SwipeIconList
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
        </View>
    )
}
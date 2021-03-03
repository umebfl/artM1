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

export default ({ navigation, data, modKey, }) => {

    const { state, dispatch, } = useContext(Context)
    const inputEl = useRef(null)

    const [addingCategory, setAddingCategory] = useState(false)

    const {
        theme,
    } = state

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
    //             name: `${item.name} - 技能列表`,
    //             // startTime,
    //             // endTime,
    //             // ms
    //             time: endTime - startTime,
    //         },
    //     })

    // }, [])

    info(`${item.name} -> skillListView render`)

    const handleAdd = () => {

        if( inputEl.current.value ) {
            dispatch({
                mod: 'system',
                type: 'addCategory',
                payload: {
                    target: modKey,
                    value: inputEl.current.value,
                },
            })

        } else {
            setAddingCategory(false)
        }
    }

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
                            <WingBlank>
                                <LargeTitle>{item.name}</LargeTitle>
                            </WingBlank>

                            {/* 技术链条 */}
                            {
                                item.chain
                                    ? (
                                        R.addIndex(R.map)(
                                            (v, k) => {
                                                return (
                                                    <WhiteSpace size={'normal'} style={{
                                                        borderTopWidth: theme.borderWidth,
                                                        borderColor: theme.borderColor,
                                                        paddingTop: 10,
                                                    }}>
                                                        <SwipeIconList
                                                            onPress={payload => navigation.push('unitDetailView', payload)}
                                                            title={v.title} radius={8} navigation={navigation} data={v.list} />
                                                    </WhiteSpace>
                                                )
                                            }
                                        )(item.chain)
                                    )
                                    : null
                            }

                            {/* 添加分类 */}
                            <WingBlank style={{
                                marginTop: 10,
                                height: 40,
                            }}>
                                {
                                    addingCategory
                                        ? (
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <TextInput
                                                    style={{
                                                        flex: 1,
                                                        pdding: 2,
                                                        paddingLeft: 10,
                                                        height: 40,
                                                        // backgroundColor: 'red',
                                                        borderRadius: 8,
                                                        borderWidth: theme.borderWidth,
                                                        borderColor: theme.borderColor,
                                                        fontSize: 12,
                                                    }}
                                                    ref={inputEl}
                                                    onChange={({ nativeEvent, }) => inputEl.current.value = nativeEvent.text}
                                                    onSubmitEditing={handleAdd}
                                                    onBlur={() => setAddingCategory(false)}
                                                    maxLength={20}
                                                    enablesReturnKeyAutomatically={true}
                                                    autoCorrect={true}
                                                    clearButtonMode={'while-editing'}
                                                    blurOnSubmit={true}
                                                    autoFocus={true}
                                                    placeholder={'请输入分类名称'} />
                                                
                                                <TouchView onPress={() => setAddingCategory(false)}>
                                                    <Text style={{
                                                        // backgroundColor: 'red',
                                                        alignItems: 'center',
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        color: theme.grey[0],
                                                        fontSize: 14,
                                                    }}>取消</Text>
                                                </TouchView>
                                            </View>
                                        )
                                        : (
                                            <TouchView onPress={() => setAddingCategory(true)}>
                                                <View style={{
                                                    // backgroundColor: 'red',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: 40,
                                                    borderRadius: 8,
                                                    borderStyle: 'dashed',
                                                    borderWidth: theme.borderWidth,
                                                    borderColor: theme.borderColor,
                                                    // opacity: 0.8,
                                                }}>
                                                    <Icon name={'plus-circle-outline'} size={18} color={theme.grey[0]} />
                                                    <DefText>添加分类</DefText>
                                                </View>
                                            </TouchView>
                                        )
                                }
                            </WingBlank>

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
                    <SwipeList
                        modKey={modKey}
                        id={item.id}
                        keyExtractor={item.name + index}
                        navigation={navigation}
                        edit={item.edit}
                        title={item.name}
                        unit={item.list} />
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
import React, { useContext, useState, useRef, } from 'react'

import R from 'ramda'

import {
    SafeAreaView,
    Image,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Pressable,
    TextInput,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Context from '../../reducer'

import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import { SkillStep, SkillStepVal, } from '../../variable'

// 列表最长长度
const LIST_MAX_LEN = 4

interface payload {
    // unit id
    id: string
    // 模块名称
    modKey: string
    title: String
    unit: String[]
    navigation: any
}

export default (payload: payload) => {
    const { state, dispatch, } = useContext(Context)

    const [edit, setEdit] = useState(false)
    const inputEl = useRef(null)

    const {
        theme,
        data: {
            node,
        },
    } = state

    const winWidth = Dimensions.get('window').width

    const {
        id,
        modKey,
        title,
        unit,
        navigation,
    } = payload

    // 分组
    const spList = R.splitEvery(LIST_MAX_LEN, unit)

    const showWidth = 20
    const listWidth = winWidth - showWidth * 2

    const handleEditCategoryName = () => {
        // alert(inputEl.current.value)
        dispatch({
            mod: 'system',
            type: 'editCategoryName',
            payload: {
                target: modKey,
                id: id,
                value: inputEl.current.value,
            },
        })
    }

    return (
        <View style={{ marginTop: 0, marginBottom: 10, }}>
            <WingBlank style={{
                paddingTop: 12,
                paddingBottom: 2,
                borderTopWidth: theme.borderWidth,
                borderTopColor: theme.borderColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 44,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    {
                        edit === true
                            ? (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <TextInput
                                        style={{
                                            width: 200,
                                            pdding: 2,
                                            paddingLeft: 10,
                                            height: 40,
                                            borderRadius: 8,
                                            borderWidth: theme.borderWidth,
                                            borderColor: theme.borderColor,
                                            fontSize: 16,
                                        }}
                                        ref={inputEl}
                                        defaultValue={title}
                                        onChange={({ nativeEvent, }) => inputEl.current.value = nativeEvent.text}
                                        onSubmitEditing={handleEditCategoryName}
                                        onBlur={() => setEdit(false)}
                                        enablesReturnKeyAutomatically={true}
                                        autoCorrect={true}
                                        clearButtonMode={'while-editing'}
                                        blurOnSubmit={true}
                                        autoFocus={true}
                                        maxLength={20}
                                        placeholder={'请输入分类名称'} />

                                </View>
                            )
                            : (
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <MidTitle>{title}</MidTitle>
                                    {/* {
                                        R.ifElse(
                                            R.equals(true),
                                            () => (
                                                <TouchView onPress={() => setEdit(true)}>
                                                    <Icon
                                                        style={{ marginLeft: 5, width: 24, height: 24, }}
                                                        name={'circle-edit-outline'}
                                                        size={16}
                                                        color={theme.grey[0]} />
                                                </TouchView>
                                            ),
                                            () => null
                                        )(true)
                                    } */}
                                </View>
                            )
                    }
                </View>

                {
                    unit.length > LIST_MAX_LEN
                        ? (
                            <TouchView onPress={() => { navigation.navigate('unitListView', { data: unit, title, modKey, }) }}>
                                <Text style={{ fontSize: 18, fontWeight: 'normal', color: theme.main }}>查看全部</Text>
                            </TouchView>
                        )
                        : null
                }

            </WingBlank>

            <ScrollView
                alwaysBounceVertical={false}
                scrollEnabled={unit.length > LIST_MAX_LEN}
                removeClippedSubviews={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                // bounces={false}
                pagingEnabled={true}
                style={{
                    // backgroundColor: 'yellow',
                    width: listWidth,
                    marginLeft: showWidth,
                    overflow: 'visible',
                }}
                contentContainerStyle={{
                    width: listWidth * spList.length,
                    // width: listWidth,
                    // height: 230,
                }}>
                {
                    R.addIndex(R.map)(
                        (list, listIndex) => (
                            <View key={listIndex} style={{
                                width: listWidth,
                                marginTop: 12,
                            }}>
                                {
                                    R.addIndex(R.map)(
                                        (item, k) => {
                                            return <SwipeListItem key={k} k={k} modKey={modKey} item={node[modKey][item]} list={list} theme={theme} navigation={navigation} />
                                        },
                                        list
                                    )
                                }
                            </View>
                        ),
                        spList
                    )
                }
            </ScrollView>
        </View>
    )
}

export const SwipeListItem = ({
    k,
    item,
    list,
    theme,
    modKey,
    navigation,
}) => {

    const iconSize = 50

    if(!item) {
        return <Text>2</Text>
    }

    return (
        <TouchView onPress={() => { navigation.push('unitDetailView', item) }}>
            <View style={{ flexDirection: 'row', }}>
                <UnitLogo data={item.logo} size={iconSize} ></UnitLogo>

                <WingBlank size='sm' style={{
                    height: iconSize,
                    flex: 1,
                    marginTop: 4,
                    marginBottom: 8,
                    borderBottomWidth: k === list.length - 1 ? 0 : 0.3,
                    borderBottomColor: theme.borderColor,
                    height: 63,
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Title>{item.name}</Title>
                        {
                            item.major
                                ? (
                                    <Icon style={{
                                        width: 15,
                                        height: 15,
                                        // position: 'absolute',
                                        // right: 0,
                                        // bottom: 0,
                                    }} name={'heart-multiple-outline'} size={12} color={theme.grey[0]} />
                                )
                                : null
                        }


                    </View>
                    <DefText style={{ marginTop: 5, width: 220, }}>{item.def}</DefText>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 3,
                    }}>
                        {/* {
                            item.step
                                ? (
                                    <Icon style={{
                                        width: 15,
                                        height: 15,
                                        // position: 'absolute',
                                        // right: 0,
                                        // bottom: 0,
                                    }} name={item.step} size={12} color={theme.grey[0]} />
                                )
                                : null
                        } */}

                        {
                            item.ftStep
                                ? (
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        {/* <Icon style={{
                                            // width: 14,
                                            // height: 15,
                                            // position: 'absolute',
                                            // right: 0,
                                            // bottom: 0,
                                        }} name={item.ftStep} size={12} color={theme.grey[0]} /> */}
                                        <Text style={{
                                            fontSize: 8,
                                            color: theme.grey[0],
                                        }}>{item.ftStep}</Text>

                                        <Text style={{
                                            fontSize: 8,
                                            color: theme.grey[0],
                                        }}>({calStepVal(item.ftStep, item.step)}%)</Text>
                                    </View>
                                )
                                : null
                        }
                    </View>
                </WingBlank>
            </View>
        </TouchView>
    )
}

export const calStepVal = (ftStep: string, step: string) => {

    const ftval = SkillStepVal[ftStep]
    const curval = SkillStepVal[step]

    return parseInt((curval / ftval) * 100)
}
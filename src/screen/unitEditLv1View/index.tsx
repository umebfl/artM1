import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
    Clipboard,
    TextInput,
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SvgCssUri, SvgXml, } from 'react-native-svg'
import ActionSheet from 'react-native-actionsheet'

import Context from '../../reducer'

import ScreenHeader from '../../component/ScreenHeader'

import TabBar from '../../component/ScrollableTabBar'
import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'
import UnitItemList from '../../component/UnitItemList'
import Padding from '../../component/Padding'
import WhiteSpace from '../../component/WhiteSpace'

import { EditItem, moveToTop, } from '../unitEditCategoryView'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import WingBlank from '../../component/WingBlank'
import Paragraph from '../../component/Paragraph'
import { info } from '../../util/log'
import { FScrollView } from '../../component/FixNative'
import SimpleScreen from '../../component/View/SimpleScreen'

export default ({ route, navigation }) => {
    info('[编辑][分类详情页]模块执行渲染')
    const { state, dispatch, } = useContext(Context)

    const actionSheetREl = useRef(null)
    const dotActionSheetREl = useRef(null)
    const inputEl = useRef(null)

    const {
        theme,
        navigation: {
            home: {
                tab,
            },
        },
        data: {
            category,
            node,
        },
    } = state

    const {
        params: {
            modKey,
            categoryId,
        },
    } = route

    const data = category[modKey][categoryId]


    const startTime = new Date()
    useEffect(() => {
        info('[编辑][分类详情页]初始化完成')

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - unitEditLv1View',
                name: '[编辑][分类详情页]',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

        return () => {
            info('[编辑][分类详情页]执行卸载')
        }
    }, [])

    // const handleDelPress = (index) => {
    //     if (index === 0) {
    //         dispatch({
    //             mod: 'system',
    //             type: 'removeNode',
    //             payload: {
    //                 modKey,
    //                 categoryId,
    //                 nodeId: actionSheetREl.current.value,
    //             },
    //         })
    //     }
    // }

    const handleJumpDetail = (nodeId) => {
        navigation.push('unitEditLv1DetailView', {
            modKey,
            categoryId,
            nodeId,
        })
    }

    const handleEditCategoryName = (id: string, val: string) => {
        dispatch({
            mod: 'system',
            type: 'editCategoryName',
            payload: {
                target: modKey,
                id: id,
                value: val,
            },
        })
    }

    const handleDotActionSheet = () => {
        dotActionSheetREl.current.show()
    }

    const handleCategoryDelActionSheet = () => {
        actionSheetREl.current.value = categoryId
        actionSheetREl.current.show()
    }

    const handleCategoryDotPress = (index) => {
        if (index === 0) {
            const pathToList = ['data', 'category', modKey, categoryId, 'list']
            const id = dotActionSheetREl.current.value
            const list = R.path(pathToList)(state)
            const newList = R.filter(v => v !== id)(list)

            dispatch({
                mod: 'path',
                type: 'edit',
                payload: {
                    path: pathToList,
                    val: [
                        id,
                        ...newList,
                    ],
                },
            })
        }
    }

    const handleCategoryDelPress = (index) => {
        if (index === 0) {
            const categoryIndex = actionSheetREl.current.value
            const item = category[modKey][categoryIndex]

            if (item.list.length !== 0) {
                alert('分类下面存在节点, 需要移除后删除!')
                return
            }

            navigation.goBack()

            dispatch({
                mod: 'system',
                type: 'removeCategory',
                payload: {
                    target: modKey,
                    id: categoryIndex,
                },
            })
        }
    }

    if (!data) {
        return <View></View>
    }

    return (


        <SimpleScreen
            formScreen={true}
            ScreenHeaderConf={{
                title: `编辑 - ${data.name}`,
                right: (
                    <TouchView onPress={handleCategoryDelActionSheet}>
                        <View style={{
                            marginRight: 20,
                            // backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: theme.grey[0],
                                fontSize: 16,
                            }}>删除</Text>
                        </View>
                    </TouchView>
                ),
            }}
            navigation={navigation}>

            <ActionSheet
                ref={actionSheetREl}
                title={'确认删除分类?'}
                options={['删除分类', '取消']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={handleCategoryDelPress}
            />

            <ActionSheet
                ref={dotActionSheetREl}
                title={'选择操作'}
                options={['移至顶部', '取消']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={handleCategoryDotPress}
            />

            <View style={{
                height: 36,
            }}>
                <Paragraph
                    text={<MidTitle>{data.name}</MidTitle>}
                    iconSize={18}
                    handleSave={(val) => handleEditCategoryName(data.id, val)}
                    theme={theme}
                    defaultValue={data.name} />
            </View>

            <AddBtn title={'添加节点'} handlePress={() => handleJumpDetail(null)} />

            {
                R.addIndex(R.map)(
                    (v, k) => {
                        const item = node[modKey][v]
                        return (
                            <EditItem
                                seq={k}
                                id={item.id}
                                name={item.name}
                                def={item.def}
                                logo={item.logo}
                                theme={theme}
                                handleJump={() => {
                                    handleJumpDetail(item.id)
                                }}
                                handleDotPress={
                                    () => {
                                        dotActionSheetREl.current.value = item.id
                                        handleDotActionSheet()
                                    }
                                }
                                handleEdit={() => handleJumpDetail(item.id)} />
                        )
                    }
                )(data.list)
            }
        </SimpleScreen>
    )
}

interface AddBtnPayload {
    handlePress: () => void
    title: string
    style?: Object
}

export const AddBtn = (payload: AddBtnPayload) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        title,
        style,
        handlePress,
    } = payload

    return (
        <TouchView onPress={handlePress}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                borderRadius: 8,
                marginTop: 20,
                marginBottom: 10,
                borderStyle: 'dashed',
                borderWidth: theme.borderWidth,
                borderColor: theme.borderColor,
                backgroundColor: 'white',
                // opacity: 0.8,
                ...style,
            }}>
                <Icon name={'plus-circle-outline'} size={18} color={theme.grey[0]} />
                <DefText>{title}</DefText>
            </View>
        </TouchView>
    )
}
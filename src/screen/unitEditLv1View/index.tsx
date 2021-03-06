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

import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'
import UnitItemList from '../../component/UnitItemList'
import { WingBlank, WhiteSpace, Padding, } from '../../component/View/Padding'

import { EditItem, moveToPostion, } from '../unitEditCategoryView'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import Paragraph from '../../component/Paragraph'
import { info } from '../../util/log'
import { FScrollView } from '../../component/FixNative'
import SimpleScreen from '../../component/View/SimpleScreen'
import ScrollEndLine from '../../component/ScrollEndLine'

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


    useEffect(() => {
        info('[编辑][分类详情页]初始化完成')
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

        const move = (position: string) => {
            const pathToList = ['data', 'category', modKey, categoryId, 'list']
            const id = dotActionSheetREl.current.value
            const list = R.path(pathToList)(state)
            const newList = R.filter(v => v !== id)(list)

            dispatch({
                mod: 'path',
                type: 'edit',
                payload: {
                    path: pathToList,
                    val: position === 'top' ? [
                        id,
                        ...newList,
                    ] : [
                        ...newList,
                        id,
                    ],
                },
            })
        }

        if (index === 1) {
            dispatch({
                mod: 'system',
                type: 'removeNode',
                payload: {
                    modKey,
                    nodeId: dotActionSheetREl.current.value,
                },
            })
        } else if (index === 2) {
            move('top')
        } else if (index === 3) {
            move('bottom')
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
            theme={theme}
            formScreen={true}
            ScreenHeaderConf={{
                title: `编辑 - ${data.name}`,
                right: (
                    <TouchView onPress={handleCategoryDelActionSheet}>
                        <View style={{
                            marginRight: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 40,
                        }}>
                            <DefText style={{ fontSize: 16, }}>删除</DefText>
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
                options={['取消', '删除节点', '移至顶部', '移至底部']}
                cancelButtonIndex={0}
                destructiveButtonIndex={1}
                onPress={handleCategoryDotPress}
            />

            <WhiteSpace style={{
                height: 36,
            }}>
                <Paragraph
                    text={<MidTitle>{data.name}</MidTitle>}
                    iconSize={18}
                    handleSave={(val) => handleEditCategoryName(data.id, val)}
                    theme={theme}
                    defaultValue={data.name} />
            </WhiteSpace>

            <AddBtn title={'添加节点'} handlePress={() => handleJumpDetail(null)} />

            {
                R.addIndex(R.map)(
                    (v, k) => {
                        const item = node[modKey][v]
                        return (
                            <EditItem
                                key={item.id}
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

            <ScrollEndLine></ScrollEndLine>
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
                // marginTop: 20,
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
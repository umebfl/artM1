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

import { EditItem, } from '../unitEditCategoryView'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import WingBlank from '../../component/WingBlank'
import Paragraph from '../../component/Paragraph'
import { info } from '../../util/log'

export default ({ route, navigation }) => {
    info('[编辑][分类详情页]模块执行渲染')
    const { state, dispatch, } = useContext(Context)

    const actionSheetREl = useRef(null)
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

    const handleJumpLv2 = (id) => {
        navigation.push('unitEditLv2View', { modKey, nodeId: id, })
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

    const handleCategoryDelActionSheet = () => {
        actionSheetREl.current.value = categoryId
        actionSheetREl.current.show()
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

    if(!data) {
        return <View></View>
    }

    return (
        <View style={{
            flex: 1,
            // backgroundColor: 'rgb(247, 248, 249)',
            backgroundColor: 'white',
            paddingBottom: 20,
        }}>
            <ScreenHeader
                right={
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
                }
                navigation={navigation}
                title={`编辑 - ${data.name}`}
                safeArea={true} />

            <ActionSheet
                ref={actionSheetREl}
                title={'确认删除分类?'}
                options={['删除分类', '取消']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={handleCategoryDelPress}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <WhiteSpace>
                    <WingBlank>
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

                        <TouchView onPress={() => handleJumpDetail(null)}>
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
                            }}>
                                <Icon name={'plus-circle-outline'} size={18} color={theme.grey[0]} />
                                <DefText>添加节点</DefText>
                            </View>
                        </TouchView>
                    </WingBlank>

                    {
                        R.addIndex(R.map)(
                            (v, k) => {
                                const item = node[v]
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
                                        handleEdit={() => handleJumpDetail(item.id)}
                                        handleDelPress={
                                            () => {
                                                actionSheetREl.current.value = item.id
                                                handleDelActionSheet()
                                            }
                                        } />
                                )
                            }
                        )(data.list)
                    }
                </WhiteSpace>
            </ScrollView>
        </View >
    )
}
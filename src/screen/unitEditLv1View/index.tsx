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

export default ({ route, navigation }) => {
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

    const handleDelActionSheet = async () => {
        actionSheetREl.current.show()
    }

    const handleDelPress = (index) => {
        if (index === 0) {
            dispatch({
                mod: 'system',
                type: 'removeCategoryLv1',
                payload: {
                    modKey,
                    categoryId,
                    nodeId: actionSheetREl.current.value,
                },
            })
        }
    }

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

    return (
        <View style={{
            flex: 1,
            // backgroundColor: 'rgb(247, 248, 249)',
            backgroundColor: 'white',
            paddingBottom: 20,
        }}>
            <ScreenHeader navigation={navigation} title={`编辑 - ${data.name}`} safeArea={true} />

            <ActionSheet
                ref={actionSheetREl}
                title={'确认删除?'}
                options={['删除节点', '取消']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={handleDelPress}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <WhiteSpace>
                    <WingBlank>
                        <MidTitle>{data.name}</MidTitle>

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
                                        theme={theme}
                                        handleJump={() => handleJumpLv2(item.id)}
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
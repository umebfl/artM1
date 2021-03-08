import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, useMemo, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
    Clipboard,
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import ActionSheet from 'react-native-actionsheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SvgCssUri, SvgXml, } from 'react-native-svg'

import Context from '../../reducer'

import ScreenHeader from '../../component/ScreenHeader'

import TabBar from '../../component/ScrollableTabBar'
import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'
import UnitItemList from '../../component/UnitItemList'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import { info } from '../../util/log'
import { IfElse, When } from '../../util/jsx'
import { moveToTop } from '../unitEditCategoryView'

enum ScrollType {
    features = 'features',
    article = 'article'
}

const moban = require('../../../resource/image/template/m2.jpeg')

export const DetailHead = ({ payload, imageSize, navigation, theme }) => {

    const handlePress = text => {
        // Clipboard.setString(text)
        navigation.push('readWebview', { url: payload.url, })
    }

    return (
        <View style={{
            paddingLeft: 26,
            paddingRight: 26,
            paddingTop: 10,
            paddingBottom: 14,
            // marginBottom: 4,
            // height: 160,
            // backgroundColor: 'rgba(100, 100, 100, 0.2)',
            flexDirection: 'row',
        }}>
            <View>
                {
                    payload.logo
                        ? <UnitLogo style={{ marginRight: 16, }} data={payload.logo} size={imageSize} ></UnitLogo>
                        : null
                }
            </View>
            <View style={{
                flex: 1,
                paddingTop: 4,
                // backgroundColor: 'rgba(100, 100, 100, 0.2)',
            }}>
                <MidTitle numberOfLines={3}>{payload.name || payload.title}</MidTitle>
                <DefText numberOfLines={3} style={{ fontSize: 14, marginTop: 12, }}>{payload.def}</DefText>

                <When test={payload.url} node={() => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        marginTop: 30,
                    }}>
                        <TouchView onPress={() => handlePress(payload.url)}>
                            <View style={{
                                width: 76,
                                height: 28,
                                backgroundColor: theme.main,
                                // opacity: 0.6,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 14,
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                }}>参考</Text>
                            </View>
                        </TouchView>
                    </View>
                )}></When>
            </View>
        </View>
    )
}

export default ({ route, navigation }) => {
    const { state, dispatch, } = useContext(Context)
    const leafActionSheetREL = useRef(null)
    const categoryActionSheetREL = useRef(null)

    const {
        theme,
        data: {
            node,
        },
    } = state

    const { id, mod, } = route.params

    const data = node[mod][id]

    if (!data) {
        navigation.goBack()
        return <View></View>
    }

    const imageSize = 124
    const imageInnerSize = 124 * 0.68

    const startTime = new Date()

    const pathToNode = ['data', 'node', mod, id]

    useEffect(() => {
        info('[节点详情页]初始化完成')

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - unitDetail',
                name: '节点详情页',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

        return () => {
            info('[节点详情页]执行卸载')
        }
    }, [])

    const handleCategoryActionSheet = (type, category) => {
        categoryActionSheetREL.current.show()
        categoryActionSheetREL.current.value = {
            type,
            category,
        }
    }
    const handleLeafActionSheet = (type, categoryId, leaf) => {
        leafActionSheetREL.current.show()
        leafActionSheetREL.current.value = {
            type,
            categoryId,
            leaf,
        }
    }

    const handleCategoryActionSheetSelected = (index) => {
        const value = categoryActionSheetREL.current.value
        if (index === 1) {
            // 添加节点
            if (value.type === 'article') {
                // 文章
                navigation.push('unitEditNodeArticleLeafView', {
                    node: data,
                    type: value.type,
                    categoryId: value.category.id,
                    article: null,
                })
            } else if (value.type === 'features') {
                // 特性
                navigation.push('unitEditNodeFeaturesLeafView', {
                    node: data,
                    type: value.type,
                    categoryId: value.category.id,
                    features: null,
                })
            }
        } else if (index === 2) {
            // 编辑分类
            navigation.push('unitEditNodeCategoryView', { node: data, type: value.type, category: value.category, })
        } else if (index === 3) {
            // 移动到顶部
            moveToTop({
                dispatch,
                state,
                id: value.category.id,
                pathToList: [...pathToNode, value.type],
            })

        }
    }
    const handleLeafActionSheetSelected = (index) => {
        const value = leafActionSheetREL.current.value
        if (index === 1) {
            // 编辑
            if (value.type === 'article') {
                // 文章
                navigation.push('unitEditNodeArticleLeafView', {
                    node: data,
                    type: value.type,
                    categoryId: value.categoryId,
                    article: value.leaf,
                })
            } else if (value.type === 'features') {
                // 特性
                navigation.push('unitEditNodeFeaturesLeafView', {
                    node: data,
                    type: value.type,
                    categoryId: value.categoryId,
                    features: value.leaf,
                })
            }
        } else if (index === 2) {
            // 特性
            moveToTop({
                dispatch,
                state,
                id: value.leaf.id,
                pathToList: [...pathToNode, value.type, value.categoryId, 'node'],
            })
        }
    }

    const handleJumpDetail = () => {
        navigation.push('unitEditLv1DetailView', {
            modKey: data.mod,
            categoryId: data.categoryId,
            nodeId: data.id,
        })
    }

    const scrollViewWidth = Dimensions.get('window').width - 30

    return (
        <ImageBackground
            source={moban}
            style={{
                flex: 1,
                resizeMode: 'contain',
                justifyContent: 'center',
            }}>

            {
                // payload.logo
                //   ? <Curtain type={payload.logo.type} url={payload.logo.url}/>
                //   : null
            }

            <ActionSheet
                ref={categoryActionSheetREL}
                title={'请选择操作'}
                options={['取消', '添加节点', '编辑', '移至顶部']}
                cancelButtonIndex={0}
                onPress={handleCategoryActionSheetSelected}
            />

            <ActionSheet
                ref={leafActionSheetREL}
                title={'请选择操作'}
                options={['取消', '编辑', '移至顶部']}
                cancelButtonIndex={0}
                // destructiveButtonIndex={2}
                onPress={handleLeafActionSheetSelected}
            />

            <View style={{ flex: 1, backgroundColor: theme.navigationTabBarBackgound, }}>
                <ScreenHeader
                    right={
                        <TouchView onPress={handleJumpDetail}>
                            <View style={{
                                marginRight: 20,
                                // backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: theme.grey[0],
                                    fontSize: 16,
                                }}>编辑</Text>
                            </View>
                        </TouchView>
                    }
                    navigation={navigation}
                    safeArea={true} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        // height: '100%',
                    }}
                    style={{ flex: 1, }}>

                    <DetailHead payload={data} imageSize={imageSize} navigation={navigation} theme={theme} />

                    <ScrollableTabView
                        prerenderingSiblingsNumber={Infinity}
                        style={{
                            marginLeft: 15,
                            marginRight: 15,
                        }}
                        renderTabBar={payload => <TabBar width={scrollViewWidth} {...payload} />} >
                        <ScrollItem
                            tabLabel='要点'
                            type={ScrollType.features}
                            width={scrollViewWidth}
                            navigation={navigation}
                            handleCategoryActionSheet={handleCategoryActionSheet}
                            handleLeafActionSheet={handleLeafActionSheet}
                            node={data}
                            data={data.features}
                            theme={theme} />

                        <ScrollItem
                            tabLabel='文章'
                            type={ScrollType.article}
                            width={scrollViewWidth}
                            navigation={navigation}
                            handleCategoryActionSheet={handleCategoryActionSheet}
                            handleLeafActionSheet={handleLeafActionSheet}
                            node={data}
                            data={data.article}
                            theme={theme} />

                        {/* <ScrollItem
                            tabLabel='API'
                            type='api'
                            width={scrollViewWidth}
                            navigation={navigation}
                            handleLeafActionSheet={handleLeafActionSheet}
                            node={data}
                            data={data.api}
                            theme={theme} /> */}
                    </ScrollableTabView>
                </ScrollView>
            </View>
        </ImageBackground >
    )
}

export const ScrollItem = ({
    tabLabel,
    navigation,
    handleCategoryActionSheet,
    handleLeafActionSheet,
    type,
    node,
    data,
    theme,
    width,
}) => {

    const fixData = R.values(data)

    return (
        <View style={{
            paddingBottom: 30,
            width,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
            }}>
                <TouchView onPress={() => navigation.push('unitEditNodeCategoryView', { node, type, id: null, })}>
                    <View style={{
                        width: 40,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                        borderRadius: 20,
                        marginBottom: 10,
                        borderStyle: 'dashed',
                        borderWidth: theme.borderWidth,
                        borderColor: theme.borderColor,
                        backgroundColor: 'white',
                    }}>
                        <Icon name={'plus-circle-outline'} size={18} color={theme.grey[0]} />
                    </View>
                </TouchView>
            </View>

            <IfElse test={fixData && fixData.length > 0} fnode={() => (
                <View style={{
                    flex: 1,
                    height: 500,
                    paddingTop: 100,
                    alignItems: 'center',
                }}>
                    <DefText>暂无数据</DefText>
                </View>
            )} tnode={() => (
                <UnitItemList
                    data={fixData}
                    handleCategoryActionSheet={(category) => handleCategoryActionSheet(type, category)}
                    handleDotPress={(categoryId, leaf) => handleLeafActionSheet(type, categoryId, leaf)}
                    handlePress={item => {
                        R.cond([
                            [
                                R.equals('code'),
                                () => navigation.push('unitDetailCodeView', { payload: item }),
                            ],
                            [
                                R.equals('webview'),
                                () => navigation.push('readWebview', item),
                            ],
                        ])(item.jump)
                    }} />
            )} />

        </View>
    )
}
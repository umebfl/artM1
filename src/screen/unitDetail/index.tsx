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
    Animated,
    Clipboard,
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import ActionSheet from 'react-native-actionsheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Context from '../../reducer'
import ScrollableTabBar from '../../component/ScrollableTabBar'
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
import { IfElse, RMap, When } from '../../util/jsx'
import { moveToPostion } from '../unitEditCategoryView'
import { FScrollView } from '../../component/FixNative'
import { calStepVal } from '../../component/SwipeList'
import SimpleScreen from '../../component/View/SimpleScreen'
import { WingBlank, WhiteSpace, Padding, } from '../../component/View/Padding'

enum ScrollType {
    features = 'features',
    article = 'article'
}

export const DetailHead = ({ payload, imageSize, navigation, theme }) => {

    const handlePress = text => {
        // Clipboard.setString(text)
        navigation.push('readWebview', { url: payload.url, })
    }

    return (
        <View style={{
            flexDirection: 'row',
            // paddingLeft: 26,
            // paddingRight: 26,
            marginBottom: 20,
            // height: 160,
            // backgroundColor: 'rgba(100, 100, 100, 0.2)',
        }}>
            {
                payload.logo
                    ? <UnitLogo style={{ marginRight: 16, }} data={payload.logo} size={imageSize} ></UnitLogo>
                    : null
            }
            <View style={{
                flex: 1,
                paddingTop: 4,
                // backgroundColor: 'rgba(100, 100, 100, 0.2)',
            }}>
                <MidTitle numberOfLines={3}>{payload.name || payload.title}</MidTitle>

                <DefText numberOfLines={3} style={{ fontSize: 14, marginTop: 6, }}>{payload.def}</DefText>

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
    const [opened, setOpened] = useState(false)

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
    const scrollViewWidth = Dimensions.get('window').width - 30

    const pathToNode = ['data', 'node', mod, id]

    useEffect(() => {
        info('[节点详情页]初始化完成')

        setOpened(true)
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
            moveToPostion({
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
            moveToPostion({
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

    const viewNode = useMemo(
        () => (
            <WingBlank>
                <ActionSheet
                    ref={categoryActionSheetREL}
                    title={'请选择操作'}
                    options={['取消', '添加节点', '编辑', '移至顶部']}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={3}
                    onPress={handleCategoryActionSheetSelected}
                />

                <ActionSheet
                    ref={leafActionSheetREL}
                    title={'请选择操作'}
                    options={['取消', '编辑', '移至顶部']}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={handleLeafActionSheetSelected}
                />

                <DetailHead payload={data} imageSize={imageSize} navigation={navigation} theme={theme} />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderTopColor: theme.borderColor,
                    borderTopWidth: theme.borderWidth,
                }}>
                    <FScrollView style={{ padding: 0, }}
                        scrollConf={{
                            showsHorizontalScrollIndicator: false,
                            horizontal: true,
                        }}>
                        <RMap data={[
                            {
                                title: '主要',
                                version: data.major ? '是' : '否',
                            },
                            {
                                title: '目标',
                                version: data.ftStep,
                            },
                            {
                                title: '进度',
                                version: R.compose(
                                    v => v === 100 ? '完成' : `${v}%`,
                                )(calStepVal(data.ftStep, data.step)),
                            },
                            {
                                title: '版本',
                                version: data.version || '-',
                            },
                            {
                                title: '平台',
                                version: data.platform,
                                last: true,
                            },
                        ]} node={(v, k) => (
                            <View key={k} style={{
                                width: 90,
                                height: 80,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <DefText style={{
                                    fontSize: 11,
                                }}>{v.title}</DefText>
                                <View style={{
                                    borderRightColor: theme.borderColor,
                                    borderRightWidth: v.last ? 0 : theme.borderWidth,
                                    width: '100%',
                                    height: 45,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Title style={{ fontSize: 16, color: theme.grey[2], fontWeight: 'bold', }}>{v.version}</Title>
                                </View>
                            </View>
                        )}></RMap>
                    </FScrollView>
                </View>
            </WingBlank>
        ), [data])

    const featuresNode = useMemo(
        () => {
            info('[featuresNode]执行useMemo')
            return (
                <ScrollItem
                    tabLabel='要点'
                    opened={opened}
                    type={ScrollType.features}
                    width={scrollViewWidth}
                    navigation={navigation}
                    handleCategoryActionSheet={handleCategoryActionSheet}
                    handleLeafActionSheet={handleLeafActionSheet}
                    node={data}
                    data={data.features}
                    theme={theme} />
            )
        }, [data.features, opened]
    )

    const articleNode = useMemo(
        () => {
            info('[articleNode]执行useMemo')
            return (
                <ScrollItem
                    tabLabel='文章'
                    opened={opened}
                    type={ScrollType.article}
                    width={scrollViewWidth}
                    navigation={navigation}
                    handleCategoryActionSheet={handleCategoryActionSheet}
                    handleLeafActionSheet={handleLeafActionSheet}
                    node={data}
                    data={data.article}
                    theme={theme} />
            )
        }, [data.article, opened]
    )

    return (
        <SimpleScreen
            theme={theme}
            noPadding={true}
            formScreen={true}
            navigation={navigation}
            ScreenHeaderConf={{
                title: data.name,
                right: (
                    <TouchView onPress={handleJumpDetail}>
                        <View style={{
                            marginRight: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 40,
                        }}>
                            <DefText style={{ fontSize: 16, }}>编辑</DefText>
                        </View>
                    </TouchView>
                )
            }}
            style={{
                backgroundColor: theme.screenBackgroundColor[theme.model],
            }}>

            {viewNode}

            <ScrollableTabView
                prerenderingSiblingsNumber={Infinity}
                style={{
                    marginLeft: 15,
                    marginRight: 15,
                }}
                renderTabBar={payload => <ScrollableTabBar theme={theme} width={scrollViewWidth} {...payload} />} >

                {featuresNode}
                {articleNode}

            </ScrollableTabView>
        </SimpleScreen>
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
    opened,
}) => {

    let fixData = []
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(                  // 随时间变化而执行动画
            fadeAnim,                       // 动画中的变量值
            {
                toValue: 1,                   // 透明度最终变为1，即完全不透明
                duration: 600,              // 让动画持续一段时间
            }
        ).start()
    }, [])

    if (opened) {
        fixData = R.values(data)
    }

    return (
        <View style={{
            paddingBottom: 30,
            width,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                // backgroundColor: 'red',
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

            <When test={opened} node={() => (
                <Animated.View style={{
                    opacity: fadeAnim,
                }}>
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
                </Animated.View>
            )}></When>
        </View>
    )
}
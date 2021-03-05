import R from 'ramda'
import React, { useContext, useEffect, } from 'react'

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
                <MidTitle>{payload.name || payload.title}</MidTitle>
                <DefText numberOfLines={3} style={{ fontSize: 14, marginTop: 12, }}>{payload.def}</DefText>

                <View style={{
                    marginTop: 30,
                }}>
                    {
                        payload.url
                            ? (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
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
                            )
                            : null
                    }
                </View>
            </View>
        </View>
    )
}

export default ({ route, navigation }) => {
    const { state, dispatch, } = useContext(Context)

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
                            tabLabel='特性'
                            type='features'
                            width={scrollViewWidth}
                            navigation={navigation}
                            node={data}
                            data={data.features}
                            theme={theme} />

                        <ScrollItem
                            tabLabel='文章'
                            type='article'
                            width={scrollViewWidth}
                            navigation={navigation}
                            node={data}
                            data={data.article}
                            theme={theme} />

                        <ScrollItem
                            tabLabel='API'
                            type='api'
                            width={scrollViewWidth}
                            navigation={navigation}
                            node={data}
                            data={data.api}
                            theme={theme} />
                    </ScrollableTabView>
                </ScrollView>
            </View>
        </ImageBackground >
    )
}

export const ScrollItem = ({ tabLabel, navigation, type, node, data, theme, width }) => {

    const fixData = R.values(data)

    return (
        <View style={{
            paddingBottom: 30,
            width: width,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
            }}>
                <TouchView onPress={() => navigation.push('unitEditFeaturesCategoryView', {node: node, type, id: null, })}>
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
                        // opacity: 0.8,
                    }}>
                        <Icon name={'plus-circle-outline'} size={18} color={theme.grey[0]} />
                        {/* <DefText>添加</DefText> */}
                    </View>
                </TouchView>
            </View>

            {
                fixData && fixData.length > 0
                    ? null
                    : (
                        <View style={{
                            flex: 1,
                            height: 500,
                            paddingTop: 100,
                            alignItems: 'center',
                            // backgroundColor: 'red',
                        }}>
                            <DefText>暂无数据</DefText>
                        </View>
                    )
            }
            <UnitItemList data={fixData} handlePress={item => {
                R.cond([
                    [
                        R.equals('detailLv2'),
                        () => navigation.push('unitDetailView', { payload: item }),
                    ],
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
        </View>
    )
}
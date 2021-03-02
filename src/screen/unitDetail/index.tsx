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

const moban = require('../../../resource/image/template/m2.jpeg')

export const DetailHead = ({payload, imageSize, navigation, theme}) => {

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
    } = state

    const { payload, } = route.params

    const imageSize = 124
    const imageInnerSize = 124 * 0.68

    const startTime = new Date()

    useEffect(() => {

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - unitDetail',
                name: '技能详情页',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

    }, [])

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
                <ScreenHeader navigation={navigation} safeArea={true} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        // height: '100%',
                    }}
                    style={{ flex: 1, }}>

                    <DetailHead payload={payload} imageSize={imageSize} navigation={navigation} theme={theme} />

                    <ScrollableTabView
                        prerenderingSiblingsNumber={Infinity}
                        style={{
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        renderTabBar={payload => <TabBar width={Dimensions.get('window').width - 20} {...payload} />} >
                        <ScrollItem tabLabel='特性' navigation={navigation} data={payload.features} />
                        <ScrollItem tabLabel='文章' navigation={navigation} data={payload.article} />
                        <ScrollItem tabLabel='API' navigation={navigation} data={payload.api} />
                    </ScrollableTabView>
                </ScrollView>
            </View>
        </ImageBackground >
    )
}

export const ScrollItem = ({ navigation, data }) => {

    return (
        <View>
            {
                data && data.length > 0
                    ? null
                    : (
                        <View style={{
                            flex: 1,
                            height: 500,
                            paddingTop: 200,
                            alignItems: 'center',
                        }}>
                            <DefText>暂无数据</DefText>
                        </View>
                    )
            }
            <UnitItemList data={data} handlePress={item => {
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
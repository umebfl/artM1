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
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

import { SvgCssUri, SvgXml, } from 'react-native-svg'

import Context from '../../reducer'

import ScreenHeader from '../../component/ScreenHeader'

import TabBar from '../../component/ScrollableTabBar'
import TouchView from '../../component/TouchView'

import { DetailHead, } from '../unitDetail'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import { info } from '../../util/log'
import { RMap, When } from '../../util/jsx'

export default ({ route, navigation }) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const { payload, } = route.params

    const startTime = new Date()

    useEffect(() => {
        info('[代码详情页]初始化完成')

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - unitDetailCode',
                name: '代码详情页',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

        return () => {
            info('[代码详情页]执行卸载')
        }
    }, [])

    const explain = R.values(payload.explain)
    const code = R.values(payload.code)

    return (
        <View style={{ flex: 1, backgroundColor: theme.navigationTabBarBackgound, }}>
            <ScreenHeader navigation={navigation} safeArea={true} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    // height: '100%',
                }}
                style={{ flex: 1, }}>

                <DetailHead payload={payload} navigation={navigation} theme={theme} />

                <View style={{
                    padding: 15,
                }}>
                    <When test={explain.length} node={() => (
                        <>
                            <Title style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>概念</Title>
                            <RMap data={explain} node={(v, k) => (
                                <DefText key={k} numberOfLines={100} style={{ fontSize: 14, marginBottom: 10 }}>
                                    {k + 1}: {v}
                                </DefText>
                            )} />
                        </>
                    )} />

                    <When test={code.length} node={() => (
                        <>
                            <Title style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>例子</Title>
                            <RMap data={code} node={(v, k) => (
                                <View key={k} style={{
                                    marginBottom: 30,
                                }}>
                                    <Text style={{
                                        marginBottom: 10,
                                        color: theme.grey[3],
                                    }}>实例{k + 1}:</Text>
                                    <SyntaxHighlighter
                                        language='javascript'
                                        style={docco}>
                                        {v}
                                    </SyntaxHighlighter>
                                </View>
                            )} />
                        </>
                    )}></When>

                </View>
            </ScrollView>
        </View>
    )
}


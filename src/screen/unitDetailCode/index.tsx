import R from 'ramda'
import React, { useContext, } from 'react'

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

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'

export default ({ route, navigation }) => {
    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const { payload, } = route.params

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.navigationTabBarBackgound, }}>
            <ScreenHeader navigation={navigation} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    // height: '100%',
                }}
                style={{ flex: 1, }}>
                <View style={{
                    padding: 15,
                    // backgroundColor: 'rgba(100, 100, 100, 0.2)',
                    flexDirection: 'row',
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.borderColor,
                }}>
                    <View style={{
                        flex: 1,
                        paddingTop: 4,
                        paddingLeft: 16,
                        // backgroundColor: 'rgba(100, 100, 100, 0.2)',
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <MidTitle>{payload.title}</MidTitle>

                            {
                                payload.url
                                    ? (
                                        <TouchView onPress={() => navigation.push('skill/webview', { url: payload.url, })}>
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
                                    )
                                    : null
                            }
                        </View>
                        <DefText numberOfLines={3} style={{ fontSize: 14, marginTop: 12, }}>{payload.def}</DefText>
                    </View>
                </View>

                <View style={{
                    padding: 15,
                }}>
                    {
                        payload.explain
                            ? (
                                <>
                                    <Title style={{
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                    }}>概念</Title>
                                    {
                                        R.addIndex(R.map)(
                                            (v, k) => <DefText key={k} numberOfLines={100} style={{ fontSize: 14, marginBottom: 10 }}>{k + 1}: {v}</DefText>
                                        )(payload.explain)
                                    }
                                </>
                            )
                            : null
                    }


                    <Title style={{
                        paddingTop: 20,
                        marginBottom: 10,
                    }}>例子</Title>
                    {
                        payload.code
                            ? (
                                R.is(String, payload.code)
                                    ? (
                                        <SyntaxHighlighter
                                            language='javascript'
                                            style={docco}>
                                            {payload.code}
                                        </SyntaxHighlighter>
                                    )
                                    : (
                                        R.addIndex(R.map)(
                                            (v, k) => (
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
                                            )
                                        )(payload.code)
                                    )
                            )
                            : null
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


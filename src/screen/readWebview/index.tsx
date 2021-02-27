import R from 'ramda'
import React, { useState, useContext, useRef, useEffect, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    NativeModules,
    Platform,
    StatusBar,
} from 'react-native'


import { statusBarHeight, } from '../../util/StatusBarManager'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { WebView } from 'react-native-webview'

import TouchView from '../../component/TouchView'
import ScreenHeader from '../../component/ScreenHeader'

import Context from '../../reducer'

// const { StatusBarManager } = NativeModules

// // 刘海屏处理
// let statusBarHeight = 0

// if (Platform.OS === 'ios') {
//     StatusBarManager.getHeight(height => {
//         statusBarHeight = height.height
//     })
// } else {
//     statusBarHeight = StatusBar.currentHeight.height
// }

export default ({ route, navigation }) => {

    // 渲染计时 起始时间
    const startTime = new Date()

    const { url, } = route.params

    const webRef = useRef(null)
    const { state, dispatch, } = useContext(Context)

    const {
        navigation: {
            home: {
                tab,
            },
        },
        theme,
    } = state

    const [currentUrl, setCurrentUrl] = useState(url)
    const [pageTitle, setPageTitle] = useState('')
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)

    const iconSize = 32
    const iconColor = theme.grey[5]
    const iconColorDisable = theme.grey[0]

    // 存在阅读清单内
    const onToRead = R.find(R.propEq('url', currentUrl))(tab.info.tab.toRead.list)

    const handleLeft = () => {
        webRef.current.goBack()
    }

    const handleRight = () => {
        webRef.current.goForward()
    }

    const handleHeart = () => {
        // 
    }

    const handleToRead = () => {
        if (onToRead) {
            dispatch({
                mod: 'info_toRead',
                type: 'del',
                payload: {
                    url: currentUrl,
                },
            })
        } else {
            dispatch({
                mod: 'info_toRead',
                type: 'add',
                payload: {
                    title: pageTitle,
                    def: '--',
                    url: currentUrl,
                },
            })
        }
    }

    const handleReload = () => {
        webRef.current.reload()
    }

    const handleJump = (e) => {
        setCanGoBack(e.canGoBack)
        setCanGoForward(e.canGoForward)
        setCurrentUrl(e.url)
        setPageTitle(e.title)
    }

    const handleToggleFullScreen = () => {
        setFullScreen(!fullScreen)
    }

    useEffect(() => {

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - readWebView',
                name: 'webView',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

    }, [])

    return (
        <View style={{
            flex: 1,
            // paddingTop: statusBarHeight,
            backgroundColor: theme.navigationTabBarBackgound,
        }}>
            {
                fullScreen
                    ? (
                        <View style={{
                            // height: 100,
                            // width: 100,
                            top: statusBarHeight + 4,
                            // bottom: 100,
                            right: 8,
                            // left: 100,
                            position: 'absolute',
                            // backgroundColor: 'red',
                            zIndex: 10,
                        }}>
                            <TouchView onPress={handleToggleFullScreen}>
                                <Icon name={'crop-free'} size={30} color={theme.grey[0]} />
                            </TouchView>
                        </View>
                    )
                    : (
                        <ScreenHeader
                            right={
                                <TouchView onPress={handleToggleFullScreen}>
                                    <Icon style={{ marginRight: 8, }}
                                        name={'crop-free'} size={30} color={theme.grey[0]} />
                                </TouchView>
                            }
                            safeArea={true}
                            navigation={navigation}
                            title={pageTitle} />
                    )
            }

            <WebView
                useWebKit={true}
                startInLoadingState={true}
                onNavigationStateChange={handleJump}
                ref={webRef}
                style={{
                    flex: 1,
                    backgroundColor: theme.navigationTabBarBackgound,
                }} source={{ uri: url }} />

            <View style={{
                // backgroundColor: 'red',
                // paddintBottom: statusBarHeight,
                borderTopWidth: theme.borderWidth,
                borderTopColor: theme.borderColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: fullScreen ? 0 : statusBarHeight + 20,
                overflow: 'hidden',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 4,
                paddingright: 4,
            }}>
                <View style={{
                    width: 100,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <TouchView onPress={handleHeart}>
                        <Icon style={{ width: iconSize, height: iconSize }} name={'heart-multiple-outline'} size={iconSize} color={iconColor} />
                    </TouchView>
                    <TouchView onPress={handleToRead}>
                        <Icon style={{ width: iconSize, height: iconSize }} name={'tooltip-plus-outline'} size={iconSize} color={onToRead ? theme.green[6] : iconColor} />
                    </TouchView>
                </View>
                <View style={{
                    width: 150,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <TouchView onPress={() => canGoBack && handleLeft()}>
                        <Icon style={{ width: iconSize, height: iconSize, }}
                            name={'arrow-left-circle-outline'} size={iconSize} color={canGoBack ? iconColor : iconColorDisable} />
                    </TouchView>
                    <TouchView onPress={() => canGoForward && handleRight()}>
                        <Icon style={{ width: iconSize, height: iconSize, }}
                            name={'arrow-right-circle-outline'} size={iconSize} color={canGoForward ? iconColor : iconColorDisable} />
                    </TouchView>
                    <TouchView onPress={handleReload}>
                        <Icon style={{ width: iconSize, height: iconSize, }} name={'reload'} size={iconSize} color={iconColor} />
                    </TouchView>
                </View>
            </View>
        </View>
    )
}
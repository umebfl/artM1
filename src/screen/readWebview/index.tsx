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

    const iconSize = 34
    const iconColor = theme.grey[5]
    const iconColorDisable = theme.grey[0]

    // 存在阅读清单内
    const info = tab['info']
    const onToRead = R.find(R.propEq('url', currentUrl))(info.toRead)

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

        if(onToRead) {
            return
        }

        dispatch({
            type: 'info_toRead_add',
            payload: {
                title: pageTitle,
                // def: '',
                url: currentUrl,
            },
        })

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

    return (
        <View style={{
            flex: 1,
            // paddingTop: statusBarHeight,
            backgroundColor: theme.navigationTabBarBackgound,
        }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.navigationTabBarBackgound, }}>
                <ScreenHeader navigation={navigation} title={pageTitle} />

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
                    height: 50,
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
                            <Icon style={{ width: iconSize, height: iconSize }} name={'heart-outline'} size={iconSize} color={iconColor} />
                        </TouchView>
                        <TouchView onPress={handleToRead}>
                            <Icon style={{ width: iconSize, height: iconSize }} name={'tooltip-plus-outline'} size={iconSize} color={onToRead ? theme.variable.green[6] : iconColor} />
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
            </SafeAreaView>
        </View>
    )
}
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
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    Button,
} from 'react-native'
import TouchView from '../../TouchView'
import ScreenHeader from '../../ScreenHeader'
import { info, debug, } from '../../../util/log'
import {
    FScrollView,
} from '../../FixNative'
import Context from '../../../reducer'
import { IfElse, When } from '../../../util/jsx'

import { SCREEN_HEADER_HEGIHT, } from '../../ScreenHeader'
import { LargeTitle, MidTitle } from '../../Text'
import { WingBlank, WhiteSpace, Padding, } from '../../../component/View/Padding'

interface Payload {
    navigation: Object
    theme: any
    children?: any
    style?: Object
    ScreenHeaderConf?: Object
    // 是否是表单页面
    formScreen?: boolean
    noPadding?: boolean
    title?: string
    // 不使用Scroll节点
    noScroll?: boolean
}

export default (payload: Payload) => {
    const scrollViewRef = useRef(null)

    const {
        theme,
        navigation,
        children,
        style,
        ScreenHeaderConf,
        formScreen,
        noPadding,
        title,
        noScroll,
    } = payload

    const [headerOpacity, setHeaderOpacity] = useState(noScroll ? 10 : 0)
    const contentHeight = Dimensions.get('window').height - SCREEN_HEADER_HEGIHT + 12

    const handleOnScroll = (ev) => {
        const y = ev.nativeEvent.contentOffset.y

        if (y > -80 && y < 600) {
            setHeaderOpacity(y / 50)
        }
    }

    const rv = (
        <View style={{
            flex: 1,
            backgroundColor: theme.screenBackgroundColor[theme.model],
            ...style,
        }}>
            <ScreenHeader
                headerOpacity={headerOpacity}
                navigation={navigation}
                title={title}
                safeArea={true} {...ScreenHeaderConf} />

            <IfElse test={noScroll} tnode={() => (
                <View style={{
                    height: contentHeight,
                    marginTop: -SCREEN_HEADER_HEGIHT,
                    paddingTop: SCREEN_HEADER_HEGIHT,
                    padding: noPadding ? 0 : 20,
                }}>
                    {children}
                </View>
            )} fnode={() => (
                <FScrollView handleOnScroll={handleOnScroll} style={{
                    padding: noPadding ? 0 : 20,
                    marginTop: -SCREEN_HEADER_HEGIHT,
                    paddingTop: SCREEN_HEADER_HEGIHT,
                }}>
                    <When test={title} node={() => (
                        <LargeTitle>{title}</LargeTitle>
                    )}></When>

                    {children}
                    <View style={{
                        height: SCREEN_HEADER_HEGIHT,
                    }}></View>
                </FScrollView>
            )}></IfElse>
        </View>
    )

    if (formScreen) {
        return (
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, }} >
                {rv}
            </KeyboardAvoidingView>
        )
    } else {
        return rv
    }
}
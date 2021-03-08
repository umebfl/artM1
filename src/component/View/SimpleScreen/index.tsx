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
import Padding from '../../Padding'

import { SCREEN_HEADER_HEGIHT, } from '../../ScreenHeader'

interface Payload {
    navigation: Object
    children?: any
    style?: Object
    ScreenHeaderConf?: Object
    // 是否是表单页面
    formScreen?: boolean
    noPadding?: boolean
}

export default (payload: Payload) => {
    const { state, dispatch, } = useContext(Context)
    const scrollViewRef = useRef(null)

    const {
        theme,
    } = state

    const {
        navigation,
        children,
        style,
        ScreenHeaderConf,
        formScreen,
        noPadding,
    } = payload

    const [headerOpacity, setHeaderOpacity] = useState(0)

    const handleOnScroll = (ev) => {
        const y = ev.nativeEvent.contentOffset.y

        if(y > -80 && y < 600) {
            setHeaderOpacity(y  / 50)
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
                safeArea={true} {...ScreenHeaderConf} />

            <FScrollView handleOnScroll={handleOnScroll} style={{
                padding: noPadding ? 0 : 20,
                marginTop: -SCREEN_HEADER_HEGIHT,
                paddingTop: SCREEN_HEADER_HEGIHT,
            }}>
                {children}
            </FScrollView>
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
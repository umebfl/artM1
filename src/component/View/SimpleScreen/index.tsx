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
import { statusBarHeight, } from '../../../util/StatusBarManager'
import {
    FScrollView,
} from '../../FixNative'
import Context from '../../../reducer'
import { IfElse, When } from '../../../util/jsx'
import Padding from '../../Padding'

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

    const rv = (
        <View style={{
            flex: 1,
            backgroundColor: theme.screenBackgroundColor[theme.model],
            ...style,
        }}>
            <ScreenHeader navigation={navigation} safeArea={true} {...ScreenHeaderConf} />

            <FScrollView style={{
                padding: noPadding ? 0 : 20,
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
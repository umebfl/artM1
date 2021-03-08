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
} from 'react-native'
import TouchView from '../../component/TouchView'
import { info, debug, } from '../../util/log'
import { statusBarHeight, } from '../../util/StatusBarManager'
// import Context from '../../reducer'

interface FScrollViewPayload {
    children?: any
    style?: Object
    scrollConf?: Object
}

export const FScrollView = (payload: FScrollViewPayload) => {
    // const { state, dispatch, } = useContext(Context)

    // const {
    //     theme,
    // } = state

    const {
        children,
        style,
        scrollConf,
    } = payload

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            // keyboardShouldPersistTaps={'never'}
            style={style} {...scrollConf}>
            {children}
            <View style={{ height: statusBarHeight, }}></View>
        </ScrollView>
    )
}
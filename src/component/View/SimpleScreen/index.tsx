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
import TouchView from '../../TouchView'
import ScreenHeader from '../../ScreenHeader'
import { info, debug, } from '../../../util/log'
import { statusBarHeight, } from '../../../util/StatusBarManager'
import {
    FScrollView, 
} from '../../FixNative'
import Context from '../../../reducer'

interface Payload {
    navigation: Object
    children?: any
    style?: Object
    ScreenHeaderConf?: Object
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
    } = payload

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.screenBackgroundColor[theme.model],
            ...style,
        }}>
            <ScreenHeader navigation={navigation} safeArea={true} {...ScreenHeaderConf} />

            <FScrollView>
                {children}
            </FScrollView>
        </View>
    )
}
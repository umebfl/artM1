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
import Context from '../../reducer'
import SimpleScreen from '../../component/View/SimpleScreen'

interface Payload {
}

export default (payload: Payload) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
    } = payload

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            aliginItem: 'center',
            height: 80,
        }}>
            <Text style={{
                color: theme.textLight2,
                fontSize: 11,
            }}>- 已经到底了 -</Text>
        </View>
    )
}
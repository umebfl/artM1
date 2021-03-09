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

const moban = require('../../../resource/image/template/m14.jpeg')

interface Payload {
}

export default (payload: Payload) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    return (
        <ImageBackground source={moban} style={{
            flex: 1,
            resizeMode: 'contain',
            position: 'absolute',
            top: -20,
            right: 0,
            left: 0,
            bottom: -92,
        }}>

        </ImageBackground>
    )
}
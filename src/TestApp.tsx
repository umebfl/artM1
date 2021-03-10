import R from 'ramda'
import React, { createContext, useContext, useCallback, useEffect, useRef, useState, useReducer, useMemo, } from 'react'
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
    Platform,
    Keyboard,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

// import UC from './tmp/useContext'
import { Padding } from './component/View/Padding'

SplashScreen.hide()

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

const initData = {
    counter: 0
}


export default () => {
    console.log('[App]入口')
    const [state, setState] = useState(1)

    // 要保证节点不被无效刷新, 需要手动指定变更时机[]
    const keepNode = useMemo(
        () => (
            <Padding>
                <Text>123</Text>
            </Padding>
        ), []
    )

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => {
                setState(state + 1)
            }}>
                <Text>Test</Text>
            </TouchableWithoutFeedback>
            <Text>{state}</Text>

            {keepNode}
        </SafeAreaView>
    )
}
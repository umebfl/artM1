import R from 'ramda'
import React, { useReducer, useEffect, useState, } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import RootContext, { initState, reducer, } from './reducer'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import Clipboard from '@react-native-community/clipboard'

import SplashScreen from 'react-native-splash-screen'

import data from './data/data.json'

const App = () => {

    useEffect(() => {
        SplashScreen.hide()
    }, [])

    // const node = data.node1

    // const newState = {
    //     server: R.compose(
    //         v => {
    //             let obj = {}

    //             R.map(
    //                 v2 => {
    //                     obj[v2.id] = v2
    //                 }
    //             )(v)

    //             return obj
    //         }
    //     )(node.server),
    //     interactive: R.compose(
    //         v => {
    //             let obj = {}

    //             R.map(
    //                 v2 => {
    //                     obj[v2.id] = v2
    //                 }
    //             )(v)

    //             return obj
    //         }
    //     )(node.interactive),
    //     theory: R.compose(
    //         v => {
    //             let obj = {}

    //             R.map(
    //                 v2 => {
    //                     obj[v2.id] = v2
    //                 }
    //             )(v)

    //             return obj
    //         }
    //     )(node.theory),
    // }

    // Clipboard.setString(JSON.stringify(newState, null, 2))

    return <View></View>
}

export default App
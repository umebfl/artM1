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
import idBuilder from './util/idBuilder'

const arrayToObj = R.compose(
    v => {
        let obj = {}

        R.addIndex(R.map)(
            (v, k) => obj[idBuilder(k)] = v
        )(v)

        return obj
    }
)

const App = () => {

    useEffect(() => {
        SplashScreen.hide()
    }, [])

    const node = data.node

    const fix = R.compose(
        R.map(
            R.compose(
                R.dissoc('website'),
                R.dissoc('doc'),
                R.dissoc('api'),
                v => ({
                    ...v,
                    features: R.map(
                        v2 => ({
                            ...v2,
                            node: R.map(
                                v3 => ({
                                    ...v3,
                                    code: v3.code
                                        ? Array.isArray(v3.code)
                                            ? arrayToObj(v3.code)
                                            : {
                                                [idBuilder(0)]: v3.code
                                            }
                                        : {},
                                    explain: arrayToObj(v3.explain || []),
                                    features: R.map(
                                        v4 => ({
                                            ...v4,
                                            node: R.map(
                                                v5 => ({
                                                    ...v5,
                                                    explain: arrayToObj(v4.explain || []),
                                                    code: v5.code
                                                        ? Array.isArray(v5.code)
                                                            ? arrayToObj(v5.code)
                                                            : {
                                                                [idBuilder(0)]: v5.code
                                                            }
                                                        : {},
                                                })
                                            )(v4.node)
                                        })
                                    )(v3.features || {}),
                                })
                            )(v2.node)
                        }),
                    )(v.features || {}),
                })
            )
        )
    )

    const newNode = {
        server: fix(node.server),
        interactive: fix(node.interactive),
        theory: fix(node.theory),
    }

    Clipboard.setString(JSON.stringify(newNode, null, 2))

    return <Text>{JSON.stringify(newNode.interactive, null, 2)}</Text>
}

export default App



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
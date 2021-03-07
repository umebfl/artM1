
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

interface WhenPayload {
    node: () => any
    test: any
}
export const When = (payload: WhenPayload) => {

    const {
        node,
        test,
    } = payload

    return (
        test ?  node() : null
    )
}

interface IfElsePayload {
    fnode: () => any
    tnode: () => any
    test: any
}
export const IfElse = (payload: IfElsePayload) => {

    const {
        tnode,
        fnode,
        test,
    } = payload

    return <View>{test ?  tnode() : fnode()}</View>
}

interface RMapPayload {
    node: (val: any, key: number) => Object
    data: any[]
}
export const RMap = (payload: RMapPayload) => {

    const {
        node,
        data,
    } = payload

    return (
        R.addIndex(R.map)(
            node
        )(data)
    )
}
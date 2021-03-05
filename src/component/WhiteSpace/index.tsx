import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'

import Context from '../../reducer'

interface payload {
    size?: String
    children?: any
    style?: any
}

export default (payload: payload) => {

    const {
        size,
        children,
        style,
    } = payload

    const { 
        state: {
            theme,
        },
    } = useContext(Context)

    const num = size ? theme.size[size] : theme.size.md

    return (
        <View style={{ ...style, marginTop: num, marginBottom: num, }}>
            {
                children ? children : null
            }
        </View>
    )
}

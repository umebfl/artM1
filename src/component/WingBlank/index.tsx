import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'

import Context from '../../reducer'

interface payload {
    size?: number
    children?: any
    style?: any
}

export default (payload: payload) => {

    const {size, children, style} = payload

    const { state:
        {
            theme,
        },
    } = useContext(Context)

    const num = size ? theme.size[size] : theme.size.md

    return (
        <View style={{ marginLeft: num, marginRight: num, ...style, }}>
            {
                children ? children : null
            }
        </View>
    )
}

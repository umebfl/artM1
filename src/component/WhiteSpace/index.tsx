import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'

import Context from '../../reducer'

export default ({size, children, style}) => {

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

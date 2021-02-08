import React, { useContext, useEffect, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import Context from '../../reducer'

export default () => {

    const { state, dispatch, } = useContext(Context)

    return (
        <View style={{
            flex: 1,
            height: 20,
            marginTop: 50,
        }}>
            <Text>skill</Text>
        </View>
    )
}
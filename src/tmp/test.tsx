import React, { useContext, useEffect, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import Context from '../reducer'

export default () => {

    const { state, dispatch, } = useContext(Context)

    // const {
    //     system,
    // } = state
    // useEffect(() => {

    // })

    return (
        <View style={{
            backgroundColor: 'red',
            flex: 1,
            height: 20,
            marginTop: 50,
        }}>
            <Button onPress={() => {
                dispatch({ type: 'debug_count', })
            }} title={'xxs'}/>
            <Text>state: {JSON.stringify(state)}</Text>
            <Text>count1: {state.debug.count}</Text>
        </View>
    )
}
import React, { useContext, useEffect, useMemo, } from 'react'

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

    const count2 = state.debug.count2

    const text = useMemo(
        () => <Text>count2: {state.debug.count2} - {state.debug.count}</Text>,
        [count2]
    )

    return (
        <View style={{
            backgroundColor: 'red',
            flex: 1,
            height: 20,
        }}>
            <Button onPress={() => {
                dispatch({ type: 'debug_count2', })
            }} title={'xxs'}/>
            <Text>count: {state.debug.count}</Text>
            {/* <Text>count2: {state.debug.count2}</Text> */}
            {text}
        </View>
    )
}
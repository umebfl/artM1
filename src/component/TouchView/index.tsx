import React from 'react'

import { useSetState } from 'ahooks'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

import Animated, { Easing, } from 'react-native-reanimated'

interface State {
    scale: number;
}

interface payload {
    children: any
}

export default (payload: payload) => {

    const {
        children,
    } = payload

    const [state, setState] = useSetState<State>({
        scale: new Animated.Value(1),
    })

    const scaleAnimated = Animated.timing(
        state.scale,
        {
            toValue: 0.94,
            duration: 120,
            easing: Easing.linear,
        }
    )

    const startAnimated = () => {
        scaleAnimated.start(() => {
            // setState(new Animated.Value(1))
        })
    }

    return (
        <TouchableWithoutFeedback
            onPressIn={() => {
                startAnimated()
            }}
            onPressOut={() => {
                // setState(1)
                setState({
                    scale: new Animated.Value(1),
                })
            }}
            {...payload}>
            <Animated.View
                style={{
                    transform: [{ scale: state.scale }],
                }}>
                {children ? children : null}
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

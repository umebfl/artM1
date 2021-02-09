import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'

import Context from '../../reducer'

const BaseTitle = payload => {
    const {
        children,
    } = payload

    return (
        <Text {...payload} style={{ ...payload.style, }}>{children ? children : ''}</Text>
    )
}

export const LargeTitle = payload => <BaseTitle {...payload} style={{fontSize: 34, fontWeight: 'bold', ...payload.style, }}/>

export const MidTitle = payload => {
    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    return (
        <BaseTitle numberOfLines={1} ellipsizeMode={'tail'} {...payload} style={{
            color: theme.grey[7], fontSize: 22, fontWeight: 'bold', ...payload.style, 
        }}/>
    )
}

export const Title = payload => {
    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    return (
        <BaseTitle {...payload} style={{
            color: theme.grey[6], fontSize: 17, ...payload.style, 
        }}/>
    )
}

export const DefText = payload => {
    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const color = theme.grey[1]

    return <BaseTitle numberOfLines={1} ellipsizeMode={'tail'} {...payload} style={{fontSize: 12.5, color: color, ...payload.style, }}/>
}

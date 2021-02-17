import R from 'ramda'
import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WhiteSpace'

import Context from '../../reducer'

export default payload => {
    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        title,
        children,
    } = payload

    return (
        <WingBlank style={{
            backgroundColor: 'white',
            borderRadius: 10,
            // opacity: 0.8,
            marginTop: 12,
        }}>
            <View style={{
                padding: 13,
                borderColor: theme.borderColor,
                borderBottomWidth: theme.borderWidth,
            }}>
                <Text style={{
                    fontSize: 16,
                    color: theme.textLight,
                }}>{title}</Text>
            </View>
            { children && children}
        </WingBlank>
    )
}

export const Item = payload => {
    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        title,
        icon,
    } = payload

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 13,
            marginBottom: 13,
        }}>
            <Icon style={{
                marginLeft: 6,
                marginRight: 8,
            }} name={icon} size={26} color={theme.textNormal} />
            <Text style={{
                flex: 1,
                fontSize: 17,
                color: theme.textNormal,
            }}>{title}</Text>
            <Icon name={'chevron-right'} size={30} color={theme.textLight} />
        </View>
    )
}
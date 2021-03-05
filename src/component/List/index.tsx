import R from 'ramda'
import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Switch,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WhiteSpace'
import TouchView from '../../component/TouchView'
import { DefText, } from '../../component/Text'

import Context from '../../reducer'

interface payload {
    title?: String
    children?: any
}

export default (payload: payload) => {
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
            borderRadius: 12,
            opacity: 0.8,
            marginTop: 20,
        }}>
            {
                title
                    ? (
                        <View style={{
                            padding: 15,
                            borderColor: theme.borderColor,
                            borderBottomWidth: theme.borderWidth,
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: theme.textLight2,
                            }}>{title}</Text>
                        </View>
                    )
                    : null
            }
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
        jumpTo,
        handlePress,
        navigation,
        type,
        value,
    } = payload

    return (
        <TouchView onPress={
            () => {
                handlePress
                    ? handlePress()
                    : jumpTo
                        ? navigation.push(jumpTo)
                        : null
            }
        }>
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

                {
                    jumpTo
                        ? <Icon name={'chevron-right'} size={30} color={theme.textLight} />
                        : null
                }
                {
                    R.cond([
                        [
                            R.equals('switch'),
                            () => (
                                <Switch
                                    onValueChange={handlePress}
                                    value={value}
                                />
                            ),
                        ],
                        [
                            R.equals('msg'),
                            () => (
                                <DefText>{value}</DefText>
                            ),
                        ],
                        [
                            R.T,
                            () => null
                        ],
                    ])(type || '')
                }
            </View>
        </TouchView>
    )
}
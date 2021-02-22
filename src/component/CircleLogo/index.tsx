import R from 'ramda'
import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    Image,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SvgCssUri, SvgXml, } from 'react-native-svg'
import Context from '../../reducer'

interface unitLogoPlayload {
    size: number
    data?: {
        url: String,
        type: string,
        bg?: String,
    }
}

export default (payload: unitLogoPlayload) => {

    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        size,
        data,
    } = payload

    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size,
            borderWidth: theme.borderWidth,
            borderColor: theme.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: data.bg ? data.bg : 'white',
        }}>
            {
                R.cond([
                    [
                        R.equals('svg'),
                        () => <SvgCssUri width={size} height={size} uri={data.url} />,
                    ],
                    [
                        R.anyPass([R.equals('jpg'), R.equals('png'), R.equals('jpeg')]),
                        () => <Image source={{ uri: data.url }} style={{ borderRadius: size, resizeMode: 'cover', width: size, height: size, }} />,
                    ],
                    [
                        // R.anyPass([R.isEmpty, R.equals('icon')]),
                        R.T,
                        () => <Icon name={data ? data.url : 'github'} size={size} color={theme.main} />,
                    ],
                ])(data ? data.type : '')
            }
        </View>
    )
}
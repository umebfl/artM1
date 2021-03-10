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
import { info } from '../../util/log'

interface unitLogoPlayload {
    theme: any
    size: number
    radius?: number
    data?: {
        url: String
        type: string
        bg?: String
        full?: boolean
    }
}

export default (payload: unitLogoPlayload) => {
    const {
        theme,
        size,
        radius,
        data,
    } = payload

    const iconInnerSize = size * (data.full ? 1 : 0.6)

    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: radius ? radius : size,
            borderWidth: data.full ? 0 : theme.borderWidth,
            borderColor: theme.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: data.bg ? data.bg : 'white',
        }}>
            {
                R.cond([
                    [
                        R.equals('svg'),
                        () => <SvgCssUri width={iconInnerSize} height={iconInnerSize} uri={data.url} />,
                    ],
                    [
                        R.anyPass([R.equals('jpg'), R.equals('png'), R.equals('jpeg')]),
                        () => <Image source={{ uri: data.url }} style={{ borderRadius: radius ? radius : size, resizeMode: 'contain', width: iconInnerSize, height: iconInnerSize, }} />,
                    ],
                    [
                        // R.anyPass([R.isEmpty, R.equals('icon')]),
                        R.T,
                        () => <Icon name={data ? data.url : 'github'} size={iconInnerSize} color={theme.main} />,
                    ],
                ])(data ? data.type : '')
            }
        </View>
    )
}
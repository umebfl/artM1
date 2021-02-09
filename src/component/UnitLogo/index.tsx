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

    const iconInnerSize = size * 0.68

    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size * 0.2,
            borderWidth: theme.borderWidth,
            borderColor: theme.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: data ? data.bg : 'white',
        }}>
            {
                R.cond([
                    [
                        R.equals('svg'),
                        () => <SvgCssUri width={iconInnerSize} height={iconInnerSize * 0.9} uri={data.url} />,
                    ],
                    [
                        R.anyPass([R.equals('jpg'), R.equals('png'), R.equals('jpeg')]),
                        () => <Image source={{ uri: data.url }} style={{ resizeMode: 'contain', width: iconInnerSize * 0.9, height: iconInnerSize * 0.9 }} />,
                    ],
                    [
                        // R.anyPass([R.isEmpty, R.equals('icon')]),
                        R.T,
                        () => <Icon name={data ? data.url : 'github'} size={iconInnerSize * 0.85} color={theme.main} />,
                    ],
                ])(data ? data.type : '')
            }
        </View>
    )
}
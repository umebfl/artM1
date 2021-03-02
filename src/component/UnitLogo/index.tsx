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
    style?: Object
    size: number
    data?: {
        url: String,
        type: string,
        bg?: String,
        full?: boolean
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
        style,
    } = payload

    const full = data ? data.full : false

    const iconInnerSize = size * (full ? 1 : 0.8)

    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size * 0.2,
            // borderWidth: full ? 0 : theme.borderWidth,
            borderWidth: 0,
            borderColor: theme.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: data ? data.bg : 'white',
            overflow: 'hidden',
            ...style,
        }}>
            {
                R.cond([
                    [
                        R.equals('svg'),
                        () => <SvgCssUri width={iconInnerSize} height={iconInnerSize} uri={data.url} />,
                    ],
                    [
                        R.anyPass([R.equals('jpg'), R.equals('png'), R.equals('jpeg')]),
                        () => <Image source={{ uri: data.url }} style={{ resizeMode: 'contain', width: iconInnerSize, height: iconInnerSize }} />,
                    ],
                    [
                        // R.anyPass([R.isEmpty, R.equals('icon')]),
                        R.T,
                        // () => <Icon name={data ? data.url : 'github'} size={iconInnerSize} color={theme.main} />,
                        () => <Image source={{ uri: 'https://th.bing.com/th/id/Rdf6ba7892b3d5a02a46d340966a605f0?rik=H2QtuuCyptfqwQ&riu=http%3a%2f%2fseeklogo.com%2fimages%2fB%2fblue-flower-logo-B85CFDA3AE-seeklogo.com.png&ehk=OpWyAv3Xci4Ad7FtSOISbq0YQJrEyaS7sfbNojhZoQQ%3d&risl=&pid=ImgRaw' }} style={{ resizeMode: 'contain', width: size, height: size }} />,
                    ],
                ])(data ? data.type : '')
            }
        </View>
    )
}
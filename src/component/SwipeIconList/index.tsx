import R from 'ramda'
import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

import CircleLogo from '../../component/CircleLogo'
import TouchView from '../../component/TouchView'
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import { MidTitle, } from '../../component/Text'

import Context from '../../reducer'
import { info } from '../../util/log'
import { useMemo } from 'react/cjs/react.development'
import { When } from '../../util/jsx'

interface payload {
    data: []
    navigation: any
    radius?: number
    title?: String
    onPress?: Function
    theme: any
}

export default (payload: payload) => {

    const {
        theme,
        data,
        title,
        navigation,
        radius,
        onPress,
    } = payload

    return useMemo(
        () => {
            return (
                <View>
                    <When test={ title } node={() => (
                        <WingBlank>
                            <MidTitle>{title}</MidTitle>
                        </WingBlank>
                    )}></When>


                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{
                            // backgroundColor: 'red',
                            paddingTop: 10,
                            paddingLeft: 20,
                            // paddingRight: 20,
                            flexDirection: 'row',
                        }}>
                        {
                            R.addIndex(R.map)(
                                (v, k) => {
                                    const item = v

                                    if (!item) {
                                        return null
                                    }
                                    return (
                                        <TouchView key={k} onPress={() => {
                                            onPress
                                                ? onPress(item)
                                                : navigation.push('readWebview', { url: item.url })
                                        }}>
                                            <View style={{
                                                // backgroundColor: 'red',
                                                width: 70,
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <CircleLogo theme={theme} size={50} radius={radius ? radius : 0} data={item.logo} />
                                                <Text numberOfLines={1} ellipsizeMode={'middle'} style={{
                                                    marginTop: 8,
                                                    fontSize: 12,
                                                    color: theme.textLight2,
                                                }}>{item.name}</Text>
                                            </View>
                                        </TouchView>
                                    )
                                }
                            )(data)
                        }
                        <View style={{ width: 40, }}></View>
                    </ScrollView>
                </View>
            )
        }, [data, title]
    )
}

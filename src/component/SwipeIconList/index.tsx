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
import WingBlank from '../../component/WingBlank'
import { MidTitle, } from '../../component/Text'

import Context from '../../reducer'

interface payload {
    data: []
    navigation: any
    radius: number
    title?: String
    onPress?: Function
}

export default (payload: payload) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        data,
        title,
        navigation,
        radius,
        onPress,
    } = payload

    return (
        <View>
            {
                title
                    ? (
                        <WingBlank>
                            <MidTitle>{title}</MidTitle>
                        </WingBlank>
                    )
                    : null
            }


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
                            return (
                                <TouchView key={k} onPress={() => {
                                    onPress
                                        ? onPress({ payload: v })
                                        : navigation.push('readWebview', { url: v.url })
                                }}>
                                    <View style={{
                                        // backgroundColor: 'red',
                                        width: 70,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <CircleLogo size={50} radius={radius ? radius : 0} data={v.logo} />
                                        <Text numberOfLines={1} ellipsizeMode={'middle'} style={{
                                            marginTop: 8,
                                            fontSize: 12,
                                            color: theme.textLight2,
                                        }}>{v.name}</Text>
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
}

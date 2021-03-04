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
    radius?: number
    title?: String
    onPress?: Function
}

export default (payload: payload) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        data: {
            node,
        },
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
                            const item = v

                            if(!item) {
                                return null
                            }
                            return (
                                <TouchView key={k} onPress={() => {
                                    onPress
                                        ? onPress({ payload: item })
                                        : navigation.push('readWebview', { url: item.url })
                                }}>
                                    <View style={{
                                        // backgroundColor: 'red',
                                        width: 70,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <CircleLogo size={50} radius={radius ? radius : 0} data={item.logo} />
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
}

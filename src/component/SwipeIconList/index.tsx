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

import Context from '../../reducer'

interface payload {
    data: [],
    navigation: any,
}

export default (payload: payload) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        data,
        navigation,
    } = payload

    return (
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
                                navigation.push('readWebview', { url: v.url })
                            }}>
                                <View style={{
                                    // backgroundColor: 'red',
                                    width: 70,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <CircleLogo size={50} data={v.logo} />
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
    )
}

import R from 'ramda'
import React, { useContext, useState, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import Clipboard from '@react-native-community/clipboard'

import JSONTree from 'react-native-json-tree'
import Toast from 'react-native-root-toast'


import ScreenWrapper from '../../../component/ScreenWrapper'
import ScreenHeader from '../../../component/ScreenHeader'
import WingBlank from '../../../component/WingBlank'
import WhiteSpace from '../../../component/WhiteSpace'
import UnitItemList from '../../../component/UnitItemList'

import { debug, logState, level, } from '../../../util/log'

import Context from '../../../reducer'

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state


    return (
        <ScreenWrapper navigation={navigation} theme={theme} imageBackground={null} LinearGradientBackground={false} >
            <ScreenHeader navigation={navigation} />

            <View style={{ padding: 5,  }}>
                {
                    R.addIndex(R.map)(
                        (v, k) => (
                            <View key={k} style={{
                                flexDirection: 'row',
                                // overflow: 'hidden',
                                paddingTop: 10,
                            }}>
                                <Text style={{ marginRight: 5, fontSize: 12, }}>
                                    {v.time.toLocaleTimeString()}
                                </Text>
                                <Text style={{ marginRight: 5, color: theme.main, fontSize: 12, }}>
                                    {
                                        v.lv === level.debug
                                            ? 'Debug'
                                            : v.lv === level.info
                                                ? 'Info'
                                                    : v.lv === level.warning
                                                        ? 'Earning'
                                                        : 'Error'
                                    } 
                                </Text>
                                <Text style={{ flex: 1, fontSize: 12, marginTop: 2, }}>
                                    {v.msg}
                                </Text>
                            </View>
                        )
                    )(logState)
                }
            </View>
        </ScreenWrapper>
    )
}
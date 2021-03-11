import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
    Clipboard,
    TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TouchView from '../../component/TouchView'
import { info, debug, } from '../../util/log'
import Context from '../../reducer'
import SimpleScreen from '../../component/View/SimpleScreen'
import { SkillUnitFeatures } from '../../variable'
import { DetailCodeContent } from '../unitDetailCode'
import { FScrollView } from '../../component/FixNative'
import { WingBlank, WhiteSpace, Padding, } from '../../component/View/Padding'

interface Payload {
    navigation: any
    route: {
        params: {
            leaf: SkillUnitFeatures
        }
    }
}

export default (payload: Payload) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        navigation,
        route: {
            params: {
                leaf,
            },
        },
    } = payload

    const handleClosePress = () => {
        navigation.goBack()
    }

    return (
        <View style={{
            height: '100%',
            backgroundColor: theme.screenBackgroundColor[theme.model],
            borderRadius: 20,
            jusitfyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <View
                style={{
                    position: 'absolute',
                    right: 15,
                    top: 10,
                    opacity: 0.4,
                }}>
                <TouchView onPress={handleClosePress}>
                    <Icon
                        style={{
                            width: 40,
                            height: 40,
                            // backgroundColor: 'red',
                            textAlign: 'center',
                        }}
                        name={'close-circle-outline'}
                        size={28}
                        color={theme.grey[0]} />
                </TouchView>
            </View>

            <View style={{
                width: 100,
                backgroundColor: theme.grey[6],
                height: 4,
                marginTop: 15,
                marginBottom: 15,
                borderRadius: 5,
            }}>
            </View>
            <FScrollView style={{
                flex: 1,
                width: '100%',
            }}>
                <WingBlank>
                    <DetailCodeContent leaf={leaf} />
                </WingBlank>
            </FScrollView>
        </View>
    )
}
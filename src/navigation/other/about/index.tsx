import React, { useContext, useEffect, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    Image,
    ImageBackground,
    Dimensions,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ScreenWrapper from '../../../component/ScreenWrapper'
import ScreenHeader from '../../../component/ScreenHeader'
import SearchWrapper from '../../../component/SearchWrapper'
import WingBlank from '../../../component/WingBlank'
import WhiteSpace from '../../../component/WhiteSpace'
import UnitItemList from '../../../component/UnitItemList'
import { Title, DefText, } from '../../../component/Text'

import Context from '../../../reducer'

import { info, } from '../../../util/log'

const logo = require('../../../../resource/image/logo/todo_180.jpg')
const moban = require('../../../../resource/image/template/m12.jpeg')

interface ItemPlayload {
    title: String
    msg: String
    last: boolean
}

const Item = (payload: ItemPlayload) => {

    const { state, dispatch, } = useContext(Context)

    return (
        <View style={{
            backgroundColor: 'white',
            paddingLeft: 15,
        }}>
            <View style={{
                height: 55,
                paddingRight: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: payload.last ? 0 : state.theme.borderWidth,
                borderBottomColor: state.theme.borderColor,
            }}>
                <View>
                    <Title>{payload.title}</Title>
                </View>
                <View>
                    <DefText>{payload.msg}</DefText>
                </View>
            </View>
        </View>
    )
}

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        search,
    } = state

    info('futu render')

    return (

        <ImageBackground source={null} style={{
            flex: 1,
            resizeMode: 'contain',
        }}>
            <View style={{
                // backgroundColor: 'red',
                // opacity: 0.2,
                flex: 1,
            }}>
                <ScreenHeader navigation={navigation} title={'关于Skill'} safeArea={true} />

                <ScrollView style={{
                    backgroundColor: 'rgb(247, 248, 249)',
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 210,
                    }}>
                        <Image source={logo} style={{ borderRadius: 24, resizeMode: 'contain', width: 110, height: 110, }} />
                    </View>

                    <View style={{
                        marginTop: 8,
                    }}>
                        <Item title={'当前版本'} msg={'2.0.3'}></Item>
                        <Item title={'新版更新'} msg={'无新版'} last={true}></Item>
                    </View>

                    <View style={{
                        marginTop: 300,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        aliginItems: 'center',
                    }}>
                        <DefText style={{ fontStyle: 'italic', fontSize: 12, }}>By HuangAnqi with </DefText>
                        <Icon name={'heart-multiple-outline'} size={12} color={theme.grey[0]} />
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
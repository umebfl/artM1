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

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SvgCssUri, SvgXml, } from 'react-native-svg'
import ActionSheet from 'react-native-actionsheet'

import Context from '../../reducer'

import ScreenHeader from '../../component/ScreenHeader'

import TabBar from '../../component/ScrollableTabBar'
import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'
import UnitItemList from '../../component/UnitItemList'
import Padding from '../../component/Padding'
import WhiteSpace from '../../component/WhiteSpace'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import WingBlank from '../../component/WingBlank'

export default ({ route, navigation }) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        data: {
            node,
        },
    } = state

    const {
        params: {
            nodeId,
        },
    } = route

    const data = node[nodeId]

    return (
        <View style={{
            flex: 1,
            // backgroundColor: 'rgb(247, 248, 249)',
            backgroundColor: 'white',
            paddingBottom: 20,
        }}>
            <ScreenHeader navigation={navigation} title={`编辑 - ${data.name}`} safeArea={true} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <WhiteSpace>
                    <WingBlank>
                        <MidTitle>{data.name}</MidTitle>
                        
                        {
                            R.addIndex(R.map)(
                                (v, k) => {

                                    return (
                                        <View>
                                            <MidTitle>{v.name}</MidTitle>
                                            <View>
                                            </View>
                                        </View>

                                    )
                                }
                            )([
                                {
                                    name: '特征',
                                    data: data.features,
                                },
                                {
                                    name: '文章',
                                    data: data.article,
                                },
                                {
                                    name: 'API',
                                    data: data.api,
                                },
                            ])
                        }
                    </WingBlank>

                </WhiteSpace>
            </ScrollView>
        </View >
    )
}
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
import Paragraph from '../../component/Paragraph'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import WingBlank from '../../component/WingBlank'
import { T } from 'ts-toolbelt'

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
                <Padding>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}>
                        <MidTitle>{data.name}</MidTitle>
{/* 
                        <TouchView onPress={() => { }}>
                            <Icon
                                name={'circle-edit-outline'}
                                size={20}
                                color={theme.main}
                                style={{ padding: 5, opacity: 0.8, }} />
                        </TouchView> */}
                    </View>

                    {/* <Paragraph handleSave={(val) => { alert(val) }} theme={theme} defaultValue={data.def}>
                        <DefText>{data.def}</DefText>
                    </Paragraph> */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <DefText>{data.def}</DefText>
                        {/* <TouchView onPress={() => { }}>
                            <Icon
                                name={'circle-edit-outline'}
                                size={14}
                                color={theme.main}
                                style={{ padding: 5, opacity: 0.8, }} />
                        </TouchView> */}
                    </View>
                </Padding>

            <ScrollableTabView
                prerenderingSiblingsNumber={Infinity}
                style={{
                    marginLeft: 20,
                    marginRight: 20,
                    // backgroundColor: 'red',
                }}
                renderTabBar={payload => <TabBar width={Dimensions.get('window').width - 40} {...payload} />} >
                {
                    R.addIndex(R.map)(
                        (v, k) => {
                            const fixData = R.values(v.data)

                            return (
                                <View tabLabel={v.name} style={{
                                    height: 500,
                                }}>
                                    <UnitItemList data={fixData} handlePress={item => { }} />
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
            </ScrollableTabView>
            </ScrollView>
        </View >
    )
}
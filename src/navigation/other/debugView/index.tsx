import R from 'ramda'
import React, { useContext, useState, useEffect, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    FlatList,
} from 'react-native'

import Clipboard from '@react-native-community/clipboard'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import JSONTree from 'react-native-json-tree'
import Toast from 'react-native-root-toast'

import ScreenWrapper from '../../../component/ScreenWrapper'
import ScreenHeader from '../../../component/ScreenHeader'
import { WingBlank, WhiteSpace, } from '../../../component/View/Padding'
import UnitItemList from '../../../component/UnitItemList'
import TouchView from '../../../component/TouchView'

import { debug, logState, level, clear, } from '../../../util/log'

import Context from '../../../reducer'
import { fixZeroStart, } from '../../../util/string'
import SimpleScreen from '../../../component/View/SimpleScreen'

export default ({ navigation, }) => {
    const { state, dispatch, } = useContext(Context)

    const [log, setLog] = useState(logState)

    const {
        theme,
    } = state

    const handleClear = () => {
        clear()
        setLog([])
    }

    return (
        <SimpleScreen
            theme={theme}
            formScreen={true}
            navigation={navigation}
            ScreenHeaderConf={{
                title: '调试面板',
                right: (
                    <TouchView onPress={handleClear}>
                        <Icon style={{ width: 44, }} name={'delete-circle-outline'} size={32} color={theme.main} />
                    </TouchView>
                )
            }}
            style={{
                // backgroundColor: theme.screenBackgroundGreyColor,
            }}>

            <FlatList data={log}
                initialNumToRender={30}
                showsVerticalScrollIndicator={false}
                // 会导致白屏不显示数据
                // removeClippedSubviews={true}
                ListFooterComponent={() => {
                    if (log.length) {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                aliginItem: 'center',
                            }}>
                                <Text style={{
                                    color: theme.textLight2,
                                    fontSize: 11,
                                }}>- 已经到底了 -</Text>
                            </View>
                        )
                    }
                    return null
                }}
                ListEmptyComponent={() => (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        aliginItem: 'center',
                        marginTop: 100,
                    }}>
                        <Text style={{
                            color: theme.textLight2,
                        }}>暂无日志</Text>
                    </View>
                )}
                renderItem={({ item, index, separators }) => (
                    <WingBlank key={index} style={{
                        flexDirection: 'row',
                        paddingBottom: 10,
                    }}>
                        <Text style={{ marginRight: 5, fontSize: 12, width: 70, }}>
                            {
                                fixZeroStart(item.time.getMinutes(), 2)
                            }:{
                                fixZeroStart(item.time.getSeconds(), 2)
                            }.{
                                fixZeroStart(item.time.getMilliseconds(), 3)
                            }
                        </Text>
                        <Text style={{ marginRight: 5, color: theme.main, fontSize: 12, }}>
                            {
                                item.lv === level.debug
                                    ? 'Debug'
                                    : item.lv === level.info
                                        ? 'Info'
                                        : item.lv === level.warning
                                            ? 'Earning'
                                            : 'Error'
                            }
                        </Text>
                        <Text style={{ flex: 1, fontSize: 12, marginTop: 2, }}>
                            {item.msg}
                        </Text>
                    </WingBlank>
                )}>

            </FlatList>
        </SimpleScreen>
    )
}
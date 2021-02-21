import R from 'ramda'
import React, { useContext, useState, } from 'react'

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
import WingBlank from '../../../component/WingBlank'
import WhiteSpace from '../../../component/WhiteSpace'
import UnitItemList from '../../../component/UnitItemList'
import TouchView from '../../../component/TouchView'

import { debug, logState, level, clear, } from '../../../util/log'

import Context from '../../../reducer'

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
        <ScreenWrapper ContentViewType={'view'} navigation={navigation} theme={theme} imageBackground={null} LinearGradientBackground={false} >
            <ScreenHeader navigation={navigation} right={
                <TouchView onPress={handleClear}>
                    <Icon style={{ width: 44, }} name={'delete-circle-outline'} size={32} color={theme.main} />
                </TouchView>
            } />

            <View style={{ padding: 5, }}>
                <FlatList data={log}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    ListFooterComponent={() => {
                        if (log.length) {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    aliginItem: 'center',
                                    paddingBottom: 50,
                                }}>
                                    <Text style={{
                                        color: theme.textLight2,
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
                        <WingBlank key={item.id} style={{
                            flexDirection: 'row',
                            // overflow: 'hidden',
                            paddingBottom: 10,
                        }}>
                            <Text style={{ marginRight: 5, fontSize: 12, }}>
                                {item.time.getMinutes()}:{item.time.getSeconds()}.{item.time.getMilliseconds()}s
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
            </View>
        </ScreenWrapper>
    )
}
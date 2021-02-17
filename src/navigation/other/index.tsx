import React, { useContext, useEffect, useRef, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import Restart from 'react-native-restart'
import ActionSheet from 'react-native-actionsheet'

import ScreenWrapper from '../../component/ScreenWrapper'
import SearchWrapper from '../../component/SearchWrapper'
import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WhiteSpace'
import UnitItemList from '../../component/UnitItemList'
import List, { Item, } from '../../component/List'

import Context from '../../reducer'

import { getData, clearData, } from '../../reducer'

const moban = require('../../../resource/image/template/m11.jpeg')

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)
    const actionSheetREl = useRef(null)

    const {
        theme,
        search,
    } = state

    const handleClearCachePress = async (index) => {
        if(index === 0) {
            await clearData()
            Restart.Restart()
        }
    }

    const handleClearCacheActionSheet = async () => {
        actionSheetREl.current.show()
    }

    return (
        <ScreenWrapper
            navigation={navigation}
            theme={theme}
            imageBackground={null} >

            <ActionSheet
                ref={actionSheetREl}
                title={'确认缓存?'}
                options={['清空缓存', '取消']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={handleClearCachePress}
            />

            <List title={'开发'}>
                <Item title={'数据浏览'} icon={'database-search'} jumpTo={'dataView'} navigation={navigation} />
                <Item title={'调试面板'} icon={'android-debug-bridge'} jumpTo={'setting'} navigation={navigation} />
                <Item title={'清空缓存'} icon={'backup-restore'} handlePress={handleClearCacheActionSheet} />
            </List>

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

        </ScreenWrapper>
    )
}
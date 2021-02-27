import React, { useContext, useEffect, useRef, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    Switch,
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

import { info, } from '../../util/log'

const moban = require('../../../resource/image/template/m11.jpeg')

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)
    const actionSheetREl = useRef(null)

    const {
        theme,
        search,
        debug: {
            open,
        },
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

    const handleDebugModSwitch = () => {
        dispatch({
            mod: 'debug',
            type: 'toggle',
        })
    }

    const startTime = new Date()

    useEffect(() => {
        const endTime = new Date()
    
        dispatch({
          mod: 'debug',
          type: 'renderTime_add',
          payload: {
            // 模块
            mod: 'other',
            name: '其他',
            // startTime,
            // endTime,
            // ms
            time: endTime - startTime,
          },
        })
      }, [])

    info('other render')

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
                <Item title={'调试面板'} icon={'android-debug-bridge'} jumpTo={'debugView'} navigation={navigation} />
                <Item title={'清空缓存'} icon={'backup-restore'} handlePress={handleClearCacheActionSheet} />
                <Item title={'调试模式'} icon={'bug-check-outline'} type='switch' value={open} handlePress={handleDebugModSwitch} />
            </List>

            <List>
                {/* <Item title={'分享Skill'} icon={'checkbox-marked-circle-outline'} jumpTo={'setting'} /> */}
                <Item title={'关于'} icon={'alert-circle-outline'} jumpTo={'about'} navigation={navigation} />
            </List>
        </ScreenWrapper>
    )
}
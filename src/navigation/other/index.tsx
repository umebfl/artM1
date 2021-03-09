import React, { useContext, useEffect, useRef, useState, useMemo, } from 'react'

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

import Clipboard from '@react-native-community/clipboard'

import SearchWrapper from '../../component/SearchWrapper'
import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WhiteSpace'
import UnitItemList from '../../component/UnitItemList'
import List, { Item, } from '../../component/List'

import Context from '../../reducer'

import { getData, clearData, } from '../../reducer'

import { info, } from '../../util/log'
import SimpleScreen from '../../component/View/SimpleScreen'
import { LargeTitle } from '../../component/Text'

export default ({ navigation, }) => {

    info('[其他]: 入口')

    const { state, dispatch, } = useContext(Context)
    const actionSheetREl = useRef(null)
    const [copyed, setCopyed] = useState(false)

    const {
        theme,
        search,
        debug: {
            open,
        },
        navigation: {
            home: {
                tab: {
                    other: {
                        text,
                    },
                },
            },
        },
        data,
    } = state

    const handleClearCachePress = async (index) => {
        if (index === 0) {
            await clearData()
            Restart.Restart()
        }
    }

    const handleClearCacheActionSheet = () => {
        actionSheetREl.current.show()
    }

    const handleProSource = () => {
        navigation.push('readWebview', { url: 'https://gitee.com/huanganqi/artM1', })
    }

    const handleDebugModSwitch = () => {
        dispatch({
            mod: 'debug',
            type: 'toggle',
        })
    }

    const handleCopyData = () => {
        Clipboard.setString(JSON.stringify(state.data, null, 2))
        setCopyed(true)
    }

    const node = useMemo(
        () => {
            info(`模块[其他]]useMemo执行渲染`)

            return (
                <>
                    <ActionSheet
                        ref={actionSheetREl}
                        title={'确认缓存?'}
                        options={['清空缓存', '取消']}
                        cancelButtonIndex={1}
                        destructiveButtonIndex={0}
                        onPress={handleClearCachePress}
                    />

                    <List>
                        <Item title={'显示'} icon={'format-text'} jumpTo={'about'} navigation={navigation} />
                        <Item title={'主题'} icon={'theme-light-dark'} jumpTo={'about'} navigation={navigation} />
                        <Item title={'语言'} icon={'translate'} jumpTo={'about'} navigation={navigation} />
                    </List>

                    <List>
                        {/* <Item title={'分享Skill'} icon={'checkbox-marked-circle-outline'} jumpTo={'setting'} /> */}
                        <Item title={'关于'} icon={'alert-circle-outline'} jumpTo={'about'} navigation={navigation} />
                    </List>
                </>
            )
        }, [])

    return (
        <SimpleScreen
            formScreen={true}
            navigation={navigation}
            style={{
                backgroundColor: theme.screenBackgroundGreyColor[theme.model],
            }}
            ScreenHeaderConf={{
                title: text,
                left: <></>,
            }}>
            
            <LargeTitle>{text}</LargeTitle>

            <List title={'开发'}>
                <Item title={'数据面板'} icon={'database-search'} jumpTo={'dataView'} navigation={navigation} />
                <Item title={'调试面板'} icon={'android-debug-bridge'} jumpTo={'debugView'} navigation={navigation} />
                <Item title={'清空缓存'} icon={'backup-restore'} handlePress={handleClearCacheActionSheet} />
                <Item title={'调试模式'} icon={'bug-check-outline'} type='switch' value={open} handlePress={handleDebugModSwitch} />
                <Item title={'渲染耗时'} icon={'chart-bar'} jumpTo={'renderTime'} navigation={navigation} />
                <Item title={'项目代码'} icon={'github'} handlePress={handleProSource} />
                <Item title={'拷贝系统数据'} icon={'github'} handlePress={handleCopyData} type={'msg'} value={copyed ? '拷贝完成' : ''} />
            </List>

            {node}
        </SimpleScreen>
    )
}
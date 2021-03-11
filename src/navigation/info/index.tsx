import React, { useContext, useEffect, useRef, useMemo, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
} from 'react-native'

import Clipboard from '@react-native-community/clipboard'
import ActionSheet from 'react-native-actionsheet'
import Toast from 'react-native-root-toast'
import Restart from 'react-native-restart'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ScreenWrapper from '../../component/ScreenWrapper'
import SearchWrapper from '../../component/SearchWrapper'
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import UnitItemList from '../../component/UnitItemList'
import SwipeIconList from '../../component/SwipeIconList'

import { getData, clearData, } from '../../reducer'
import Context from '../../reducer'

import { info, } from '../../util/log'
import { When } from '../../util/jsx'
import { calTime } from '../../util/calTime'

export default ({ navigation, }) => {
    // info('[资讯]: 入口')
    const { state, dispatch, } = useContext(Context)
    const actionSheetREl = useRef(null)

    const {
        theme,
        search,
        data: {
            toRead,
            favWebsite,
        },
        debug: {
            open,
        },
    } = state

    const ctimer = calTime('资讯')

    useEffect(() => {
        ctimer.end()
    }, [])

    const handleSubmit = val => {
        navigation.push('readWebview', { url: `${search}${val}`, })
    }

    const handleToReadPress = ({ url, }) => {
        navigation.push('readWebview', { url: url, })
    }

    const handleReload = () => {
        Restart.Restart()
    }

    const handleClearCache = async () => {
        await clearData()
        Restart.Restart()
    }

    const handleCopyData = () => {
        Clipboard.setString(JSON.stringify(state.data, null, 2))
        alert('拷贝成功')
      }

    const handleClearCacheActionSheet = () => {
        actionSheetREl.current.show()
    }

    const handleMore = index => {
        // '清空缓存', 
        // if (index === 0) {
        //     handleClearCache()
        // } else 
        if (index === 1) {
            handleClearCache()
        } else if (index === 2) {
            navigation.push('dataView')
        }
        // '关闭调试', 
        // else if (index === 4) {
        //     dispatch({
        //         mod: 'debug',
        //         type: 'toggle',
        //     })
        // } 
        else if (index === 3) {
            navigation.push('debugView')
        }
        else if (index === 4) {
            handleCopyData()
        } 
    }

    const node = useMemo(
        () => {
            info(`[资讯]]useMemo执行渲染`)
            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScreenWrapper navigation={navigation} theme={theme} imageBackground={null} >
                        <SearchWrapper handleSubmit={handleSubmit} />

                        <WhiteSpace>
                            <SwipeIconList navigation={navigation} theme={theme} data={favWebsite.list} />
                        </WhiteSpace>

                        <WingBlank>
                            <UnitItemList data={[toRead]} showUrl={true} handlePress={handleToReadPress} />
                        </WingBlank>

                        <When test={open} node={() => (
                            <>
                                <ActionSheet
                                    ref={actionSheetREl}
                                    title={'更多调试功能'}
                                    options={['取消', '清空缓存', '查看数据', '调试面板', '拷贝数据',]}
                                    cancelButtonIndex={0}
                                    destructiveButtonIndex={1}
                                    onPress={handleMore}
                                />

                                <Toast
                                    containerStyle={{
                                        backgroundColor: theme.main,
                                        width: 52,
                                        height: 52,
                                        borderRadius: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bottom: 80,
                                        left: 150,
                                        opacity: 0.1,
                                    }}
                                    onPress={handleReload}
                                    // onLongPress={handleClearCache}
                                    visible={true}
                                    // position={Toast.positions.TOP}
                                    // opacity={0.3}
                                    hideOnPress={false}>
                                    <Icon style={{
                                        marginLeft: 6,
                                        marginRight: 8,
                                    }} name={'reload'} size={22} color={'white'} />
                                </Toast>

                                <Toast
                                    containerStyle={{
                                        backgroundColor: theme.main,
                                        width: 32,
                                        height: 32,
                                        borderRadius: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bottom: 75,
                                        left: 100,
                                        opacity: 0.1,
                                        padding: 0,
                                    }}
                                    onPress={handleClearCacheActionSheet}
                                    visible={true}
                                    // position={Toast.positions.TOP}
                                    // opacity={0.3}
                                    hideOnPress={false}>
                                    <Icon style={{
                                    }} name={'plus-circle-multiple-outline'} size={15} color={'white'} />
                                </Toast>
                            </>
                        )}></When>
                    </ScreenWrapper>
                </TouchableWithoutFeedback>
            )
        },
        [toRead, open, favWebsite]
    )

    return <View style={{ flex: 1, }}>{node}</View>
}
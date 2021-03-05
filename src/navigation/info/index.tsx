import React, { useContext, useEffect, useRef, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import ActionSheet from 'react-native-actionsheet'
import Toast from 'react-native-root-toast'
import Restart from 'react-native-restart'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ScreenWrapper from '../../component/ScreenWrapper'
import SearchWrapper from '../../component/SearchWrapper'
import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WhiteSpace'
import UnitItemList from '../../component/UnitItemList'
import SwipeIconList from '../../component/SwipeIconList'

import { getData, clearData, } from '../../reducer'
import Context from '../../reducer'

import { info, } from '../../util/log'

export default ({ navigation, }) => {

    const startTime = new Date()

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

    const handleClearCacheActionSheet = () => {
        actionSheetREl.current.show()
    }

    const handleMore = index => {
        if (index === 0) {
            handleClearCache()
        } else if (index === 2) {
            navigation.push('dataView')
        }
    }

    // useEffect(() => {

    //     // 渲染计时 结束时间
    //     const endTime = new Date()

    //     dispatch({
    //         mod: 'debug',
    //         type: 'renderTime_add',
    //         payload: {
    //             // 模块
    //             mod: 'info',
    //             name: '资讯',
    //             // startTime,
    //             // endTime,
    //             // ms
    //             time: endTime - startTime,
    //         },
    //     })

    // }, [])

    info(`模块[资讯]执行渲染`)

    return (
        <ScreenWrapper navigation={navigation} theme={theme} imageBackground={null} >
            <SearchWrapper handleSubmit={handleSubmit} />

            {
                open
                    ? (
                        <>
                            <ActionSheet
                                ref={actionSheetREl}
                                title={'更多调试功能'}
                                options={['清空缓存', '取消', '查看数据',]}
                                cancelButtonIndex={1}
                                destructiveButtonIndex={0}
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
                                    bottom: 60,
                                    left: 150,
                                    opacity: 0.1,
                                }}
                                onPress={handleReload}
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
                                    width: 40,
                                    height: 40,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bottom: 60,
                                    left: 90,
                                    opacity: 0.1,
                                }}
                                onPress={() => navigation.push('debugView')}
                                visible={true}
                                // position={Toast.positions.TOP}
                                // opacity={0.3}
                                hideOnPress={false}>
                                <Icon style={{
                                    marginLeft: 6,
                                    marginRight: 8,
                                }} name={'android-debug-bridge'} size={22} color={'white'} />

                            </Toast>

                            <Toast
                                containerStyle={{
                                    backgroundColor: theme.main,
                                    width: 32,
                                    height: 32,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bottom: 60,
                                    left: 40,
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
                    )
                    : null
            }

            <WhiteSpace>
                <SwipeIconList navigation={navigation} data={favWebsite.list} />
            </WhiteSpace>

            <WingBlank>
                <UnitItemList data={[toRead]} showUrl={true} handlePress={handleToReadPress} />
            </WingBlank>
        </ScreenWrapper>
    )
}


  // 知识体系树
  // 完整度统计

  // log组件

  // 知识点快速点击搜索入口
  // 统一状态树
  // 远端统一保存
  // 数据版本号判定
  // 覆盖上传

  // 页面跳转加载提示

  // 常用标签

  // 各类文章列表

  //  可保存到文章列表 可定义文章标题和概述 
  //  保存 

  // 最近浏览
  // 阅读清单
  // 浏览历史

  // 复制保存的列表数据
import React, { useContext, useEffect, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import ScreenWrapper from '../../component/ScreenWrapper'
import SearchWrapper from '../../component/SearchWrapper'
import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WingBlank'
import UnitItemList from '../../component/UnitItemList'

import Context from '../../reducer'

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        search,
        navigation: {
            home: {
                tab: {
                    info: {
                        toRead,
                    },
                },
            },
        },
    } = state

    const handleSubmit = val => {
        navigation.push('readWebview', { url: `${search}${val}`, })
    }

    const handleToReadPress = ({ url, }) => {
        navigation.push('readWebview', { url: url, })
    }

    return (
        <ScreenWrapper navigation={navigation} theme={theme} imageBackground={null} >
            <SearchWrapper handleSubmit={handleSubmit} />

            <WhiteSpace>
                <WingBlank>
                    <UnitItemList data={[toRead]} handlePress={handleToReadPress} />
                </WingBlank>
            </WhiteSpace>
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
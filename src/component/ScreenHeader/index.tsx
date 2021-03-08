import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { BlurView, VibrancyView } from '@react-native-community/blur'

import Context from '../../reducer'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'

import { statusBarHeight, } from '../../util/StatusBarManager'
import { IfElse } from '../../util/jsx'

export const SCREEN_HEADER_HEGIHT = 43 + statusBarHeight

interface payload {
    navigation: any,
    // 返回按钮标题
    backTitle?: String,
    // 左侧节点
    left?: any,
    // 中间标题
    title?: String,
    // 右侧节点
    right?: any,
    // 支持刘海
    safeArea?: boolean
    // 透明度
    headerOpacity?: number
}

export default (payload: payload) => {

    const {
        navigation,
        backTitle,
        title,
        left,
        right,
        safeArea,
        headerOpacity,
    } = payload

    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const iconSize = 44

    const paddingTop = safeArea === true ? statusBarHeight : 0

    let opacity = headerOpacity
    if(typeof opacity === 'undefined') {
        opacity = 2
    }

    return (
        <View style={{
            zIndex: 10,
            // backgroundColor: theme.navigationTabBarBackgound,
            height: SCREEN_HEADER_HEGIHT,
            paddingTop,
            // backgroundColor: 'rgba(100, 100, 100, 0.2)',
            borderBottomWidth: theme.borderWidth,
            borderBottomColor: `rgba(100, 100, 100, ${opacity - 1 > 0.2 ? 0.2 : opacity - 1})`,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        }}>
            {/* <BlurView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                blurType='dark'
                blurAmount={100}
                // reducedTransparencyFallbackColor='white'
            /> */}

            <IfElse test={left} tnode={() => (
                <View style={{
                    width: iconSize * 2,
                }}>
                    {left}
                </View>
            )} fnode={() => (
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{
                        width: iconSize * 2,
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Icon style={{ width: iconSize, height: iconSize, fontWeight: 200 }} name={'chevron-left'} size={iconSize} color={theme.main} />
                        {
                            backTitle
                                ? (
                                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={{
                                        width: 60,
                                        color: theme.main,
                                        fontSize: 16,
                                        marginLeft: -7,
                                    }}>{backTitle}</Text>
                                )
                                : null
                        }
                    </View>
                </TouchableWithoutFeedback>
            )}></IfElse>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {
                    title
                        ? <Title
                            style={{ fontWeight: 'bold', opacity: opacity - 1, }}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}>
                            {title}
                        </Title>
                        : null
                }
            </View>

            <View style={{
                width: iconSize * 2,
                // backgroundColor: 'red',
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}>
                {
                    right ? right : null
                }
            </View>
        </View>
    )
}
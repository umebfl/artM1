import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle, } from 'react'
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
import TouchView from '../../component/TouchView'
import { info, debug, } from '../../util/log'
import { statusBarHeight, } from '../../util/StatusBarManager'
// import Context from '../../reducer'

interface FScrollViewPayload {
    children?: any
    style?: Object
    scrollConf?: Object
    handleOnScroll?: (ev: Object) => void
    handleonScrollEndDrag?: (ev: any) => void
}

export const FScrollView = forwardRef((payload: FScrollViewPayload, ref) => {
    const scrollRef = useRef()

    const {
        children,
        style,
        scrollConf,
        handleOnScroll,
        handleonScrollEndDrag,
    } = payload

    useImperativeHandle(ref, () => ({
        value: 1,
        scrollToTop: () => {
            scrollRef.current.scrollTo({x: 0, y: 0, animated: true})
        },
    }))

    return (
        <ScrollView
            ref={scrollRef}
            // 数值越大 调用次数越少
            scrollEventThrottle={58}
            onScrollEndDrag={handleonScrollEndDrag}
            onScroll={handleOnScroll}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            // keyboardShouldPersistTaps={'never'}
            style={style} {...scrollConf}>
            {children}
            <View style={{ height: statusBarHeight, }}></View>
        </ScrollView>
    )
})
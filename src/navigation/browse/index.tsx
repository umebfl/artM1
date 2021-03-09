import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, useMemo, } from 'react'
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TouchView from '../../component/TouchView'
import { info, debug, } from '../../util/log'
import Context from '../../reducer'
import SimpleScreen from '../../component/View/SimpleScreen'
import SwipeScreen from '../../component/SwipeScreen'
import TemplateImg from '../../component/TemplateImg'

interface Payload {
    navigation: any
}

export default (payload: Payload) => {
    info('[浏览]: 入口')
    const { state, dispatch, } = useContext(Context)
    const [reload, setReload] = useState(0)
    const swipeScreenRef = useRef()
    
    const {
        theme,
    } = state

    const {
        navigation,
    } = payload

    const {
        data: {
            node,
            // browse: {
            //     // 上次浏览标记
            //     lastIndex,
            // },
        },
    } = state

    const handleFlush = () => {
        setReload(reload + 1)
        swipeScreenRef.current.scrollToTop()
    }

    return useMemo(() => {
        info('[浏览]执行useMemo')
        return (
            <SimpleScreen
                noPadding={true}
                formScreen={true}
                navigation={navigation}
                noScroll={true}
                style={{
                    backgroundColor: theme.screenBackgroundGreyColor[theme.model],
                }}
                title='浏览'
                ScreenHeaderConf={{
                    left: <></>,
                    right: (
                        <TouchView onPress={handleFlush}>
                            <Icon name={'reload'} size={32} color={theme.grey[0]} style={{
                                opacity: 0.68,
                                marginRight: 18,
                            }} />
                        </TouchView>
                    )
                }}>
                
                {/* <TemplateImg></TemplateImg> */}

                <SwipeScreen ref={swipeScreenRef} reload={reload} navigation={navigation}></SwipeScreen>

            </SimpleScreen>
        )
    }, [node, reload])
}
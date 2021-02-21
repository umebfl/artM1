import R from 'ramda'
import React, { useContext, useState, useEffect, } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import Clipboard from '@react-native-community/clipboard'

import JSONTree from 'react-native-json-tree'
import Toast from 'react-native-root-toast'

import ScreenWrapper from '../../../component/ScreenWrapper'
import ScreenHeader from '../../../component/ScreenHeader'
import WingBlank from '../../../component/WingBlank'
import WhiteSpace from '../../../component/WhiteSpace'
import UnitItemList from '../../../component/UnitItemList'
import { debug, } from '../../../util/log'

import Context from '../../../reducer'

const JSONTreeTheme = {
    scheme: 'test',
    base00: '#000000',
    base01: '#383830',
    base02: '#22075e',
    base03: '#75715e',
    base04: '#ad8b00',
    base05: '#f8f8f2',
    base06: '#10239e',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#AAA',
    base0E: '#3f6600',
    base0F: '#820014',
    // nestedNodeLabel: ({ style }, nodeType, expanded) => ({
    //     style: {
    //         ...style,
    //         backgroundColor: 'red',
    //         paddingTop: 4,
    //         // textTransform: expanded ? 'uppercase' : style.textTransform
    //     }
    // }),
    // valueLabel: {
    //     textDecoration: 'underline'
    // },
}

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const [toastVisible, setToastVisible] = useState(false)

    const {
        theme,
    } = state

    let timeList = []

    const handleCopy = text => {
        Clipboard.setString(JSON.stringify(text, null, 2))
        setToastVisible(true)

        debug('复制剪切板成功')

        const time = setTimeout(() => {
            setToastVisible(false)
        }, 1500)

        timeList = [ ...timeList, time, ]
    }

    // useEffect(() => {

    //     return () => {
    //         R.map(
    //             v => clearTimeout(v)
    //         )(timeList)
    //     }
    // })

    return (
        <ScreenWrapper ContentViewType='view' navigation={navigation} theme={theme} imageBackground={null} LinearGradientBackground={false} >
            <ScreenHeader navigation={navigation} />

            <Toast
                visible={toastVisible}
                position={Toast.positions.CENTER}
                shadow={true}
                animation={true}
                opacity={0.6}
                hideOnPress={true}>复制成功</Toast>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: 6, marginRight: 6, }}>
                <JSONTree
                    data={state}
                    hideRoot={true}
                    // labelRenderer={
                    //     raw => (
                    //         <Text style={{ fontWeight: 'bold', }}>
                    //         {raw[0]} - 
                    //         </Text>
                    //     )
                    // }
                    getItemString={(type, data, itemType, itemString) =>
                        <Text style={{ flex: 1, }}>
                            {itemType} - {itemString}
                            <TouchableWithoutFeedback onPress={() => handleCopy(data)}>
                                <Text style={{ color: '#AAA', fontSize: 11, }}>  复制</Text>
                            </TouchableWithoutFeedback>
                        </Text>
                    }
                    theme={JSONTreeTheme} />
            </ScrollView>
        </ScreenWrapper>
    )
}
import R from 'ramda'
import React, { useContext, useEffect, useState, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
} from 'react-native'

import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { agate } from 'react-syntax-highlighter/styles/hljs'
import Context from '../../reducer'
import { DetailHead, } from '../unitDetail'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import { info } from '../../util/log'
import { RMap, When } from '../../util/jsx'
import SimpleScreen from '../../component/View/SimpleScreen'
import { useSetState } from 'ahooks'
import { SkillUnitFeatures } from '../../variable'
import ScrollEndLine from '../../component/ScrollEndLine'

export default ({ route, navigation }) => {
    info('[unitDetailCode]: 入口')

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const { payload, } = route.params

    return (
        <SimpleScreen
            theme={theme}
            navigation={navigation}
            ScreenHeaderConf={{
                title: payload.name || payload.title,
            }}
            style={{
                backgroundColor: theme.screenBackgroundColor[theme.model],
            }}>
            <DetailHead payload={payload} navigation={navigation} theme={theme} />

            <DetailCodeContent leaf={payload}></DetailCodeContent>

        </SimpleScreen>
    )
}

interface DetailCodeContentPayload {
    leaf: SkillUnitFeatures
}

export const DetailCodeContent = (payload: DetailCodeContentPayload) => {

    const { state, dispatch, } = useContext(Context)
    const [opend, setOpend] = useState(false)

    const {
        theme,
    } = state

    const {
        leaf,
    } = payload

    const explain = R.values(leaf.explain)
    const code = R.values(leaf.code)

    useEffect(() => {
        info('[代码详情页]初始化完成')

        setOpend(true)

        return () => {
            info('[代码详情页]执行卸载')
        }
    }, [])

    return (
        <View style={{
            paddingBottom: 50,
        }}>
            <When test={explain.length} node={() => (
                <>
                    <Title style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}>概念</Title>
                    <RMap data={explain} node={(v, k) => (
                        <DefText key={k} numberOfLines={100} style={{ fontSize: 14, marginBottom: 10 }}>
                            {k + 1}: {v || '-'}
                        </DefText>
                    )} />
                </>
            )} />

            <When test={opend && code.length} node={() => (
                <>
                    <Title style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}>例子</Title>
                    <RMap data={code} node={(v, k) => (
                        <View key={k} style={{
                            marginBottom: 30,
                            marginRight: 30,
                        }}>
                            <Text style={{
                                marginBottom: 10,
                                color: theme.grey[3],
                            }}>实例{k + 1}:</Text>
                            <SyntaxHighlighter
                                language='javascript'
                                style={
                                    agate
                                }>
                                {v || '-'}
                            </SyntaxHighlighter>
                        </View>
                    )} />
                </>
            )}></When>

            <ScrollEndLine></ScrollEndLine>
        </View>
    )
}
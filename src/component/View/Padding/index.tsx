import React, { useContext, useMemo, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
} from 'react-native'

import Context from '../../../reducer'
import { info } from '../../../util/log'

enum PaddingNodeType {
    Padding,
    WhiteSpace,
    WingBlank,
}

enum SIZE_TYPE {
    lg = 34,
    md = 20,
    normal = 12,
    sm = 8,
}

interface payload {
    size?: number
    style?: any
    children?: any
}

interface PaddingNode extends payload  {
    type: PaddingNodeType
}

export const WingBlank = (payload: payload) => PaddingNode({ ...payload, type: PaddingNodeType.WingBlank })
export const WhiteSpace = (payload: payload) => PaddingNode({ ...payload, type: PaddingNodeType.WhiteSpace })
export const Padding = (payload: payload) => PaddingNode({ ...payload, type: PaddingNodeType.Padding })

const PaddingNode = (payload: PaddingNode) => {

    const {
        size,
        children,
        style,
        type,
    } = payload

    return useMemo(
        () => {
            // info('[PaddingNode]执行useMemo')
            
            const num = size ? SIZE_TYPE[size] : SIZE_TYPE.md

            let marginTop = type === PaddingNodeType.Padding || type === PaddingNodeType.WhiteSpace ? num : 0
            let marginBottom = type === PaddingNodeType.Padding || type === PaddingNodeType.WhiteSpace ? num : 0
            let marginLeft = type === PaddingNodeType.Padding || type === PaddingNodeType.WingBlank ? num : 0
            let marginRight = type === PaddingNodeType.Padding || type === PaddingNodeType.WingBlank ? num : 0

            return (
                <View style={{
                    marginLeft,
                    marginRight,
                    marginTop,
                    marginBottom,
                    ...style, 
                }}>
                    {
                        children
                    }
                </View>
            )
        }, [payload]
    )
}

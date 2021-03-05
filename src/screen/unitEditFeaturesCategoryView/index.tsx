import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, } from 'react'
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
import SimpleScreen from '../../component/View/SimpleScreen'
import { InputItem, } from '../../component/Form/Input'
import { info, debug, } from '../../util/jsx'
import Context from '../../reducer'

import { SkillUnit, } from '../../variable'

interface Payload {
    navigation: Object
    route: {
        params: {
            node: string,
            type: string,
            id: string | null,
        },
    },
}

export default (payload: Payload) => {
    const { state, dispatch, } = useContext(Context)

    const inputName = useRef()

    const {
        theme,
    } = state

    const {
        navigation,
        route: {
            params: {
                node,
                type,
                id,
            },
        },
    } = payload

    const categoryList = R.values(node[type])

    return (
        <SimpleScreen navigation={navigation} style={{
            backgroundColor: theme.screenBackgroundGreyColor,
        }}>
            <InputItem ref={inputName} title={'名称'} theme={theme} defaultValue={''} ></InputItem>
            <InputItem ref={inputName} title={'简述'} theme={theme} defaultValue={''} ></InputItem>
            
            <Text>{JSON.stringify(categoryList, null, 2)}</Text>
        </SimpleScreen>
    )
}
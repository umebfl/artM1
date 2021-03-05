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
    Switch,
} from 'react-native'
import { DefText } from '../Text'

interface InputItemPayload {
    ref: any,
    title: string
    theme: any
    defaultValue: string
}

export const InputItem = forwardRef((payload: InputItemPayload, ref) => {
    const inputRef = useRef()

    useImperativeHandle(ref, () => ({
        getValue: () => inputRef.current.value,
    }), [inputRef.current])

    useEffect(() => {
        inputRef.current.value = payload.defaultValue
    }, [])

    return (
        <View>
            <DefText>{payload.title}:</DefText>
            <TextInput
                ref={inputRef}
                autoCorrect={true}
                onChange={({ nativeEvent, }) => inputRef.current.value = nativeEvent.text}
                enablesReturnKeyAutomatically={true}
                placeholder={`请输入${payload.title}`}
                clearButtonMode={'while-editing'}
                style={{
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 6,
                    marginTop: 8,
                    marginBottom: 14,
                    fontSize: 14,
                    color: payload.theme.grey[7],
                }}
                defaultValue={payload.defaultValue}></TextInput>
        </View>
    )
})


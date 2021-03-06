import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle, } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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
import Context from '../../reducer'
import { When } from '../../util/jsx'
import { info } from '../../util/log'

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

interface InputItemWithValPayload {
    title: string
    value: string
    // 文本框配置信息
    inputConf?: Object

    // 手动提交
    onChange?: (val: string) => void

    // 自动提交
    path?: String[]
}

export const InputItemWithVal = (payload: InputItemWithValPayload) => {
    const { state, dispatch, } = useContext(Context)

    const [saved, setSaved] = useState(false)

    const {
        theme,
    } = state

    const {
        title,
        value,
        onChange,
        path,
        inputConf,
    } = payload

    const [val, setVal] = useState(value)

    const handleAutoSubmit = () => {
        if (path && typeof val !== 'undefined') {
            dispatch({
                mod: 'path',
                type: 'edit',
                payload: {
                    path,
                    val,
                },
            })

            setSaved(true)
        }
    }

    return (
        <View>
            <DefText>{title}:</DefText>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                aliginItems: 'center',
                marginTop: 8,
                marginBottom: 14,
            }}>
                <TextInput
                    autoCorrect={true}
                    onChange={({ nativeEvent, }) => {
                        onChange(nativeEvent.text)
                        setVal(nativeEvent.text)
                        setSaved(false)
                    }}
                    onBlur={handleAutoSubmit}
                    enablesReturnKeyAutomatically={true}
                    placeholder={`请输入${title}`}
                    clearButtonMode={'while-editing'}
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        paddingLeft: 12,
                        paddingRight: 12,
                        paddingTop: 12,
                        paddingBottom: 10,
                        borderRadius: 6,
                        fontSize: 14,
                        color: theme.grey[7],
                    }}
                    defaultValue={value}
                    {...inputConf}></TextInput>

                <View style={{
                    position: 'absolute',
                    right: 15,
                    top: 0,
                    width: 26,
                    paddingTop: 10,
                    paddingLeft: 10,
                }}>
                    <When test={saved} node={() => (
                        <Icon name={'check'} size={20} color={theme.main} />
                    )} />
                </View>
            </View>
        </View>
    )
}


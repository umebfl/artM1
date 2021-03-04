
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import TouchView from '../TouchView'

interface payload {
    children: any
    theme: any
    icon?: string
    iconSize?: number
    defaultValue: string
    handleSave: (val: string) => void
}

export default (payload: payload) => {
    const inputEl = useRef(null)
    const [editing, setEditing] = useState(false)

    const {
        children,
        theme,
        icon,
        iconSize,
        defaultValue,
        handleSave,
    } = payload

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            {
                editing
                    ? (
                        <TextInput
                            style={{
                                flex: 1,
                                borderWidth: theme.borderWidth,
                                borderColor: theme.borderColor,
                                borderRadius: 8,
                                borderStyle: 'dotted',
                                padding: 8,
                                fontSize: 14,
                                color: theme.grey[5],
                                height: 36,
                            }}
                            ref={inputEl}
                            onChange={({ nativeEvent, }) => inputEl.current.value = nativeEvent.text}
                            onSubmitEditing={() => handleSave(inputEl.current.value)}
                            onBlur={() => setEditing(false)}
                            enablesReturnKeyAutomatically={true}
                            autoCorrect={true}
                            clearButtonMode={'while-editing'}
                            blurOnSubmit={true}
                            autoFocus={true}
                            defaultValue={defaultValue} />
                    )
                    : children
            }

            <TouchView onPress={() => setEditing(!editing)}>
                <Icon
                    name={icon ? icon : 'circle-edit-outline'}
                    size={iconSize ? iconSize : 14}
                    color={theme.main}
                    style={{ padding: 5, opacity: 0.8, }} />
            </TouchView>
        </View>
    )
}
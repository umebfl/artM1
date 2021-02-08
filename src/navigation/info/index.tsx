import React, { useContext, useEffect, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'

import ScreenWrapper from '../../component/ScreenWrapper'
import SearchWrapper from '../../component/SearchWrapper'

import Context from '../../reducer'

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        search,
    } = state

    const handleSubmit = val => {
        navigation.push('webview', { url: `${search}${val}`, })
    }

    return (
        <ScreenWrapper navigation={navigation} theme={theme} imageBackground={null} >
            <SearchWrapper handleSubmit={ handleSubmit } />
        </ScreenWrapper>
    )
}
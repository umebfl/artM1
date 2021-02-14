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
import WingBlank from '../../component/WingBlank'
import WhiteSpace from '../../component/WhiteSpace'
import UnitItemList from '../../component/UnitItemList'

import Context from '../../reducer'

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        search,
    } = state

    return (
        <ScreenWrapper navigation={navigation} theme={theme} imageBackground={null} >

        </ScreenWrapper>
    )
}
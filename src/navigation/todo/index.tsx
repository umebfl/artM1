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
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import UnitItemList from '../../component/UnitItemList'

import Context from '../../reducer'

import { info, } from '../../util/log'

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
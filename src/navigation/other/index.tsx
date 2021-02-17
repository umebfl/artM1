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
import List, { Item, } from '../../component/List'

import Context from '../../reducer'

const moban = require('../../../resource/image/template/m10.jpeg')

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        search,
    } = state

    return (
        <ScreenWrapper
            navigation={navigation}
            theme={theme}
            imageBackground={null} >

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

            {/* <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List>

            <List title={'其他'}>
                <Item title={'设置'} icon={'cog'} jumpTo={'setting'} extra={'未开启'} />
                <Item title={'个性装扮'} icon={'midi-port'} jumpTo={'setting'} />
                <Item title={'我的订单'} icon={'judaism'} jumpTo={'setting'} />
            </List> */}

        </ScreenWrapper>
    )
}
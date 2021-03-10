import R from 'ramda'
import React, { Component, useContext, useEffect, useState, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    Image,
    ImageBackground,
    Dimensions,
    Animated,
    FlatList,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import ScreenWrapper from '../../../component/ScreenWrapper'
import ScreenHeader from '../../../component/ScreenHeader'
import SearchWrapper from '../../../component/SearchWrapper'
import { WingBlank, WhiteSpace, } from '../../../component/View/Padding'
import UnitItemList from '../../../component/UnitItemList'
import { Title, DefText, } from '../../../component/Text'

import Context from '../../../reducer'

import { info, } from '../../../util/log'

class Line extends Component {

    constructor(props) {
        super(props)

        this.state = {
            width: new Animated.Value(0),
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.width,
            {
                toValue: this.props.val / 10,
                duration: 1500,
            }
        ).start()
    }

    render() {

        const {
            val,
            color,
        } = this.props

        const {
            width,
        } = this.state

        return (
            <Animated.View style={{
                width: width,
                height: 16,
                backgroundColor: color,
                marginRight: 4,
                marginLeft: 4,
                borderRadius: 4,
            }}>

            </Animated.View>
        )
    }

}

export default ({ navigation, }) => {

    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        debug: {
            renderTime,
        },
    } = state

    info('renderTime render')

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'rgb(247, 248, 249)',
        }}>
            <ScreenHeader navigation={navigation} title={'渲染耗时'} safeArea={true} />

            <FlatList style={{ marginTop: 10, }} data={R.sort((a, b) => b.time - a.time)(renderTime)}
                initialNumToRender={30}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                renderItem={({ item, index, separators }) => (
                    <WingBlank>
                        <WhiteSpace size='sm' style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <DefText style={{
                                width: 60,
                                textAlign: 'right',
                            }}>{item.name}</DefText>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                                <Line val={item.time} color={theme.main} />
                                <DefText>{item.time}ms</DefText>
                            </View>
                        </WhiteSpace>
                    </WingBlank>
                )}>

            </FlatList>
        </View>
    )
}
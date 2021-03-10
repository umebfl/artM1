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
import { timeState, } from '../../../util/calTime'
import { When } from '../../../util/jsx'

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
    const [data, setData] = useState(timeState)
    const [opend, setOpend] = useState(false)

    const {
        theme,
    } = state

    useEffect(() => {
        setOpend(true)
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'rgb(247, 248, 249)',
        }}>
            <ScreenHeader navigation={navigation} title={'渲染耗时'} safeArea={true} />

            <When test={ opend } node={() => (
                <FlatList style={{ marginTop: 10, }} data={R.sort((a, b) => b.take - a.take)(data)}
                    initialNumToRender={30}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index, separators }) => (
                        <WingBlank key={index} style={{
                            flexDirection: 'column',
                            marginTop: 30,
                        }}>
                            <WhiteSpace size='sm' style={{
                                marginTop: 0,
                                marginBottom: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <DefText style={{
                                    width: 60,
                                    height: 50,
                                    // backgroundColor: 'red',
                                    textAlign: 'right',
                                }}>{item.mod}</DefText>

                                <View style={{
                                    flexDirection: 'column',
                                    marginLeft: 10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                    }}>
                                        <Line val={item.take} color={theme.main} />
                                        <DefText>{item.take}ms</DefText>
                                    </View>

                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        marginLeft: 4,
                                        marginTop: 4,
                                    }}>
                                        <DefText>start: {item.start.getSeconds()}.{item.start.getMilliseconds()}</DefText>
                                        <DefText>end: {item.end.getSeconds()}.{item.end.getMilliseconds()}</DefText>
                                    </View>
                                </View>
                            </WhiteSpace>
                        </WingBlank>
                    )}>

                </FlatList>
            )}></When>
        </View>
    )
}
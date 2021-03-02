import React, { useContext, } from 'react'

import R from 'ramda'

import {
    SafeAreaView,
    Image,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Pressable,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Context from '../../reducer'

import WingBlank from '../../component/WingBlank'
import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import { SkillStep } from '../../variable'

// 列表最长长度
const LIST_MAX_LEN = 4

interface payload {
    title: String
    unit: any
    navigation: any
}

export default payload => {
    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const winWidth = Dimensions.get('window').width

    const {
        title,
        unit,
        navigation,
    } = payload

    // 分组
    const spList = R.splitEvery(LIST_MAX_LEN, unit)

    const showWidth = 20
    const listWidth = winWidth - showWidth * 2

    return (
        <View style={{ marginTop: 0, marginBottom: 20, }}>
            <WingBlank style={{
                paddingTop: 12,
                paddingBottom: 2,
                borderTopWidth: theme.borderWidth,
                borderTopColor: theme.borderColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
            }}>
                <MidTitle>{title}</MidTitle>

                {
                    unit.length > LIST_MAX_LEN
                        ? (
                            <TouchView onPress={() => { navigation.navigate('unitListView', { data: unit, title, }) }}>
                                <Text style={{ fontSize: 18, fontWeight: 'normal', color: theme.main }}>查看全部</Text>
                            </TouchView>
                        )
                        : null
                }

            </WingBlank>

            <ScrollView
                alwaysBounceVertical={false}
                scrollEnabled={unit.length > LIST_MAX_LEN}
                removeClippedSubviews={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                // bounces={false}
                pagingEnabled={true}
                style={{
                    // backgroundColor: 'yellow',
                    width: listWidth,
                    marginLeft: showWidth,
                    overflow: 'visible',
                }}
                contentContainerStyle={{
                    width: listWidth * spList.length,
                    // width: listWidth,
                    // height: 230,
                }}>
                {
                    R.addIndex(R.map)(
                        (list, listIndex) => (
                            <View key={listIndex} style={{
                                width: listWidth,
                                marginTop: 12,
                            }}>
                                {
                                    R.addIndex(R.map)(
                                        (item, k) => <SwipeListItem key={k} k={k} item={item} list={list} theme={theme} navigation={navigation} />,
                                        list
                                    )
                                }
                            </View>
                        ),
                        spList
                    )
                }
            </ScrollView>
        </View>
    )
}

export const SwipeListItem = ({
    k,
    item,
    list,
    theme,
    navigation,
}) => {

    const iconSize = 54

    return (
        <TouchView onPress={() => { navigation.push('unitDetailView', { payload: item }) }}>
            <View style={{ flexDirection: 'row', }}>
                <UnitLogo data={item.logo} size={iconSize} ></UnitLogo>

                <WingBlank size='sm' style={{
                    height: iconSize,
                    flex: 1,
                    marginTop: 10,
                    marginBottom: 6,
                    borderBottomWidth: k === list.length - 1 ? 0 : 0.3,
                    borderBottomColor: theme.borderColor,
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Title>{item.name}</Title>
                        {
                            item.major
                                ? (
                                    <Icon style={{
                                        width: 15,
                                        height: 15,
                                        // position: 'absolute',
                                        // right: 0,
                                        // bottom: 0,
                                    }} name={'heart-multiple-outline'} size={12} color={theme.grey[0]} />
                                )
                                : null
                        }

                        {
                            item.ftStep
                                ? (
                                    <Icon style={{
                                        width: 15,
                                        height: 15,
                                        // position: 'absolute',
                                        // right: 0,
                                        // bottom: 0,
                                    }} name={item.ftStep} size={12} color={theme.grey[0]} />
                                )
                                : null
                        }
                    </View>
                    <DefText style={{ marginTop: 6, }}>{item.def}</DefText>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                        {
                            item.step
                                ? (
                                    <Icon style={{
                                        width: 15,
                                        height: 15,
                                        // position: 'absolute',
                                        // right: 0,
                                        // bottom: 0,
                                    }} name={item.step} size={12} color={theme.grey[0]} />
                                )
                                : null
                        }
                    </View>
                </WingBlank>
            </View>
        </TouchView>
    )
}
import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Context from '../../reducer'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'

export const SCREEN_HEADER_HEGIHT = 43

export default ({ navigation, backTitle, title, }) => {

    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const iconSize = 44

    return (
        <View style={{
            backgroundColor: theme.navigationTabBarBackgound,
            height: SCREEN_HEADER_HEGIHT,
            // backgroundColor: 'rgba(100, 100, 100, 0.2)',
            // borderBottomWidth: theme.borderWidth,
            // borderBottomColor: theme.borderColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>

            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={{
                    width: iconSize * 2,
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Icon style={{ width: iconSize, height: iconSize, fontWeight: 200 }} name={'chevron-left'} size={iconSize} color={theme.main} />
                    {
                        backTitle
                            ? (
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={{
                                    width: 60,
                                    color: theme.main,
                                    fontSize: 16,
                                    marginLeft: -7,
                                }}>{backTitle}</Text>
                            )
                            : null
                    }
                </View>
            </TouchableWithoutFeedback>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {
                    title
                        ? <Title numberOfLines={1} ellipsizeMode={'tail'}>{title}</Title>
                        : null
                }
            </View>

            <View style={{
                width: iconSize * 2,
                // backgroundColor: 'red',
            }}>

            </View>
        </View>
    )
}
import R from 'ramda'
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
import TouchView from '../../component/TouchView'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'

export default payload => {

    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        data,
        handlePress,
    } = payload

    return (
        R.addIndex(R.map)(
            ({ title, def, list, }, k) => (
                <View
                    style={{
                        // backgroundColor: theme.navigationTabBarBackgoundSecond,
                        // backgroundColor: 'rgba(0,0,0,0.2)',
                        paddingTop: 16,
                        paddingBottom: 16,
                        // margin: 16,
                        marginBottom: 0,
                        borderRadius: 12,
                        borderTopWidth: 0.3,
                        borderTopColor: theme.borderColor,
                    }}
                    key={k}>

                    <View style={{
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: def ? 8 : 4,
                    }}>
                        <MidTitle style={{ marginBottom: def ? 8 : 0 }}>{title}</MidTitle>

                        {
                            def && <DefText>{def}</DefText>
                        }
                    </View>

                    {
                        R.addIndex(R.map)(
                            (item, index) => (
                                <TouchView key={index} onPress={() => handlePress(item)}>
                                    <View style={{
                                        paddingTop: 8,
                                        paddingBottom: 10,
                                        // marginTop: 180,
                                        flexDirection: 'row',
                                        height: 56,
                                        marginBottom: 4,
                                        // backgroundColor: 'rgba(0,0,0,0.4)',
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{
                                            width: 34,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            // backgroundColor: 'rgba(0,0,0,0.2)',
                                        }}>
                                            <DefText style={{ fontSize: 18 }}>{index + 1}</DefText>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <Title numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Title>
                                            <DefText style={{ marginTop: 6, marginRight: 6, }}>{item.def}</DefText>
                                        </View>
                                        <View style={{
                                            width: 34,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            // backgroundColor: 'rgba(0,0,0,0.2)',
                                        }}>
                                            <Icon style={{ width: 20, height: 20, }} name={'dots-vertical'} size={20} color={theme.grey[0]} />
                                        </View>
                                    </View>
                                </TouchView>
                            ),
                            list
                        )
                    }

                </View>
            ),
            data || []
        )
    )
}
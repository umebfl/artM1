import R from 'ramda'
import React, { useContext, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Context from '../../reducer'
import TouchView from '../../component/TouchView'
import ScrollEndLine from '../../component/ScrollEndLine'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import { When } from '../../util/jsx'

interface payload {
    data: any
    showUrl?: boolean
    handlePress: (item: any) => void
    handleCategoryActionSheet?: (category: Object) => void
    handleDotPress?: (categoryId: string, leaf: Object) => void
}

export default (payload: payload) => {

    const { state, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        data,
        showUrl,
        handlePress,
        handleCategoryActionSheet,
        handleDotPress,
    } = payload

    return (
        <FlatList
            initialNumToRender={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={data || []}
            ListFooterComponent={() => {
                if (data.length) {
                    return (
                        <ScrollEndLine />
                    )
                }
                return null
            }}
            ListEmptyComponent={() => (
                <View style={{
                    flex: 1,
                    height: 500,
                    paddingTop: 100,
                    alignItems: 'center',
                }}>
                    <DefText>暂无数据</DefText>
                </View>
            )}
            renderItem={({ item, index, separators }) => {
                const {
                    id,
                    title,
                    def,
                    node,
                } = item

                return (
                    <View
                        key={id}
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
                        }}>

                        <View style={{
                            marginLeft: 10,
                            marginRight: 10,
                            marginBottom: def ? 8 : 4,
                        }}>
                            <When test={title} node={() => (
                                <View style={{ flexDirection: 'row', }}>
                                    <MidTitle style={{ marginRight: 4, marginBottom: def ? 8 : 4 }}>{title}</MidTitle>
                                    <When test={handleCategoryActionSheet} node={() => (
                                        <TouchView onPress={() => handleCategoryActionSheet(item)}>
                                            <View style={{
                                                width: 26,
                                                height: 26,
                                                opacity: 0.8,
                                            }}>
                                                <Icon name={'circle-edit-outline'} size={20} color={theme.grey[0]} />
                                            </View>
                                        </TouchView>
                                    )}></When>
                                </View>
                            )} />
                            <When test={def} node={() => <DefText>{def}</DefText>} />
                        </View>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={R.values(node)}
                            renderItem={({ item, index, separators }) => {
                                return (
                                    <TouchView key={item.id} onPress={() => handlePress(item)}>
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
                                                <Title numberOfLines={1} ellipsizeMode={'tail'}>{item.title || '-'}</Title>
                                                <DefText style={{ marginTop: 6, marginRight: 6, }}>
                                                    {
                                                        showUrl
                                                            ? item.url
                                                            : item.def
                                                    }
                                                </DefText>
                                            </View>
                                            <TouchView onPress={() => handleDotPress ? handleDotPress(id, item) : handlePress(item)}>
                                                <View style={{
                                                    width: 34,
                                                    // marginRight: -5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    // backgroundColor: 'rgba(0,0,0,0.2)',
                                                }}>
                                                    <Icon name={'dots-vertical'} size={20} color={theme.grey[0]} />
                                                </View>
                                            </TouchView>
                                        </View>
                                    </TouchView>
                                )
                            }} />

                        {/* {
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
                                                <DefText style={{ marginTop: 6, marginRight: 6, }}>
                                                    {
                                                        showUrl
                                                            ? item.url
                                                            : item.def
                                                    }
                                                </DefText>
                                            </View>
                                            <TouchView onPress={() => handleDotPress ? handleDotPress(id, item) : handlePress(item)}>
                                                <View style={{
                                                    width: 34,
                                                    // marginRight: -5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    // backgroundColor: 'rgba(0,0,0,0.2)',
                                                }}>
                                                    <Icon name={'dots-vertical'} size={20} color={theme.grey[0]} />
                                                </View>
                                            </TouchView>
                                        </View>
                                    </TouchView>
                                ),
                                R.values(node)
                            )
                        } */}

                    </View>
                )
            }} />
    )
}

// {
//     R.addIndex(R.map)(
//         (item, index) => (
//             <TouchView key={index} onPress={() => handlePress(item)}>
//                 <View style={{
//                     paddingTop: 8,
//                     paddingBottom: 10,
//                     // marginTop: 180,
//                     flexDirection: 'row',
//                     height: 56,
//                     marginBottom: 4,
//                     // backgroundColor: 'rgba(0,0,0,0.4)',
//                     justifyContent: 'space-between',
//                 }}>
//                     <View style={{
//                         width: 34,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         // backgroundColor: 'rgba(0,0,0,0.2)',
//                     }}>
//                         <DefText style={{ fontSize: 18 }}>{index + 1}</DefText>
//                     </View>
//                     <View style={{
//                         flex: 1,
//                     }}>
//                         <Title numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Title>
//                         <DefText style={{ marginTop: 6, marginRight: 6, }}>
//                             {
//                                 showUrl
//                                     ? item.url
//                                     : item.def
//                             }
//                         </DefText>
//                     </View>
//                     <TouchView onPress={() => handleDotPress ? handleDotPress(id, item) : handlePress(item)}>
//                         <View style={{
//                             width: 34,
//                             // marginRight: -5,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             // backgroundColor: 'rgba(0,0,0,0.2)',
//                         }}>
//                             <Icon name={'dots-vertical'} size={20} color={theme.grey[0]} />
//                         </View>
//                     </TouchView>
//                 </View>
//             </TouchView>
//         ),
//         R.values(node)
//     )
// }
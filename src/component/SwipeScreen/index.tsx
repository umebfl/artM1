import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, useCallback, } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
    Clipboard,
    TextInput,
    FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TouchView from '../../component/TouchView'
import { info, debug, } from '../../util/log'
import Context from '../../reducer'
import SimpleScreen from '../../component/View/SimpleScreen'
import WhiteSpace from '../WhiteSpace'
import { DefText, MidTitle, Title } from '../Text'
import WingBlank from '../WingBlank'
import { When } from '../../util/jsx'
import { SCREEN_HEADER_HEGIHT } from '../ScreenHeader'

interface Payload {
    navigation: any,
}

const contentHeight = Dimensions.get('window').height - SCREEN_HEADER_HEGIHT - 80

export default (payload: Payload) => {
    info('[SwipeScreen]: 入口')
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        data: {
            node,
        },
    } = state

    const {
        navigation,
    } = payload

    const handleJump = (leaf) => {
        navigation.push('unitDetailCodeView', { payload: leaf })
    }

    const buildData = useCallback(() => {
        info('[buildData]执行useCallback')
        return R.compose(
            v => {
                let list = []
                R.map( // 循环tab
                    v2 => R.map(// 循环node
                        v3 => {
                            let i = 0
                            R.map(// 循环features
                                v4 => R.map(// 循环node
                                    v5 => {
                                        list.push({
                                            mod: v3.mod,
                                            nodeId: v3.id,
                                            nodeName: v3.name,
                                            showCategory: i === 0,
                                            CategoryId: v4.id,
                                            CategoryName: v4.title,
                                            CategoryDef: v4.def,

                                            id: v5.id,
                                            title: v5.title,
                                            def: v5.def,
                                            leaf: v5,
                                        })

                                        i++
                                    }
                                )(R.values(v4.node))
                            )(R.values(v3.features))
                        }
                    )(R.values(v2))
                )(v)

                return list
            },
            R.values
        )(node)
    }, [node])

    return (
        <View style={{
            height: contentHeight,
        }}>
            <FlatList
                pagingEnabled={true}
                initialNumToRender={2}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={buildData()}
                renderItem={({ item, index, separators }) => (
                    <View style={{
                        height: contentHeight,
                        paddingTop: 100,
                        paddingBottom: 100,
                    }}>
                        <NodeView {...item} handleJump={handleJump}/>
                    </View>
                )} />
        </View>
    )
}

const NodeView = (payload) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        id,
        mod,
        nodeName,

        showCategory,
        CategoryName,
        CategoryDef,

        title,
        def,
        handleJump,

        leaf,
    } = payload

    return (
        <View style={{
            width: '72%',
            height: '100%',
            marginLeft: '14%',
            marginRight: '14%',
            backgroundColor: 'rgb(254, 255, 255)',
            shadowColor: theme.grey[0],
            shadowOffset: { width: -10, height: 20 },
            shadowOpacity: 1,
            shadowRadius: 25,
            flexDirection: 'column',
        }}>

            <When test={showCategory} node={() => (
                <CategoryView text={nodeName} />
            )}></When>

            <WingBlank style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={{
                    jusifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    flex: 1,
                    paddingTop: 15,
                    marginTop: 100,
                    // marginTop: 190,
                }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 17,
                        letterSpacing: 2,
                        lineHeight: 25,
                    }}>
                        {def}
                    </Text>
                </View>

                <View style={{
                    jusifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    height: 60,
                    paddingTop: 15,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        jusifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text>- </Text>
                        <Title numberOfLines={1} ellipsizeMode={'tail'} style={{
                            maxWidth: 160,
                            textAlign: 'center',
                        }}>
                            {title}
                        </Title>
                        <Text> -</Text>
                    </View>
                </View>

                <DefText numberOfLines={3} style={{
                    marginTop: 20,
                }}>#{CategoryDef}</DefText>

                <DefText style={{
                    marginTop: 10,
                    height: 30,
                }}>要点[{CategoryName}]</DefText>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50,
                    marginTop: 10,
                }}>
                    <Title style={{
                        color: theme.grey[4],
                    }}>{nodeName}</Title>

                    <TouchView onPress={() => handleJump(leaf)}>
                        <Icon name={'arrow-right-drop-circle-outline'} size={32} color={theme.grey[0]} />
                    </TouchView>
                </View>
            </WingBlank>
        </View>
    )
}

const CategoryView = (payload) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        text,
    } = payload

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: -40,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            aliginItems: 'center',
        }}>
            <View style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: theme.grey[4],
                borderRadius: 25,
                borderStyle: 'dotted',
                padding: 5,
            }}>
                <Icon name={'tag-outline'} size={20} color={theme.grey[4]} />
            </View>

            <Text style={{
                width: 12,
                height: 400,
                fontSize: 15,
                marginLeft: 8,
                marginTop: 5,
                marginBottom: 10,
                color: theme.grey[4],
                textTransform: 'uppercase',
                textAlign: 'center',
            }}>{text}</Text>
        </View>
    )
}

    // const data = useCallback(() => {
    //     info('[data]执行useCallback')
    //     return [
    //         {
    //             mod: 'server',
    //             nodeName: 'Jest',

    //             showCategory: true,
    //             CategoryName: 'Expect',
    //             CategoryDef: '断言',

    //             id: 'xxx',
    //             title: 'expect.anything()',
    //             def: '匹配null或undefined以外的任何内容',
    //         },
    //         {
    //             id: 'xxx',
    //             mod: 'server',
    //             nodeName: 'Jest',

    //             showCategory: true,
    //             CategoryName: 'Global',
    //             CategoryDef: '全局方法',

    //             title: 'describe(name, fn)',
    //             def: '创建一个将几个相关测试组合在一起作为一个模块',
    //         },
    //         {
    //             id: 'xxx',
    //             mod: 'server',
    //             nodeName: 'Jest',

    //             showCategory: false,
    //             CategoryName: 'Global',
    //             CategoryDef: '全局方法',

    //             title: 'describe(name, fn)',
    //             def: '创建一个将几个相关测试组合在一起作为一个模块',
    //         },
    //         {
    //             id: 'xxx',
    //             mod: 'server',
    //             nodeName: 'Jest',

    //             showCategory: false,
    //             CategoryName: 'Global',
    //             CategoryDef: '全局方法',

    //             title: 'describe(name, fn)',
    //             def: '创建一个将几个相关测试组合在一起作为一个模块',
    //         },
    //     ]
    // }, [node])

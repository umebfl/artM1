import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, useMemo, } from 'react'
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
import TemplateImg from '../../component/TemplateImg'
import { shuffle } from '../../util/array'
import { DefText, Title } from '../../component/Text'
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import { fixZeroStart } from '../../util/string'
import { When } from '../../util/jsx'
import { SCREEN_HEADER_HEGIHT } from '../../component/ScreenHeader'
import { calTime } from '../../util/calTime'

interface Payload {
    navigation: any
}

const contentHeight = Dimensions.get('window').height - SCREEN_HEADER_HEGIHT - 80

export default (payload: Payload) => {
    // info('[浏览]: 入口')
    const { state, dispatch, } = useContext(Context)
    const [reload, setReload] = useState(0)
    const swipeScreenRef = useRef()

    const {
        theme,
    } = state

    const {
        navigation,
    } = payload

    const {
        data: {
            node,
        },
    } = state

    const ctimer = calTime('Today')

    useEffect(() => {
        ctimer.end()
    }, [])

    const handleFlush = () => {
        setReload(reload + 1)
        swipeScreenRef.current.scrollToIndex({
            animated: true,
            index: 0,
        })
    }

    const handleJump = (leaf) => {
        navigation.navigate('unitDetailCodeModal', { leaf })
    }
    const handleScrollEndDrag = (ev) => {
        // const y = ev.nativeEvent.contentOffset.y
        // // scrollRef.current.scrollTo({x: 0, y: 0, animated: true})
        // let index
        // // 1000 300 100
        // // 方向
        // const mov = contentHeight - (y % contentHeight)
        // // 偏移百分比
        // const rate = Math.abs(mov) / (contentHeight / 2)
        // // 方向 大于0 下拉, 小于0上拉
        // const dir = mov > 0

        // info(JSON.stringify({
        //     contentHeight,
        //     y,
        //     dir,
        //     mov,
        //     rate,
        // }, null, 2))

        // if (rate > 0.2) {
        //     // 下拉
        //     if (dir) {
        //         index = Math.ceil(y / contentHeight)
        //         swipeScreenRef.current.scrollToIndex({
        //             animated: true,
        //             index: index,
        //         })
        //     } else {
        //         // 上拉
        //         index = Math.floor(y / contentHeight)
        //         swipeScreenRef.current.scrollToIndex({
        //             animated: true,
        //             index: index,
        //         })
        //     }
        // }

    }

    const screenNode = useMemo(() => {
        info('[浏览]执行useMemo')

        const data = R.compose(
            v => {
                let list = []
                R.map( // 循环tab
                    v2 => R.compose(
                        // 洗牌
                        R.map(// 循环node
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
                        ),
                        v => shuffle(v),
                        R.values,
                    )(v2)
                )(v)

                return list
            },
            R.values
        )(node)

        return (
            <SimpleScreen
                theme={theme}
                noPadding={true}
                formScreen={true}
                navigation={navigation}
                noScroll={true}
                style={{
                    backgroundColor: theme.screenBackgroundGreyColor[theme.model],
                }}
                title='浏览'
                ScreenHeaderConf={{
                    left: <></>,
                    right: (
                        <TouchView onPress={handleFlush}>
                            <Icon name={'reload'} size={32} color={theme.main} style={{
                                opacity: 0.68,
                                marginRight: 18,
                            }} />
                        </TouchView>
                    )
                }}>

                <View style={{
                    height: contentHeight,
                }}>

                    <FlatList
                        ref={swipeScreenRef}
                        // pagingEnabled={true}
                        initialNumToRender={2}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScrollEndDrag}
                        data={data}
                        renderItem={({ item, index, separators }) => (
                            <View key={item.id} style={{
                                height: contentHeight - 120,
                                paddingTop: 60,
                                paddingBottom: 0,
                            }}>
                                <NodeView theme={theme} {...item} index={index} handleJump={handleJump} />
                            </View>
                        )} />
                </View>

            </SimpleScreen>
        )
    }, [reload])

    return (
        <>
            {screenNode}
        </>
    )
}

const NodeView = (payload) => {
    const {
        theme,

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

        index,
    } = payload


    return useMemo(
        () => {
            return (
                <View style={{
                    width: '72%',
                    height: '100%',
                    marginLeft: '14%',
                    marginRight: '14%',
                    borderRadius: 10,
                    backgroundColor: 'rgb(254, 255, 255)',
                    shadowColor: theme.grey[0],
                    shadowOffset: { width: -10, height: 20 },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    flexDirection: 'column',
                }}>

                    <When test={showCategory} node={() => (
                        <CategoryView theme={theme} text={nodeName} />
                    )}></When>

                    <WingBlank style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        {/* <View style={{
                            // backgroundColor: 'red',
                            // paddingTop: 15,
                            width: 40,
                            height: 20,
                            position: 'absolute',
                            right: -20,
                            top: 20,
                            transform: [
                                { rotateZ: "90deg" },
                                // { rotateY: "60deg" },
                            ],
                        }}>
                            <DefText style={{ opacity: 0.2 }}>- {fixZeroStart(index + 1, 2)} -</DefText>
                        </View> */}
                        <View style={{
                            jusifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                            flex: 1,
                            paddingTop: 15,
                            marginTop: 80,
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
                            aliginItem: 'center',
                            height: 50,
                            marginTop: 10,
                        }}>
                            <Title style={{
                                color: theme.grey[4],
                                marginTop: 8,
                            }}>{nodeName}</Title>

                            <TouchView onPress={() => handleJump(leaf)}>
                                <View style={{
                                    // width: 50,
                                    // height: 50,
                                    // paddingLeft: 20,
                                    // paddingTop: 10,
                                    // marginTop: -10,
                                    padding: 10,
                                    // backgroundColor: 'red',
                                }}>
                                    <Icon name={'arrow-right-drop-circle-outline'} size={32} color={theme.grey[0]} />
                                </View>
                            </TouchView>
                        </View>

                        <View style={{
                            // backgroundColor: 'red',
                            // paddingTop: 15,
                            width: '100%',
                            marginBottom: 10,
                            // position: 'absolute',
                            // right: -20,
                            // top: 20,
                            // transform: [
                            //     { rotateZ: "90deg" },
                            //     // { rotateY: "60deg" },
                            // ],
                        }}>
                            <DefText style={{ opacity: 0.2 }}>- {fixZeroStart(index + 1, 2)} -</DefText>
                        </View>
                    </WingBlank>
                </View>
            )
        }, [payload]
    )
}

const CategoryView = (payload) => {
    const {
        text,
        theme,
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

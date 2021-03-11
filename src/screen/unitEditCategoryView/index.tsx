import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, } from 'react'

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
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SvgCssUri, SvgXml, } from 'react-native-svg'
import ActionSheet from 'react-native-actionsheet'

import Context from '../../reducer'

import ScreenHeader from '../../component/ScreenHeader'

import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'
import UnitItemList from '../../component/UnitItemList'
import { WingBlank, WhiteSpace, Padding, } from '../../component/View/Padding'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import { IfElse, RMap, When } from '../../util/jsx'
import { info } from '../../util/log'
import { FScrollView } from '../../component/FixNative'
import SimpleScreen from '../../component/View/SimpleScreen'
import ScrollEndLine from '../../component/ScrollEndLine'

export default ({ route, navigation }) => {
    info('[编辑][分类列表页]模块执行渲染')
    const { state, dispatch, } = useContext(Context)

    const inputEl = useRef(null)
    const dotActionSheetREl = useRef(null)
    const [newCategoryName, setNewCategoryName] = useState('')

    const {
        theme,
        navigation: {
            home: {
                tab,
            },
        },
        data: {
            category,
            node,
        }
    } = state

    const {
        params: {
            modKey,
        },
    } = route

    const data = {
        name: tab[modKey].text,
        list: R.values(category[modKey]),
    }

    useEffect(() => {
        info('[编辑][分类列表页]初始化完成')
        return () => {
            info('[编辑][分类列表页]执行卸载')
        }
    }, [])

    const handleAdd = () => {
        if (newCategoryName) {
            dispatch({
                mod: 'system',
                type: 'addCategory',
                payload: {
                    target: modKey,
                    value: newCategoryName,
                },
            })

        }
    }

    const handleDotActionSheet = () => {
        dotActionSheetREl.current.show()
    }

    const handleEditCategoryName = (id: string, val: string) => {
        dispatch({
            mod: 'system',
            type: 'editCategoryName',
            payload: {
                target: modKey,
                id: id,
                value: val,
            },
        })
    }

    const handleCategoryDotPress = (index) => {
        if (index === 0) {
            moveToPostion({
                dispatch,
                state,
                id: dotActionSheetREl.current.value,
                pathToList: ['data', 'category', modKey],
            })
        } else if (index === 2) {
            moveToPostion({
                dispatch,
                state,
                id: dotActionSheetREl.current.value,
                pathToList: ['data', 'category', modKey],
                position: moveToPostionType.bottom,
            })
        }
    }

    const handleJump = (id) => {
        navigation.push('unitEditLv1View', { modKey, categoryId: id, })
    }

    return (
        <SimpleScreen
            theme={theme}
            formScreen={true}
            ScreenHeaderConf={{
                title: '编辑分类',
            }}
            navigation={navigation}>

            <ActionSheet
                ref={dotActionSheetREl}
                title={'选择操作'}
                options={['移至顶部', '取消', '移至底部',]}
                cancelButtonIndex={1}
                // destructiveButtonIndex={0}
                onPress={handleCategoryDotPress}
            />

            <WhiteSpace>
                <MidTitle>{data.name}</MidTitle>
            </WhiteSpace>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <TextInput
                    style={{
                        flex: 1,
                        paddingLeft: 20,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: theme.borderWidth,
                        borderColor: theme.borderColor,
                        fontSize: 14,
                        backgroundColor: 'white',
                    }}
                    clearTextOnFocus={true}
                    ref={inputEl}
                    onChange={({ nativeEvent, }) => setNewCategoryName(nativeEvent.text)}
                    onSubmitEditing={handleAdd}
                    value={newCategoryName}
                    onBlur={() => setNewCategoryName('')}
                    maxLength={20}
                    enablesReturnKeyAutomatically={true}
                    autoCorrect={true}
                    clearButtonMode={'while-editing'}
                    blurOnSubmit={true}
                    // autoFocus={true}
                    placeholder={'添加分类'} />

                <When test={!newCategoryName.length} node={() => (
                    <Text style={{
                        position: 'absolute',
                        right: 22,
                        top: 12,
                        color: theme.grey[0],
                        fontSize: 14,
                    }}>添加</Text>
                )}></When>
            </View>

            {
                R.addIndex(R.map)(
                    (v, k) => (
                        <EditItem
                            key={v.id}
                            id={v.id}
                            seq={k}
                            name={v.name}
                            theme={theme}
                            list={v.list}
                            handleDotPress={
                                () => {
                                    dotActionSheetREl.current.value = v.id
                                    handleDotActionSheet()
                                }
                            }
                            handleJump={() => handleJump(v.id)}
                            handleEdit={handleEditCategoryName}
                        />
                    )
                )(data.list)
            }

            <ScrollEndLine></ScrollEndLine>
        </SimpleScreen>
    )
}

interface EditItemPayload {
    id: string
    seq: number,
    logo?: {
        type: string,
        url: string,
        full: boolean,
    },
    name: string
    def?: string
    theme: any
    list?: []
    handleDotPress?: (id: string) => void
    handleJump: () => void
    handleDelPress?: () => void
    handleEdit?: (id: string, val: string) => void
}

enum moveToPostionType {
    top,
    index,
    bottom,
}

interface moveToPostionPayload {
    dispatch: any
    state: Object
    id: string
    pathToList: string[]
    position?: moveToPostionType
}
export const moveToPostion = (payload: moveToPostionPayload) => {
    const {
        dispatch,
        state,
        id,
        pathToList,
        position,
    } = payload

    const list = R.path(pathToList)(state)
    const node = list[id]
    const newList = R.dissoc(id)(list)

    let val

    if(position) {
        if(position === moveToPostionType.bottom) {
            val = {
                ...newList,
                [node.id]: node,
            }
        }
    } else {
        val = {
            [node.id]: node,
            ...newList,
        }
    }

    dispatch({
        mod: 'path',
        type: 'edit',
        payload: {
            path: pathToList,
            val,
        },
    })
}

export const EditItem = (payload: EditItemPayload) => {

    const [editing, setEditing] = useState(false)
    const inputEl = useRef(null)

    const {
        id,
        seq,
        logo,
        name,
        def,
        theme,
        list,
        handleDelPress,
        handleEdit,
        handleJump,
        handleDotPress,
    } = payload

    return (
        <TouchView onPress={handleJump}>
            <View style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: 8,
                height: 54,
                // paddingLeft: 15,
                // paddingRight: 10,
                // backgroundColor: 'red',
                // paddingLeft: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <IfElse
                        test={logo}
                        tnode={() => <UnitLogo data={logo} style={{ marginRight: 6, }} size={40} ></UnitLogo>}
                        fnode={() => (
                            <Text style={{
                                width: 24,
                                fontSize: 18,
                                marginRight: 10,
                                color: theme.grey[0],
                                textAlign: 'center',
                            }}>{seq + 1}</Text>
                        )}
                    />

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <Title style={{
                                paddingLeft: 0,
                                paddingRight: 3,
                                marginBottom: 4,
                            }}>
                                {name}
                            </Title>

                            <When test={def} node={() => (
                                <DefText style={{
                                    paddingLeft: 0,
                                    paddingRight: 3,
                                    fontSize: 11,
                                    width: 200,
                                }}>
                                    {def}
                                </DefText>
                            )} />

                        </View>

                        <When test={list} node={() => (
                            <Text style={{
                                color: theme.grey[2],
                            }}>({list.length})</Text>
                        )} />
                    </View>

                    {/* <IfElse
                        test={editing}
                        tnode={() => (
                            <View>
                                <TextInput
                                    style={{
                                        width: 200,
                                        paddingLeft: 10,
                                        height: 40,
                                        borderRadius: 8,
                                        borderWidth: theme.borderWidth,
                                        borderColor: theme.borderColor,
                                        fontSize: 16,
                                    }}
                                    ref={inputEl}
                                    onChange={({ nativeEvent, }) => inputEl.current.value = nativeEvent.text}
                                    onSubmitEditing={() => handleEdit(id, inputEl.current.value)}
                                    onBlur={() => { setEditing(false) }}
                                    maxLength={20}
                                    defaultValue={name}
                                    enablesReturnKeyAutomatically={true}
                                    autoCorrect={true}
                                    clearButtonMode={'while-editing'}
                                    blurOnSubmit={true}
                                    autoFocus={true}
                                    placeholder={'请输入分类名称'} />
                            </View>
                        )}
                        fnode={() => (
                            
                        )} /> */}

                </View>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <RMap data={[
                        {
                            name: 'dots-vertical',
                            color: theme.grey[0],
                            // handlePress: handleDotPress ? () => handleDotPress(id) : () => { },
                            handlePress: () => handleDotPress ? handleDotPress(id) : handleJump()
                        }
                    ]} node={(v, k) => (
                        <TouchView onPress={v.handlePress}>
                            <Icon
                                key={k}
                                name={v.name}
                                size={24}
                                color={v.color}
                                style={{ padding: 5, opacity: 0.8, }} />
                        </TouchView>
                    )} />
                    {/* {
                            R.addIndex(R.map)(
                                (v, k) => (
                                    <TouchView onPress={v.handlePress}>
                                        <Icon
                                            key={k}
                                            name={v.name}
                                            size={24}
                                            color={v.color}
                                            style={{ padding: 5, opacity: 0.8, }} />
                                    </TouchView>
                                )
                            )([
                                // {
                                //     name: 'circle-edit-outline',
                                //     color: theme.grey[0],
                                //     handlePress: () => {
                                //         useInnerEditer
                                //             ? setEditing(true)
                                //             : handleEdit(id)
                                //     },
                                // },

                                {
                                    name: 'dots-vertical',
                                    color: theme.grey[0],
                                    handlePress: () => { },
                                },
                                // {
                                //     name: 'close',
                                //     color: theme.red[2],
                                //     handlePress: handleDelPress,
                                // },
                                // {
                                //     name: 'menu',
                                //     color: theme.grey[0],
                                //     handlePress: () => {

                                //     },
                                // },
                            ])
                        } */}

                </View>
            </View>
        </TouchView>
    )
}

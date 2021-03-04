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

import TabBar from '../../component/ScrollableTabBar'
import TouchView from '../../component/TouchView'
import UnitLogo from '../../component/UnitLogo'
import UnitItemList from '../../component/UnitItemList'
import Padding from '../../component/Padding'
import WhiteSpace from '../../component/WhiteSpace'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import WingBlank from '../../component/WingBlank'

export default ({ route, navigation }) => {
    const { state, dispatch, } = useContext(Context)

    const actionSheetREl = useRef(null)
    const inputEl = useRef(null)

    const {
        theme,
        navigation: {
            home: {
                tab,
            },
        },
    } = state

    const {
        params: {
            modKey,
        },
    } = route

    const data = tab[modKey].data

    const handleAdd = () => {
        if (inputEl.current.value) {
            dispatch({
                mod: 'system',
                type: 'addCategory',
                payload: {
                    target: modKey,
                    value: inputEl.current.value,
                },
            })
        }
    }

    const handleDelActionSheet = async () => {
        actionSheetREl.current.show()
    }

    const handleDelPress = (index) => {

        if (index === 0) {
            const categoryIndex = actionSheetREl.current.value
            const category = data.list[categoryIndex]

            if (category.list.length !== 0) {
                alert('分类下面存在节点, 需要移除后删除!')
                return
            }

            dispatch({
                mod: 'system',
                type: 'removeCategory',
                payload: {
                    target: modKey,
                    id: category.id,
                },
            })
        }
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

    return (
        <View style={{
            flex: 1,
            // backgroundColor: 'rgb(247, 248, 249)',
            backgroundColor: 'white',
            paddingBottom: 20,
        }}>
            <ScreenHeader navigation={navigation} title={'编辑分类'} safeArea={true} />


            <ActionSheet
                ref={actionSheetREl}
                title={'确认删除?'}
                options={['删除分类', '取消']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={handleDelPress}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <WhiteSpace>
                    <WingBlank>
                        <MidTitle>{data.name}</MidTitle>
                    </WingBlank>

                    <WingBlank style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 10,
                        // paddingBottom: 20,
                        // borderBottomColor: theme.borderColor,
                        // borderBottomWidth: theme.borderWidth,
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
                            onChange={({ nativeEvent, }) => inputEl.current.value = nativeEvent.text}
                            onSubmitEditing={handleAdd}
                            // onBlur={() => setAddingCategory(false)}
                            maxLength={20}
                            enablesReturnKeyAutomatically={true}
                            autoCorrect={true}
                            clearButtonMode={'while-editing'}
                            blurOnSubmit={true}
                            // autoFocus={true}
                            placeholder={'添加分类'} />

                        <Text style={{
                            position: 'absolute',
                            right: 16,
                            top: 13,
                            // backgroundColor: 'red',
                            // alignItems: 'center',
                            // paddingTop: 10,
                            // paddingBottom: 10,
                            // paddingLeft: 10,
                            // paddingRight: 10,
                            color: theme.grey[0],
                            fontSize: 14,
                        }}>添加</Text>
                    </WingBlank>
                    {
                        R.addIndex(R.map)(
                            (v, k) => (
                                <EditItem
                                    id={v.id}
                                    seq={k}
                                    name={v.name}
                                    theme={theme}
                                    list={v.list}
                                    useInnerEditer={true}
                                    handleJump={() => navigation.push('unitEditLv1View', { modKey, categoryId: v.id, })}
                                    handleEdit={handleEditCategoryName}
                                    handleDelPress={
                                        () => {
                                            actionSheetREl.current.value = k
                                            handleDelActionSheet()
                                        }
                                    } />
                            )
                        )(data.list)
                    }
                </WhiteSpace>
            </ScrollView>
        </View >
    )
}

interface EditItemPayload {
    id: string
    seq: number,
    name: string
    theme: any
    list?: []
    handleJump: () => void
    handleDelPress: () => void
    handleEdit: (id: string, val: string) => void
    useInnerEditer: boolean
}

export const EditItem = (payload: EditItemPayload) => {

    const [editing, setEditing] = useState(false)
    const inputEl = useRef(null)

    const {
        id,
        seq,
        name,
        theme,
        list,
        useInnerEditer,
        handleDelPress,
        handleEdit,
        handleJump,
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
                height: 45,
                // paddingLeft: 15,
                paddingRight: 10,
                // backgroundColor: 'red',
                paddingLeft: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        width: 20,
                        fontSize: 18,
                        color: theme.grey[0],
                    }}>{seq + 1}</Text>
                    {
                        editing
                            ? (
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
                            )
                            : (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        paddingLeft: 0,
                                        paddingRight: 3,
                                        fontSize: 18,
                                    }}>
                                        {name}
                                    </Text>
                                    {
                                        list
                                            ? (
                                                <Text style={{
                                                    color: theme.grey[2],
                                                }}>({list.length})</Text>
                                            )
                                            : null
                                    }
                                </View>
                            )
                    }
                </View>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    {
                        R.addIndex(R.map)(
                            (v, k) => (
                                <TouchView onPress={v.handlePress} key={k}>
                                    <Icon
                                        name={v.name}
                                        size={24}
                                        color={v.color}
                                        style={{ padding: 5, opacity: 0.8, }} />
                                </TouchView>
                            )
                        )([
                            {
                                name: 'circle-edit-outline',
                                color: theme.grey[0],
                                handlePress: () => {
                                    useInnerEditer
                                        ? setEditing(true)
                                        : handleEdit(id)
                                },
                            },
                            {
                                name: 'close',
                                color: theme.red[2],
                                handlePress: handleDelPress,
                            },
                            // {
                            //     name: 'menu',
                            //     color: theme.grey[0],
                            //     handlePress: () => {

                            //     },
                            // },
                        ])
                    }

                </View>
            </View>
        </TouchView>
    )
}

/*
    [特性/文章] 新建/修改 节点一级分类页面
*/
import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, } from 'react'
import { useSetState } from 'ahooks'
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
import ActionSheet from 'react-native-actionsheet'
import TouchView from '../../component/TouchView'
import SimpleScreen from '../../component/View/SimpleScreen'
import { InputItemWithVal, } from '../../component/Form/Input'
import { IfElse, When, } from '../../util/jsx'
import Context from '../../reducer'
import { SkillUnit, SkillUnitCategory, } from '../../variable'
import idBuilder from '../../util/idBuilder'
import WingBlank from '../../component/WingBlank'
import { DefText } from '../../component/Text'
import { AddBtn } from '../unitEditLv1View'
import { info } from '../../util/log'

interface Payload {
    navigation: any
    route: {
        params: {
            node: SkillUnit,
            type: string,
            category: SkillUnitCategory | null,
        },
    },
}

export default (payload: Payload) => {
    info('[编辑分类详情页]: 入口')
    const { state, dispatch, } = useContext(Context)
    const actionSheetREl = useRef(null)

    const {
        theme,
    } = state

    const {
        navigation,
        route: {
            params: {
                node,
                type,
                category,
            },
        },
    } = payload

    // let category: SkillUnitCategory

    // if (id) {
    //     category = node[type][id]
    //     // 执行删除后, 跳转上一页
    //     if (!category) {
    //         alert('找不到对应分类')
    //         navigation.goBack()
    //         return <View></View>
    //     }
    // } else {
    //     category = {
    //         id: idBuilder(categoryList.length),
    //         title: '',
    //         def: '',
    //         node: {},
    //     }
    // }

    const TypePath = ['data', 'node', node.mod, node.id, type]
    const categoryList = R.values(node[type])

    const [featuresState, setFeatures] = useSetState<SkillUnitCategory>(category ? category : {
        id: idBuilder(categoryList.length),
        title: '',
        def: '',
        node: {},
    })

    const handleDel = () => {
        const featuresPath = [...TypePath, featuresState.id]
        const len = R.compose(
            R.length,
            R.values,
            R.prop('node'),
            R.path([...TypePath, category.id])
        )(state)

        if (len) {
            alert('分类下面存在节点, 需要移除后删除!')
            return
        }

        dispatch({
            mod: 'path',
            type: 'del',
            payload: {
                path: featuresPath,
            },
        })
        navigation.goBack()
    }

    const handleNew = () => {
        // 无标题不允许提交
        if (featuresState.title.length === 0) {
            alert('请填写分类标题')
            return
        }

        dispatch({
            mod: 'path',
            type: 'add',
            payload: {
                path: [...TypePath, featuresState.id],
                val: featuresState,
            },
        })

        navigation.goBack()
    }

    const handleActionSheet = () => {
        actionSheetREl.current.show()
    }

    const handleActionSheetSelected = (index) => {
        if (index === 1) {
            handleDel()
        }
    }

    return (
        <SimpleScreen
            formScreen={true}
            navigation={navigation}
            ScreenHeaderConf={{
                title: `${category ? '编辑' : '新建'}分类`,
                right: (
                    <WingBlank>
                        <IfElse test={category} tnode={() => (
                            <TouchView onPress={handleActionSheet}>
                                <DefText style={{ fontSize: 16, }}>删除</DefText>
                            </TouchView>
                        )} fnode={() => (
                            <TouchView onPress={handleNew}>
                                <DefText style={{ fontSize: 16, }}>新建</DefText>
                            </TouchView>
                        )} />
                    </WingBlank>
                )
            }}
            style={{
                backgroundColor: theme.screenBackgroundGreyColor,
            }}>

            <ActionSheet
                ref={actionSheetREl}
                title={'请选择操作'}
                options={['取消', '删除',]}
                cancelButtonIndex={0}
                destructiveButtonIndex={1}
                onPress={handleActionSheetSelected}
            />

            <InputItemWithVal
                title={'名称'}
                path={category ? [...TypePath, category.id, 'title'] : null}
                value={featuresState.title}
                onChange={val => setFeatures({ title: val })} />

            <InputItemWithVal
                inputConf={{
                    multiline: true,
                }}
                title={'简述'}
                path={category ? [...TypePath, category.id, 'def'] : null}
                value={featuresState.def}
                onChange={val => setFeatures({ def: val })} />

            {/* <Text>{JSON.stringify(category)}, {node.mod}, {node.id}, {type}, {JSON.stringify(featuresState, null, 2)}</Text> */}
            {/* <Text>{JSON.stringify(node, null, 2)}</Text> */}
        </SimpleScreen>
    )
}
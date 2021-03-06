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

interface Payload {
    navigation: any
    route: {
        params: {
            node: SkillUnit,
            type: string,
            id: string | null,
        },
    },
}

export default (payload: Payload) => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
    } = state

    const {
        navigation,
        route: {
            params: {
                node,
                type,
                id,
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

    const [featuresState, setFeatures] = useSetState<SkillUnitCategory>()

    useEffect(() => {
        if (id) {
            setFeatures(R.path([...TypePath, id], state))
        }
    }, [])

    const handleDel = () => {
        const featuresPath = [...TypePath, featuresState.id]
        const category = R.path([...TypePath, id], state)
        const len = R.compose(
            R.prop('length'),
            R.value,
            R.prop('node')
        )

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

        const categoryList = R.values(node[type])

        const val = {
            ...featuresState,
            id: idBuilder(categoryList.length),
        }

        dispatch({
            mod: 'path',
            type: 'add',
            payload: {
                path: [...TypePath, val.id],
                val,
            },
        })
        navigation.goBack()
    }

    return (
        <SimpleScreen
            navigation={navigation}
            ScreenHeaderConf={{
                title: '添加分类',
                right: (
                    <WingBlank>
                        <IfElse test={id} tnode={() => (
                            <TouchView onPress={handleDel}>
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

            <InputItemWithVal
                title={'名称'}
                path={id ? [...TypePath, id, 'title'] : null}
                value={featuresState.title}
                onChange={val => setFeatures({ title: val })} />

            <InputItemWithVal
                inputConf={{
                    multiline: true,
                }}
                title={'简述'}
                path={id ? [...TypePath, id, 'def'] : null}
                value={featuresState.def}
                onChange={val => setFeatures({ def: val })} />

            <When test={id} node={() => (
                <AddBtn title={`添加节点`} handlePress={() => {alert(1)}}/>
            )}></When>

            {/* <Text>{id}, {node.mod}, {node.id}, {type}, {JSON.stringify(featuresState, null, 2)}</Text>
            <Text>{JSON.stringify(node, null, 2)}</Text> */}
        </SimpleScreen>
    )
}
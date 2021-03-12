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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ActionSheet from 'react-native-actionsheet'
import TouchView from '../../component/TouchView'
import { info, debug, } from '../../util/log'
import Context from '../../reducer'
import SimpleScreen from '../../component/View/SimpleScreen'
import { SKillJumpToURI, SkillUnitFeatures, } from '../../variable'
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import { IfElse, RMap } from '../../util/jsx'
import { DefText, LargeTitle, MidTitle } from '../../component/Text'
import idBuilder from '../../util/idBuilder'
import { useSetState } from 'ahooks'
import { InputItemWithVal } from '../../component/Form/Input'
import { AddBtn } from '../unitEditLv1View'

interface Payload {
    navigation: any
    route: {
        params: {
            node,
            type,
            categoryId,
            features: SkillUnitFeatures | null,
        },
    },
}

export default (payload: Payload) => {
    info('[编辑要点叶子节点详情页]: 入口')

    const { state, dispatch, } = useContext(Context)
    const actionSheetREl = useRef(null)
    const infoActionSheetREl = useRef(null)

    const {
        theme,
    } = state

    const {
        navigation,
        route: {
            params: {
                node,
                type,
                categoryId,
                features,
            },
        },
    } = payload

    const TypePath = ['data', 'node', node.mod, node.id, type, categoryId, 'node']
    const len = R.compose(
        R.length,
        R.values
    )(node[type][categoryId].node)

    const [featuresState, setFeatures] = useSetState<SkillUnitFeatures>(features ? features : {
        id: idBuilder(len),
        title: '',
        def: '',
        jump: SKillJumpToURI.code,
        url: '',
        major: false,
        code: {},
        explain: {},
    })

    let explain = R.toPairs(featuresState.explain)

    if (!explain.length) {
        explain = [[idBuilder(0), '']]
    }

    let code = R.toPairs(featuresState.code)

    if (!code.length) {
        code = [[idBuilder(0), '']]
    }


    const handleDel = () => {
        const featuresPath = [...TypePath, featuresState.id]

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
            alert('请填写标题')
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


    const handleInfoActionSheet = (key, id) => {
        infoActionSheetREl.current.value = { key, id }
        infoActionSheetREl.current.show()
    }
    const handleInfoActionSheetSelected = (index) => {
        if (index === 1) {
            handleInfoDel()
        }
    }

    const handleAddExplainPress = () => {
        let explain = R.toPairs(featuresState.explain)
        const id = idBuilder(explain.length)

        setFeatures({
            explain: {
                ...featuresState.explain,
                [id]: '',
            },
        })
    }
    const handleAddCodePress = () => {
        let code = R.toPairs(featuresState.code)
        const id = idBuilder(code.length)

        setFeatures({
            code: {
                ...featuresState.code,
                [id]: '',
            },
        })
    }
    const handleInfoDel = () => {
        const {
            key,
            id,
        } = infoActionSheetREl.current.value

        if (features) {
            // 编辑
            dispatch({
                mod: 'path',
                type: 'del',
                payload: {
                    path: [...TypePath, features.id, key, id],
                },
            })
            // 本地缓存
            setFeatures({
                [key]: R.dissoc(id)(featuresState[key]),
            })
        } else {
            // 新增
            setFeatures({
                [key]: R.dissoc(id)(featuresState[key]),
            })
        }
    }

    // 修正数据
    if (R.toPairs(featuresState.explain).length === 0) {
        handleAddExplainPress()
    }
    if (R.toPairs(featuresState.code).length === 0) {
        handleAddCodePress()
    }

    const title = `${features ? '编辑' : '新建'}节点`

    return (
        <SimpleScreen
            theme={theme}
            formScreen={true}
            navigation={navigation}
            ScreenHeaderConf={{
                title,
                right: (
                    <WingBlank>
                        <IfElse test={features} tnode={() => (
                            <TouchView onPress={handleActionSheet}>
                                <View style={{
                                    marginRight: -10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 50,
                                    height: 40,
                                }}>
                                    <DefText style={{ fontSize: 16, }}>删除</DefText>
                                </View>
                            </TouchView>
                        )} fnode={() => (
                            <TouchView onPress={handleNew}>
                                <View style={{
                                    marginRight: -10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 50,
                                    height: 40,
                                }}>
                                    <DefText style={{ fontSize: 16, }}>新建</DefText>
                                </View>
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

            <ActionSheet
                ref={infoActionSheetREl}
                title={'请选择操作'}
                options={['取消', '删除',]}
                cancelButtonIndex={0}
                destructiveButtonIndex={1}
                onPress={handleInfoActionSheetSelected}
            />

            <WhiteSpace>
                <MidTitle>{title}</MidTitle>
            </WhiteSpace>

            <InputItemWithVal
                title={'标题'}
                path={features ? [...TypePath, features.id, 'title'] : null}
                value={featuresState.title}
                onChange={val => setFeatures({ title: val })} />

            <InputItemWithVal
                title={'简述'}
                path={features ? [...TypePath, features.id, 'def'] : null}
                value={featuresState.def}
                onChange={val => setFeatures({ def: val })} />

            <InputItemWithVal
                title={'参考网址'}
                path={features ? [...TypePath, features.id, 'url'] : null}
                value={featuresState.url}
                onChange={val => setFeatures({ url: val })} />

            <View style={{
                marginTop: 20,
                paddingTop: 20,
                paddingBottom: 10,
                borderTopWidth: theme.borderWidth,
                borderTopColor: theme.borderColor,
                // borderBottomWidth: theme.borderWidth,
                // borderBottomColor: theme.borderColor,
            }}>
                <RMap data={
                    R.toPairs(featuresState.explain)
                } node={(v, k) => (
                    <View>
                        <InputItemWithVal
                            key={k}
                            inputConf={{
                                multiline: true,
                            }}
                            title={`概念${k + 1}`}
                            path={features ? [...TypePath, features.id, 'explain', v[0]] : null}
                            value={v[1]}
                            onChange={val => setFeatures({
                                explain: {
                                    ...featuresState.explain,
                                    [v[0]]: val,
                                },
                            })} />
                        <DelIcon color={theme.red[4]} handlePress={() => handleInfoActionSheet('explain', v[0])} />
                    </View>
                )}></RMap>
                <View style={{
                    width: 100,
                }}>
                    <AddBtn title='添加概念' handlePress={handleAddExplainPress}></AddBtn>
                </View>
            </View>

            <View style={{
                marginTop: 20,
                paddingTop: 20,
                paddingBottom: 10,
                borderTopWidth: theme.borderWidth,
                borderTopColor: theme.borderColor,
            }}>
                <RMap data={code} node={(v, k) => (
                    <View>
                        <InputItemWithVal
                            key={k}
                            inputConf={{
                                multiline: true,
                            }}
                            title={`示例${k + 1}`}
                            path={features ? [...TypePath, features.id, 'code', v[0]] : null}
                            value={v[1]}
                            onChange={val => setFeatures({
                                code: {
                                    ...featuresState.code,
                                    [v[0]]: v[1],
                                },
                            })} />
                        <DelIcon color={theme.red[4]} handlePress={() => handleInfoActionSheet('code', v[0])} />
                    </View>
                )}></RMap>
                <View style={{
                    width: 100,
                }}>
                    <AddBtn style={{
                        width: 100,
                    }} title='添加示例' handlePress={handleAddCodePress}></AddBtn>
                </View>
            </View>

        </SimpleScreen >
    )
}

interface DelIconPayload {
    handlePress: () => void
    color: string
}
const DelIcon = (payload: DelIconPayload) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }}>
        <TouchView onPress={payload.handlePress}>
            <Icon name={'close-circle-outline'} size={24} color={payload.color} />
        </TouchView>
    </View>
)
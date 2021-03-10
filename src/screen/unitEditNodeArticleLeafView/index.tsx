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
import ActionSheet from 'react-native-actionsheet'
import TouchView from '../../component/TouchView'
import { info, debug, } from '../../util/log'
import Context from '../../reducer'
import SimpleScreen from '../../component/View/SimpleScreen'
import { SKillJumpToURI, SkillUnitArticle } from '../../variable'
import { useSetState } from 'ahooks'
import idBuilder from '../../util/idBuilder'
import { InputItemWithVal } from '../../component/Form/Input'
import { WingBlank, WhiteSpace, } from '../../component/View/Padding'
import { DefText } from '../../component/Text'
import { IfElse } from '../../util/jsx'

interface Payload {
    navigation: any
    route: {
        params: {
            node,
            type,
            categoryId,
            article: SkillUnitArticle | null,
        },
    },
}

export default (payload: Payload) => {
    info('[编辑文章叶子节点]: 入口')
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
                categoryId,
                article,
            },
        },
    } = payload

    const TypePath = ['data', 'node', node.mod, node.id, type, categoryId, 'node']

    const len = R.compose(
        R.length,
        R.values
    )(node[type][categoryId].node)

    const [articleState, setArticle] = useSetState<SkillUnitArticle>(article ? article : {
        id: idBuilder(len),
        title: '',
        def: '',
        jump: SKillJumpToURI.webview,
        url: '',
        major: false,
    })

    const handleDel = () => {
        const featuresPath = [...TypePath, articleState.id]

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
        if (articleState.title.length === 0) {
            alert('请填写标题')
            return
        }

        dispatch({
            mod: 'path',
            type: 'add',
            payload: {
                path: [...TypePath, articleState.id],
                val: articleState,
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
            theme={theme}
            formScreen={true}
            navigation={navigation}
            ScreenHeaderConf={{
                title: `添加${node.name} - 文章`,
                right: (
                    <WingBlank>
                        <IfElse test={article} tnode={() => (
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
                title={'标题'}
                // path={id ? [...TypePath, id, 'title'] : null}
                value={articleState.title}
                onChange={val => setArticle({ title: val })} />

            <InputItemWithVal
                title={'简述'}
                // path={id ? [...TypePath, id, 'title'] : null}
                value={articleState.def}
                onChange={val => setArticle({ def: val })} />

            <InputItemWithVal
                title={'URL'}
                // path={id ? [...TypePath, id, 'title'] : null}
                value={articleState.url}
                onChange={val => setArticle({ url: val })} />

            {/* <Text>{JSON.stringify(articleState, null, 2)}</Text>
            <Text>{JSON.stringify(categoryId, null, 2)}</Text> */}
        </SimpleScreen>
    )
}
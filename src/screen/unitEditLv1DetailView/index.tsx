import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle, } from 'react'

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
    Switch,
} from 'react-native'

import { Picker, } from '@react-native-picker/picker'
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

import { EditItem, } from '../unitEditCategoryView'


import { SkillStep, SkillPlatform, SkillUnit, ImageType, } from '../../variable'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'
import idBuilder from '../../util/idBuilder'
import { When } from '../../util/jsx'
import { info } from '../../util/log'

// interface DetailPayload {
//     id: string | null
//     name: string
//     def: string
//     url: string
//     major: boolean
//     platform: SkillPlatform
//     version: string
//     logo: {
//         url: string
//         type: string
//         full: boolean
//     }
//     ftStep: SkillStep
//     step: SkillStep
// }

const initState: SkillUnit = {
    id: null,
    name: '',
    def: '',
    url: '',
    platform: SkillPlatform.all,
    version: '',
    major: false,
    logo: {
        url: '',
        type: ImageType.icon,
        full: false,
    },
    ftStep: SkillStep.flag,
    step: SkillStep.flag,
}

export default ({ route, navigation }) => {
    info('[编辑][节点详情页]执行渲染')
    const { state, dispatch, } = useContext(Context)
    const actionSheetREl = useRef(null)

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
        },
    } = state

    const {
        params: {
            modKey,
            categoryId,
            nodeId,
        },
    } = route

    let data = initState

    if (nodeId !== null && node[modKey][nodeId]) {
        data = node[modKey][nodeId]
    }

    const inputName = useRef()
    const inputDef = useRef()
    const inputVersion = useRef()
    const inputLogoUrl = useRef()
    const inputUrl = useRef()

    const [switchMajor, setSwitchMajor] = useState(data.major || false)
    const [switchLogoFull, setSwitchLogoFull] = useState(data.logo.full || false)
    const [pickLogoType, setPickLogoType] = useState(data.logo.type || ImageType.icon)
    const [pickPlatform, setPickPlatform] = useState(data.platform || SkillPlatform.all)
    const [pickFtStep, setPickFtStep] = useState(data.ftStep || SkillStep.flag)
    const [pickStep, setPickStep] = useState(data.step || SkillStep.flag)

    const startTime = new Date()
    useEffect(() => {
        info('[编辑][节点详情页]初始化完成')

        // 渲染计时 结束时间
        const endTime = new Date()

        dispatch({
            mod: 'debug',
            type: 'renderTime_add',
            payload: {
                // 模块
                mod: 'screen - unitEditLv1DetailView',
                name: '编辑][节点详情页]',
                // startTime,
                // endTime,
                // ms
                time: endTime - startTime,
            },
        })

        return () => {
            info('[编辑][节点详情页]执行卸载')
        }
    }, [])

    const handleSave = () => {
        const node: SkillUnit = {
            ...data,
            // id: nodeId || null,
            name: inputName.current.getValue(),
            def: inputDef.current.getValue(),
            url: inputUrl.current.getValue(),
            major: switchMajor,
            platform: pickPlatform,
            version: inputVersion.current.getValue(),
            logo: {
                url: inputLogoUrl.current.getValue(),
                type: pickLogoType,
                full: switchLogoFull,
            },
            ftStep: pickFtStep,
            step: pickStep,
            mod: modKey,
            categoryId,
        }

        dispatch({
            mod: 'system',
            type: 'editNode',
            payload: {
                node,
            },
        })

        navigation.goBack()
    }

    const handleCategoryDelActionSheet = () => {
        actionSheetREl.current.show()
    }

    const handleNodeDelPress = (index) => {
        if (index === 0) {

            dispatch({
                mod: 'system',
                type: 'removeNode',
                payload: {
                    modKey,
                    nodeId: data.id,
                },
            })

            navigation.goBack()
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'rgb(247, 248, 249)',
            paddingBottom: 50,
        }}>
            <ActionSheet
                ref={actionSheetREl}
                title={'确认删除节点?'}
                options={['删除节点', '取消']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={handleNodeDelPress}
            />

            <ScreenHeader
                right={
                    <TouchView onPress={handleSave}>
                        <View style={{
                            marginRight: 20,
                            // backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: theme.main,
                                fontSize: 16,
                            }}>保存</Text>
                        </View>
                    </TouchView>
                }
                navigation={navigation}
                title={nodeId ? `编辑 - ${data.name}` : '添加节点'}
                safeArea={true} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Padding>
                    <InputItem ref={inputName} title={'名称'} theme={theme} defaultValue={data.name} />
                    <InputItem ref={inputDef} title={'简述'} theme={theme} defaultValue={data.def} />
                    <InputItem ref={inputUrl} title={'网址'} theme={theme} defaultValue={data.url} />
                    <InputItem ref={inputVersion} title={'版本'} theme={theme} defaultValue={data.version} />
                    <SwitchItem title={'主要节点'} theme={theme} value={switchMajor} handlePress={setSwitchMajor} />
                    <InputItem ref={inputLogoUrl} title={'logoUrl'} theme={theme} defaultValue={data.logo ? data.logo.url : 'github'} />
                    <SwitchItem title={'logoFull'} theme={theme} value={switchLogoFull} handlePress={setSwitchLogoFull} />

                    <PickerItem
                        title={'logo类型'}
                        theme={theme}
                        type={[
                            { label: ImageType.icon, value: ImageType.icon, },
                            { label: ImageType.jpeg, value: ImageType.jpeg, },
                            { label: ImageType.jpg, value: ImageType.jpg, },
                            { label: ImageType.png, value: ImageType.png, },
                            { label: ImageType.svg, value: ImageType.svg, },
                        ]}
                        value={pickLogoType}
                        setSelectedValue={setPickLogoType} />

                    <PickerItem
                        title={'运行平台'}
                        theme={theme}
                        type={[
                            { label: SkillPlatform.all, value: SkillPlatform.all, },
                            { label: SkillPlatform.native, value: SkillPlatform.native, },
                            { label: SkillPlatform.node, value: SkillPlatform.node, },
                            { label: SkillPlatform.react, value: SkillPlatform.react, },
                            { label: SkillPlatform.reactNative, value: SkillPlatform.reactNative, },
                            { label: SkillPlatform.web, value: SkillPlatform.web, },
                        ]}
                        value={pickPlatform}
                        setSelectedValue={setPickPlatform} />

                    <PickerItem
                        title={'预期目标'}
                        theme={theme}
                        value={pickFtStep}
                        type={[
                            { label: '标记', value: SkillStep.flag, },
                            { label: '大纲', value: SkillStep.overview, },
                            { label: '章节', value: SkillStep.section, },
                            { label: '熟练', value: SkillStep.well, },
                            { label: '精通', value: SkillStep.best, },
                        ]}
                        setSelectedValue={setPickFtStep} />

                    <PickerItem
                        title={'当前阶段'}
                        theme={theme}
                        value={pickStep}
                        type={[
                            { label: '标记', value: SkillStep.flag, },
                            { label: '大纲', value: SkillStep.overview, },
                            { label: '章节', value: SkillStep.section, },
                            { label: '熟练', value: SkillStep.well, },
                            { label: '精通', value: SkillStep.best, },
                        ]}
                        setSelectedValue={setPickStep} />

                    <When test={nodeId} node={() => (
                        <TouchView onPress={handleCategoryDelActionSheet}>
                            <View style={{
                                marginTop: 50,
                                marginBottom: 30,
                                backgroundColor: theme.red[4],
                                borderRadius: 30,
                                padding: 12,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                aliginItem: 'center',
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 14,
                                    // fontWeight: 'bold',
                                }}>删除节点</Text>
                            </View>
                        </TouchView>
                    )} />

                </Padding>
            </ScrollView>
        </View >
    )
}



interface SwitchItemPayload {
    title: string
    theme: any
    value: boolean
    handlePress: (val: boolean) => void
}

const SwitchItem = (payload: SwitchItemPayload) => {

    useEffect(() => {
        payload.handlePress(payload.value)
    }, [])

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
        }}>
            <DefText style={{
                marginRight: 10,
            }}>{payload.title}:</DefText>

            <Switch onValueChange={payload.handlePress} value={payload.value} />
        </View>
    )
}

interface PickerItemPayload {
    title: string
    theme: any
    value: string
    type: { label: string, value: string }[]
    setSelectedValue: (val: string) => void
}

const PickerItem = (payload: PickerItemPayload) => {

    useEffect(() => {
        payload.setSelectedValue(payload.value)
    }, [])

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            // marginBottom: 20,
            overflow: 'hidden',
            paddingTop: 20,
            borderTopColor: payload.theme.borderColor,
            borderTopWidth: payload.theme.borderWidth,
        }}>
            <DefText style={{
                marginRight: 10,
            }}>{payload.title}:</DefText>

            <Picker
                selectedValue={payload.value}
                style={{
                    height: 160,
                    width: 200,
                    // borderWidth: payload.theme.borderWidth,
                    // borderColor: payload.theme.borderColor,
                    // borderRadius: 8,
                    // borderStyle: 'dashed',
                    overflow: 'hidden',
                }}
                onValueChange={(itemValue, itemIndex) => payload.setSelectedValue(itemValue)}>
                {
                    R.addIndex(R.map)(
                        (v, k) => (
                            <Picker.Item label={v.label} value={v.value} />
                        )
                    )(payload.type)
                }
            </Picker>
        </View>
    )
}
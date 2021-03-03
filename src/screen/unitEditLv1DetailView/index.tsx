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


import { SkillStep, } from '../../variable'

import {
    LargeTitle,
    MidTitle,
    Title,
    DefText,
} from '../../component/Text'

const initState = {
    name: '',
    def: '',
    url: '',
    major: false,
    logo: null,
    ftStep: SkillStep.flag,
}

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
            categoryId,
            nodeId,
        },
    } = route

    const category = R.find(
        v => v.id === categoryId
    )(tab[modKey].data.list)

    let data = initState

    if (nodeId !== null) {
        data = R.find(
            v => v.id === nodeId
        )(category.list)
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'rgb(247, 248, 249)',
        }}>
            <ScreenHeader navigation={navigation} title={nodeId ? `编辑 - ${data.name}` : '添加节点'} safeArea={true} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Padding>
                    <InputItem title={'名称'} theme={theme} defaultValue={data.name} />
                    <InputItem title={'简述'} theme={theme} defaultValue={data.def} />
                    <InputItem title={'网址'} theme={theme} defaultValue={data.url} />
                    <SwitchItem title={'主要节点'} theme={theme} value={data.major} handlePress={() => { }} />
                    <InputItem title={'logoUrl'} theme={theme} defaultValue={data.logo ? data.logo.url : ''} />
                    <SwitchItem title={'logoFull'} theme={theme} value={data.logo ? data.logo.full : false} handlePress={() => { }} />

                    <PickerItem
                        title={'logo类型'}
                        theme={theme}
                        type={[
                            { label: 'jpg', value: 'jpg', },
                            { label: 'jpeg', value: 'jpeg', },
                            { label: 'png', value: 'png', },
                            { label: 'svg', value: 'svg', },
                            { label: 'icon', value: 'icon', },
                        ]}
                        value={data.logo ? data.logo.type : 'jpg'}
                        setSelectedValue={() => { }} />

                    <PickerItem
                        title={'预期目标'}
                        theme={theme}
                        value={data.ftStep}
                        type={[
                            { label: '标记', value: SkillStep.flag, },
                            { label: '大纲', value: SkillStep.overview, },
                            { label: '章节', value: SkillStep.section, },
                            { label: '熟练', value: SkillStep.well, },
                            { label: '精通', value: SkillStep.best, },
                        ]}
                        setSelectedValue={() => { }} />
                </Padding>
            </ScrollView>
        </View >
    )
}

interface InputItemPayload {
    title: string
    theme: any
    defaultValue: string
}

const InputItem = (payload: InputItemPayload) => (
    <View>
        <DefText>{payload.title}:</DefText>
        <TextInput
            autoCorrect={true}
            enablesReturnKeyAutomatically={true}
            placeholder={`请输入${payload.title}`}
            clearButtonMode={'while-editing'}
            style={{
                backgroundColor: 'white',
                padding: 12,
                borderRadius: 6,
                marginTop: 8,
                marginBottom: 12,
                fontSize: 12,
                color: payload.theme.grey[7],
            }}
            defaultValue={payload.defaultValue}></TextInput>
    </View>
)

interface SwitchItemPayload {
    title: string
    theme: any
    value: boolean
    handlePress: () => void
}

const SwitchItem = (payload: SwitchItemPayload) => (
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

interface PickerItemPayload {
    title: string
    theme: any
    value: string
    type: { label: string, value: string }[]
    setSelectedValue: (val: string) => void
}

const PickerItem = (payload: PickerItemPayload) => (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        overflow: 'hidden',
    }}>
        <DefText style={{
            marginRight: 10,
        }}>{payload.title}:</DefText>

        <Picker
            selectedValue={payload.value}
            style={{
                height: 180,
                width: 150,
                borderWidth: payload.theme.borderWidth,
                borderColor: payload.theme.borderColor,
                borderRadius: 8,
                borderStyle: 'dashed',
            }}
            onValueChange={(itemValue, itemIndex) => payload.setSelectedValue(itemValue)}
        >
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
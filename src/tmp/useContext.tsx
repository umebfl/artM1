import R from 'ramda'
import React, { createContext, useContext, useCallback, useEffect, useRef, useState, useReducer, useMemo, } from 'react'
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
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

SplashScreen.hide()

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

const initData = {
    counter: 0
}

const ThemeContext = createContext(themes.light)
const DataContext = createContext({})

function Toolbar() {
    return <ThemedButton />
}

// 通过使用useState 缓存callback返回的值,
// 通过useEffect, 监听callback的变更, 如果变更则重新计算再缓存
const Test4 = ({ callback }) => {
    console.log('[Test4]入口')
    const [count, setCount] = useState(() => callback())

    useEffect(() => {
        console.log('[Test4]useEffect', callback())
        // 缓存值
        setCount(callback())
    }, [callback])

    return (
        <View>
            <Text>Test4: {JSON.stringify(count)}</Text>
        </View>
    )
}

// 父节点使用了useMemo, 子节点如果存在useContext, 依旧绘执行刷新
const Test3 = () => {
    const data = useContext(DataContext)
    console.log('[Test3]入口')

    return useMemo(
        () => {
            console.log('[Test3]useMemo')
            return (
                <View>
                    <Text>Test3: {JSON.stringify(data)}</Text>
                </View>
            )
        }, [data]
    )
}

// 子节点如果使用参数传递,可以避免useContext的刷新穿透
const Test2 = ({ theme }) => {
    console.log('[Test2]入口')
    const data1 = useContext(DataContext)

    // 如果父节点使用了useMemo, 包含的useCallback不会被穿透调用, 即使依赖项数组发生改变
    // 如果父节点的useMemo被调用, 包含的useCallback就会被调用, 即使依赖项数组未改变
    // 也就是在useMemo内使用useCallback是无效的
    // 不要在useMemo内使用useCallback
    const getData = useCallback(
        () => {
            console.log('[Test2]useCallback')
            return data1.data
        }, [data1]
    )

    // return (
    //     <View>
    //         <Text>Test2: {JSON.stringify(theme)}</Text>
    //         <Test3></Test3>
    //         <Text>data:{data()}</Text>
    //     </View>
    // )

    return useMemo(
        () => {
            console.log('[Test2]useMemo')
            return (
                <View>
                    <Text>Test2: {JSON.stringify(theme)}</Text>
                    <Test3></Test3>
                    <Test4 callback={getData}></Test4>
                </View>
            )
        }, [data1]
    )
}

// 只要不使用useContext, 父节点使用了useMemo, 子节点就不会刷新, 即使传递了参数, 即使参数发生了改变
const Test5 = ({ theme, data }) => {
    console.log('[Test5]入口')
    return (
        <View>
            <Text>Test5: theme {JSON.stringify(theme)}</Text>
            <Text>Test5: data {JSON.stringify(data)}</Text>
            <Test3></Test3>
        </View>
    )
}

// useContext
// 只要存在一个useContext刷新,组件都会从app开始一直刷新下去,
const Test1 = () => {
    const theme = useContext(ThemeContext)
    const data = useContext(DataContext)
    console.log('[Test1]入口')

    return useMemo(
        () => {
            console.log('[Test1]useMemo')
            return (
                <View>
                    <Test2 theme={theme}></Test2>
                    <Text>Test1: {JSON.stringify(theme)}</Text>
                    <Test5 theme={theme} data={data}></Test5>
                </View>
            )
        }, [data]
    )
}

function ThemedButton() {
    const theme = useContext(ThemeContext)
    const { data, dispatch } = useContext(DataContext)

    console.log('[ThemedButton]入口')

    return (
        <View style={{
            flex: 1,
        }}>
            <Text style={{ backgroundColor: theme.background, color: theme.foreground }}>
                {data.counter}
            </Text>
            <TouchableWithoutFeedback onPress={() => dispatch({ type: 'del' })}><Text>-</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => dispatch({ type: 'add' })}><Text>+</Text></TouchableWithoutFeedback>
        </View>
    );
}

export default () => {
    console.log('[App]入口')

    const [data, setData] = useState(initData)

    const payload = {
        data: data,
        dispatch: (action) => {
            if (action.type === 'add') {
                // 如果根节点地址不变更, 则不会触发重新渲染, 也就是无效
                // 如果根节点地址变更, 又会触发全部节点的渲染
                // 也就是多个useContext并没有分割的作用
                setData({
                    counter: data.counter - 1
                })
            }
            if (action.type === 'del') {
                setData({
                    counter: data.counter + 1
                })
            }
        }
    }

    return (
        <View style={{ height: 1000, }}>
            <Text>123</Text>
            <DataContext.Provider value={payload} >
                <ThemeContext.Provider value={themes.dark}>
                    <View style={{ flex: 1, }}>
                        <Test1></Test1>
                        <Toolbar />
                    </View>
                </ThemeContext.Provider>
            </DataContext.Provider >
        </View>
    )
}
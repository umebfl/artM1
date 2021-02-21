import {
    NativeModules,
} from 'react-native'

const { StatusBarManager } = NativeModules

// 刘海屏处理
export let statusBarHeight = 0

if (Platform.OS === 'ios') {
    StatusBarManager.getHeight(height => {
        statusBarHeight = height.height
    })
} else {
    statusBarHeight = StatusBar.currentHeight.height
}
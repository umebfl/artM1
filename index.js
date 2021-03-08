import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native'

import { LogBox } from 'react-native'

import App from './src/App'
// import App from './src/TestApp'
// import App from './src/FixApp'
import {name as appName} from './app.json'

LogBox.ignoreAllLogs()
// LogBox.ignoreLogs([
//     'Warning: componentWillMount is deprecated',
//     'Warning: componentWillReceiveProps is deprecated',
//     'Module RCTImageLoader requires',
//     'Warning: componentWillUpdate is deprecated',
//     'ReactNativeFiberHostComponent',
//     'Task orphaned for request',
//     'RCTBridge required dispatch_sync to load RCTDevLoadingView',
//     'componentWillReceiveProps has been renamed',
//     'componentWillMount has been renamed',
// ]);

AppRegistry.registerComponent(appName, () => App)

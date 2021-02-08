// import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native'

import App from './src/App'
import {name as appName} from './app.json'

import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
    'Warning: componentWillUpdate is deprecated',
    'ReactNativeFiberHostComponent',
    'Task orphaned for request',
]);

AppRegistry.registerComponent(appName, () => App)

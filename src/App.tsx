import React, { useReducer, useEffect, useState, } from 'react'

import Clipboard from '@react-native-community/clipboard'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from '@react-navigation/stack'

import { TransitionPresets } from '@react-navigation/stack'

import RootContext, { initState, reducer, } from './reducer'

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
} from 'react-native'

import Home from './navigation/home'

import DataView from './navigation/other/dataView'
import DebugView from './navigation/other/debugView'
import About from './navigation/other/about'
import RenderTime from './navigation/other/renderTime'

import ReadWebview from './screen/readWebview'
import UnitListView from './screen/unitListView'
import UnitDetail from './screen/unitDetail'
import unitDetailCode from './screen/unitDetailCode'
import unitCodeModal from './screen/unitCodeModal'
import unitEditCategoryView from './screen/unitEditCategoryView'
import unitEditLv1View from './screen/unitEditLv1View'
import unitEditLv1DetailView from './screen/unitEditLv1DetailView'

import unitEditNodeCategoryView from './screen/unitEditNodeCategoryView'
import unitEditNodeArticleLeafView from './screen/unitEditNodeArticleLeafView'
import unitEditNodeFeaturesLeafView from './screen/unitEditNodeFeaturesLeafView'

import { getData, clearData, } from './reducer'

import { info, debug, } from './util/log'

const RootStack = createStackNavigator()
const ModalStack = createStackNavigator()

const App = () => {
  // clearData()
  info('===    渲染App   ===')

  const [state, dispatch] = useReducer(reducer, initState)
  const [inited, setInited] = useState(false)

  const init = async () => {
    info('[App]执行初始化')
    const data = await getData()

    if (data) {
      info('更新本地缓存')

      dispatch({
        mod: 'system',
        type: 'init',
        payload: data,
      })
    }

    setInited(true)
    info('[App]初始化完成')
  }

  useEffect(() => {
    init()
  }, [])

  if (inited === false) {
    info('inited === false')
    return (
      <View>
      </View>
    )
  }

  function MainStackScreen() {
    return (
      <RootStack.Navigator headerMode='none' initialRouteName='home'>
        <RootStack.Screen name='home' component={Home} />

        <RootStack.Screen name='readWebview' component={ReadWebview} />
        <RootStack.Screen name='unitListView' component={UnitListView} />
        <RootStack.Screen name='unitDetailView' component={UnitDetail} />
        <RootStack.Screen name='unitDetailCodeView' component={unitDetailCode} />
        <RootStack.Screen name='unitEditCategoryView' component={unitEditCategoryView} />
        <RootStack.Screen name='unitEditLv1View' component={unitEditLv1View} />
        <RootStack.Screen name='unitEditLv1DetailView' component={unitEditLv1DetailView} />

        <RootStack.Screen name='unitEditNodeCategoryView' component={unitEditNodeCategoryView} />
        <RootStack.Screen name='unitEditNodeArticleLeafView' component={unitEditNodeArticleLeafView} />
        <RootStack.Screen name='unitEditNodeFeaturesLeafView' component={unitEditNodeFeaturesLeafView} />

        <RootStack.Screen name='renderTime' component={RenderTime} />
        <RootStack.Screen name='about' component={About} />
        <RootStack.Screen name='dataView' component={DataView} />
        <RootStack.Screen name='debugView' component={DebugView} />

      </RootStack.Navigator>
    );
  }

  return (
    <RootContext.Provider value={{ state, dispatch, }}>
      <NavigationContainer>

        <ModalStack.Navigator
          // screenOptions={{
          //   headerShown: false,
          //   cardStyle: { backgroundColor: 'transparent' },
          //   cardOverlayEnabled: true,
          //   cardStyleInterpolator: ({ current: { progress } }) => ({
          //     cardStyle: {
          //       opacity: progress.interpolate({
          //         inputRange: [0, 0.5, 0.9, 1],
          //         outputRange: [0, 0.25, 0.7, 1],
          //       }),
          //     },
          //     overlayStyle: {
          //       opacity: progress.interpolate({
          //         inputRange: [0, 1],
          //         outputRange: [0, 0.5],
          //         extrapolate: 'clamp',
          //       }),
          //     },
          //   }),
          // }}

          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            cardOverlayEnabled: true,
            // cardStyleInterpolator: ({ current: { progress } }) => ({
            //   cardStyle: {
            //     opacity: progress.interpolate({
            //       inputRange: [0, 0.5, 0.9, 1],
            //       outputRange: [0, 0.25, 0.7, 1],
            //     }),
            //   },
            //   overlayStyle: {
            //     opacity: progress.interpolate({
            //       inputRange: [0, 1],
            //       outputRange: [0, 0.5],
            //       extrapolate: 'clamp',
            //     }),
            //   },
            // }),

            // cardOverlay: () => <View style={{ height: 500,  }}></View>,
            // headerStatusBarHeight: 1000,
            // navigation
            //   .dangerouslyGetState()
            //   .routes.findIndex((r) => r.key === route.key) > 0
            //   ? 0
            //   : undefined,
          })}
          mode='modal'>

          <RootStack.Screen
            name='Main'
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name='unitDetailCodeModal' component={unitCodeModal}
            options={{
              title: 'Profile',
              // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
              // 收势
              gestureEnabled: true,
              gestureResponseDistance: {
                vertical: 800,
                horizontal: 400,
              },
              safeAreaInsets: {
                top: 400,
              },
              // 卡片
              cardOverlayEnabled: true,
              cardStyle: {
                backgroundColor: 'transparent',
              },
              ...TransitionPresets.ModalPresentationIOS,

              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
            }} />
        </ModalStack.Navigator>

      </NavigationContainer>
    </RootContext.Provider>
  )
}

export default App



// const test2 = useMemo(() => <Test2 />, [state.debug.count2])

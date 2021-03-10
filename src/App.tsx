import React, { useReducer, useEffect, useState, useCallback, } from 'react'

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
import { useMemo } from 'react/cjs/react.development'

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

  // 执行初始化
  useEffect(() => {
    init()
  }, [])

  // 没有初始化完成, 不显示
  if (inited === false) {
    info('inited === false')
    return (
      <View>
      </View>
    )
  }

  // const MainStackScreen = useCallback(() => {
  //   info('[MainStackScreen]执行')
  //   return (
  //     <RootStack.Navigator headerMode='none' initialRouteName='home'>
  //       <RootStack.Screen name='home' component={Home} />

  //       <RootStack.Screen name='readWebview' component={ReadWebview} />
  //       <RootStack.Screen name='unitListView' component={UnitListView} />
  //       <RootStack.Screen name='unitDetailView' component={UnitDetail} />
  //       <RootStack.Screen name='unitDetailCodeView' component={unitDetailCode} />
  //       <RootStack.Screen name='unitEditCategoryView' component={unitEditCategoryView} />
  //       <RootStack.Screen name='unitEditLv1View' component={unitEditLv1View} />
  //       <RootStack.Screen name='unitEditLv1DetailView' component={unitEditLv1DetailView} />

  //       <RootStack.Screen name='unitEditNodeCategoryView' component={unitEditNodeCategoryView} />
  //       <RootStack.Screen name='unitEditNodeArticleLeafView' component={unitEditNodeArticleLeafView} />
  //       <RootStack.Screen name='unitEditNodeFeaturesLeafView' component={unitEditNodeFeaturesLeafView} />

  //       <RootStack.Screen name='renderTime' component={RenderTime} />
  //       <RootStack.Screen name='about' component={About} />
  //       <RootStack.Screen name='dataView' component={DataView} />
  //       <RootStack.Screen name='debugView' component={DebugView} />
  //     </RootStack.Navigator>
  //   )
  // }, [])

  return (
    <RootContext.Provider value={{ state, dispatch, }}>
      <NavigationContainer>

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

        {/* <ModalStack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            cardOverlayEnabled: true,
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
              gestureEnabled: true,
              gestureResponseDistance: {
                vertical: 800,
                horizontal: 400,
              },
              safeAreaInsets: {
                top: 400,
              },
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
            
        </ModalStack.Navigator> */}

      </NavigationContainer>
    </RootContext.Provider>
  )
}

export default App



// const test2 = useMemo(() => <Test2 />, [state.debug.count2])

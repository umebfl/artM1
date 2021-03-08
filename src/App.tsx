import React, { useReducer, useEffect, useState, } from 'react'

import Clipboard from '@react-native-community/clipboard'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

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
import unitEditCategoryView from './screen/unitEditCategoryView'
import unitEditLv1View from './screen/unitEditLv1View'
import unitEditLv1DetailView from './screen/unitEditLv1DetailView'

import unitEditNodeCategoryView from './screen/unitEditNodeCategoryView'
import unitEditNodeArticleLeafView from './screen/unitEditNodeArticleLeafView'
import unitEditNodeFeaturesLeafView from './screen/unitEditNodeFeaturesLeafView'

import { getData, clearData, } from './reducer'

import { info, debug, } from './util/log'

const RootStack = createStackNavigator()

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
      </NavigationContainer>
    </RootContext.Provider>
  )
}

export default App



// const test2 = useMemo(() => <Test2 />, [state.debug.count2])

import React, { useReducer, useEffect, useState, } from 'react'
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
// import Test from './tmp/test'
// import Test2 from './tmp/test2'

import DataView from './navigation/other/dataView'
import DebugView from './navigation/other/debugView'

import ReadWebview from './screen/readWebview'
import UnitListView from './screen/unitListView'
import UnitDetail from './screen/unitDetail'
import unitDetailCode from './screen/unitDetailCode'

import { getData, clearData, } from './reducer'

import { info, debug, } from './util/log'
import { T } from 'ts-toolbelt'

const RootStack = createStackNavigator()

const App = () => {

  // 渲染计时 起始时间
  const startTime = new Date()

  const [state, dispatch] = useReducer(reducer, initState)
  const [inited, setInited] = useState(false)

  const init = async () => {
    info('App init')
    const data = await getData()

    debug(`data: ${JSON.stringify(data)}`)

    if (data) {
      info('更新本地缓存')
    
      debug(`data: ${JSON.stringify(data)}`)
    
      dispatch({
        mod: 'system',
        type: 'init',
        payload: data,
      })
    }

    setInited(true)
    info('App inited')
  }

  useEffect(() => {
    init()
  
    // 渲染计时 结束时间
    const endTime = new Date()

    dispatch({
      mod: 'debug',
      type: 'renderTime_add',
      payload: {
        // 模块
        mod: 'App',
        name: '总计',
        // startTime,
        // endTime,
        // ms
        time: endTime - startTime,
      },
    })

  }, [])

  info('渲染App')

  if (inited === false) {
    return (
      <View>
        <Text>123</Text>
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


          <RootStack.Screen name='dataView' component={DataView} />
          <RootStack.Screen name='debugView' component={DebugView} />

        </RootStack.Navigator>
      </NavigationContainer>
    </RootContext.Provider>
  )
}

export default App



// const test2 = useMemo(() => <Test2 />, [state.debug.count2])

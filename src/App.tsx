import React, { useReducer, useMemo, } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import RootContext, { initState, reducer, } from './reducer'

import Home from './navigation/home'
// import Test from './tmp/test'
// import Test2 from './tmp/test2'

import ReadWebview from './screen/readWebview'
import UnitListView from './screen/unitListView'
import UnitDetail from './screen/unitDetail'
import unitDetailCode from './screen/unitDetailCode'

const RootStack = createStackNavigator()

const App = () => {

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <RootContext.Provider value={{ state, dispatch, }}>
      <NavigationContainer>
        <RootStack.Navigator headerMode='none' initialRouteName='home'>
          <RootStack.Screen name='home' component={Home} />

          <RootStack.Screen name='readWebview' component={ReadWebview} />
          <RootStack.Screen name='unitListView' component={UnitListView} />
          <RootStack.Screen name='unitDetailView' component={UnitDetail} />
          <RootStack.Screen name='unitDetailCodeView' component={unitDetailCode} />

          {/* <RootStack.Screen name='test' component={Test} />
          <RootStack.Screen name='test2' component={Test2} /> */}
        </RootStack.Navigator>
      </NavigationContainer>
    </RootContext.Provider>
  )
}

export default App



// const test2 = useMemo(() => <Test2 />, [state.debug.count2])

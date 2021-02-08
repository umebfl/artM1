import React, { useReducer, useMemo, } from 'react'
// import { NavigationContainer } from '@react-navigation/native'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'

import RootContext, { initState, reducer, } from './reducer'

import Test from './tmp/test'
import Test2 from './tmp/test2'

const App = () => {

  const [state, dispatch] = useReducer(reducer, initState)

  // const test2 = useMemo(() => <Test2 />, [state.debug.count2])

  return (
    <RootContext.Provider value={{ state, dispatch, }}>
      <Test />
    </RootContext.Provider>
  )
}

export default App

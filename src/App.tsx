import React, { useReducer, useMemo, } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

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

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator()

const App = () => {

  const [state, dispatch] = useReducer(reducer, initState)

  // const test2 = useMemo(() => <Test2 />, [state.debug.count2])

  return (
    <RootContext.Provider value={{ state, dispatch, }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootContext.Provider>
  )
}

export default App

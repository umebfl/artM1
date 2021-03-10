import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, useReducer, } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
    Clipboard,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <Text>Count: {state.count}</Text>
      <TouchableWithoutFeedback onPress={() => dispatch({type: 'decrement'})}><Text>-</Text></TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => dispatch({type: 'increment'})}><Text>+</Text></TouchableWithoutFeedback>
    </>
  );
}
  
export default () => {

    return (
        <SafeAreaView>
            <Counter/>
        </SafeAreaView>
    )
}
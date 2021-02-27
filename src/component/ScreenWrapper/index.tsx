import React, { useState, useContext, useEffect, } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { statusBarHeight, } from '../../util/StatusBarManager'

enum ContentViewType {
  View,
  ScrollView
}

interface payload {
  navigation: any,
  theme: any,
  children: any,
  imageBackground?: any,
  LinearGradientBackground?: boolean,
  ContentViewType?: ContentViewType,
}

const ScreenWrapper = (payload: payload) => {

  const {
    navigation,
    theme,
    children,
    imageBackground,
    LinearGradientBackground,
    ContentViewType,
  } = payload

  return (
    <ImageBackground source={imageBackground || null} style={{
      flex: 1,
      resizeMode: 'contain',
      justifyContent: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height + 4,
    }}>
      <LinearGradient
        start={{ x: 0.5, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
        style={{
          flex: 1,
          // opacity: 0.5,
        }}
        colors={
          imageBackground
            ? ['rgba(0,0,0,0)']
            : LinearGradientBackground === false
              ? ['white', 'white', 'white']
              : ['rgb(220, 216, 215)', 'white', 'white']
        }>
          {
            ContentViewType === 'View'
              ? (
                <View style={{ flex: 1, paddingTop: statusBarHeight, paddingBottom: 20, }}>
                  {
                    children ? children : null
                  }
                </View>
              )
              : (
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: statusBarHeight, paddingBottom: 20,  }}>
                  {
                    children ? children : null
                  }
                </ScrollView>
              )
          }
      </LinearGradient>
    </ImageBackground>
  )
}

export default ScreenWrapper
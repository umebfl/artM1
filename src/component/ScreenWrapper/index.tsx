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

const ScreenWrapper = payload => {

    const {
      navigation,
      theme,
      children,
      imageBackground,
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
          colors={imageBackground ? ['rgba(0,0,0,0)'] : ['rgb(220, 216, 215)', 'white', 'white']}>
          <SafeAreaView style={{ flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}>
              {
                children ? children : null
              }
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    )
  }

  export default ScreenWrapper
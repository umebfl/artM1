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

export default ({ handleSubmit, }) => {

  const [value, onChangeText] = useState('')

  // 打开webview 请求百度搜索
  const onSubmitEditing = () => {
    const val = value
    onChangeText('')
    handleSubmit(val)
  }

  return (
    <View style={{
      height: 40,
      marginTop: 10,
      // backgroundColor: 'red',
      // opacity: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <View style={{ width: 60 - 30, }}></View>
      <TextInput
        clearTextOnFocus={true}
        clearButtonMode={'while-editing'}
        blurOnSubmit={true}
        autoCapitalize={'none'}
        placeholder={'Bing'}
        style={{
          flex: 1,
          height: 40,
          borderRadius: 20,
          // borderWidth: 0,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: 'white',
        }}
        onBlur={() => onChangeText('')}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        value={value}
      />
      <View style={{ width: 60 - 30, }}></View>
    </View>
  )
}
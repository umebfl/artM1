import React, { useReducer, useRef, useEffect, useState, useCallback, } from 'react'

import Restart from 'react-native-restart'
import ActionSheet from 'react-native-actionsheet'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, } from '@react-navigation/drawer'
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
import Other from './navigation/other'

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
import TouchView from './component/TouchView'
import { LargeTitle, MidTitle, Title } from './component/Text'
import List, { Item } from './component/List'
import { Padding, WhiteSpace, WingBlank } from './component/View/Padding'
import ScrollEndLine from './component/ScrollEndLine'
import UnitLogo from './component/UnitLogo'
import { statusBarHeight } from './util/StatusBarManager'
import LinearGradient from 'react-native-linear-gradient'

const RootStack = createStackNavigator()
const ModalStack = createStackNavigator()
const DrawerStack = createDrawerNavigator()

const MainStackScreen = () => {
  // info('[MainStackScreen]执行')
  return (
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
  )
}

const ModalScreen = () => {
  // info('[ModalScreen]执行')
  return (
    <ModalStack.Navigator
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
          // title: 'Profile',
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

    </ModalStack.Navigator>
  )
}

function CustomDrawerContent(drawProps, state, dispatch) {

  // const actionSheetREl = useRef(null)
  // const [copyed, setCopyed] = useState(false)

  let copyed = false

  const {
    navigation,
  } = drawProps

  const {
    theme,
    debug: {
      open,
    },
  } = state


  const handleClearCachePress = async (index) => {
    if (index === 0) {
      await clearData()
      Restart.Restart()
    }
  }

  const handleClearCacheActionSheet = () => {
    // actionSheetREl.current.show()
  }

  const handleProSource = () => {
    navigation.navigate('readWebview', { url: 'https://gitee.com/huanganqi/artM1', })
  }

  const handleRenderTime = () => {
    navigation.navigate('renderTime')
  }
  const handleJump = (path) => {
    navigation.navigate(path)
  }

  const handleDebugModSwitch = () => {
    dispatch({
      mod: 'debug',
      type: 'toggle',
    })
  }

  const handleCopyData = () => {
    // Clipboard.setString(JSON.stringify(state.data, null, 2))
    // setCopyed(true)
  }

  const logo = {
    url: 'https://graph.baidu.com/thumb/v4/1494536961,4092862304.jpg',
    type: 'jpg',
    full: true,
  }

  const grey = theme.screenBackgroundGreyColor[theme.model]

  return (
    <View style={{
      flex: 1,
    }}>
      <LinearGradient
        start={{ x: 0.5, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
        style={{ flex: 1, }}
        colors={[ grey, grey, 'white']}>
        {/* colors={['rgb(220, 216, 215)', 'rgb(242, 243, 244)', 'rgb(242, 243, 244)', 'white']}> */}

        <WingBlank style={{
          paddingTop: statusBarHeight + 5,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: 8,
        }}>
          <UnitLogo size={50} data={logo}></UnitLogo>
          <MidTitle style={{ marginLeft: 10, fontSize: 26, color: theme.grey[6] }}>Doil 5</MidTitle>
        </WingBlank>

        <DrawerContentScrollView
          showsVerticalScrollIndicator={false}
          style={{
            // backgroundColor: theme.screenBackgroundGreyColor[theme.model],
          }}>
          <WingBlank style={{
            marginTop: -50,
          }}>
            <List theme={theme} title={'开发'}>
              <Item theme={theme} title={'数据面板'} icon={'database-search'} type='jump' handlePress={() => handleJump('dataView')} />
              <Item theme={theme} title={'调试面板'} icon={'android-debug-bridge'} type='jump' handlePress={() => handleJump('debugView')} />
              {/* <Item theme={theme} title={'清空缓存'} icon={'backup-restore'} handlePress={() => handleClearCacheActionSheet} /> */}
              <Item theme={theme} title={'调试模式'} icon={'bug-check-outline'} type='switch' value={open} handlePress={handleDebugModSwitch} />
              <Item theme={theme} title={'渲染耗时'} icon={'chart-bar'} handlePress={handleRenderTime} />
              <Item theme={theme} title={'项目代码'} icon={'github'} type='jump' handlePress={handleProSource} />
              {/* <Item theme={theme} title={'拷贝系统数据'} icon={'github'} handlePress={handleCopyData} type={'msg'} value={copyed ? '拷贝完成' : ''} /> */}
            </List>

            <List theme={theme} >
              <Item theme={theme} title={'显示'} icon={'format-text'} type='jump' handlePress={() => handleJump('about')} />
              <Item theme={theme} title={'主题'} icon={'theme-light-dark'} type='jump' handlePress={() => handleJump('about')} />
              <Item theme={theme} title={'语言'} icon={'translate'} type='jump' handlePress={() => handleJump('about')} />
            </List>

            <List theme={theme} >
              <Item theme={theme} title={'分享Skill'} icon={'checkbox-marked-circle-outline'} jumpTo={'setting'} />
              <Item theme={theme} title={'关于'} icon={'alert-circle-outline'} type='jump' handlePress={() => handleJump('about')} />
            </List>
          </WingBlank>

          <WhiteSpace>
            <ScrollEndLine />
          </WhiteSpace>
        </DrawerContentScrollView>
      </LinearGradient>
    </View>
  )
}

const App = () => {
  // clearData()
  const [state, dispatch] = useReducer(reducer, initState)



  return (
    <RootContext.Provider value={{ state, dispatch, }}>
      <NavigationContainer>
        <DrawerStack.Navigator
          lazy={false}
          drawerContent={drawProps => CustomDrawerContent(drawProps, state, dispatch)}
          drawerType={'slide'}
          drawerStyle={{ width: '86%' }}
          edgeWidth={50}
          initialRouteName='Home'>

          <DrawerStack.Screen name='Home' component={ModalScreen} options={{ headerShown: false }} />
          <DrawerStack.Screen name="Notifications" component={About} />
        </DrawerStack.Navigator>
      </NavigationContainer>
    </RootContext.Provider>
  )
}

export default App


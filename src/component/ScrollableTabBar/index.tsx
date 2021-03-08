import React, { useContext, } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

// propTypes: {
//   goToPage: PropTypes.func,
//   activeTab: PropTypes.number,
//   tabs: PropTypes.array,
//   backgroundColor: PropTypes.string,
//   activeTextColor: PropTypes.string,
//   inactiveTextColor: PropTypes.string,
//   textStyle: Text.propTypes.style,
//   tabStyle: ViewPropTypes.style,
//   renderTab: PropTypes.func,
//   underlineStyle: ViewPropTypes.style,
// },

import Context from '../../reducer'

interface payload {
  width: number
  tabs: any
  containerWidth: number
  scrollValue: any
  tabStyle: any
  activeTab; any
  activeTextColor: any
  inactiveTextColor: any
  textStyle: any
  goToPage: any
}

export default (payload: payload) => {

  const { state, } = useContext(Context)

  const {
    theme
} = state

  const initialLayout = { width: payload.width || Dimensions.get('window').width }

  const tabs = payload.tabs

  // 两边宽度
  const betweenWidth = 60 // 60

  // tab宽度
  const tabWidth = initialLayout.width - betweenWidth * 2

  // tab item宽度
  const itemWidth = tabWidth / tabs.length

  // 下划线宽度
  const lineWidth = tabWidth / tabs.length

  function getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    }
  }

  function renderTabOption(name, page) {

  }

  const containerWidth = payload.containerWidth
  const numberOfTabs = payload.tabs.length

  const translateX = payload.scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, itemWidth],
  })

  const renderTab = (name, page, isTabActive, onPressHandler) => {
    const { activeTextColor, inactiveTextColor, textStyle, } = payload
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return <TouchableOpacity
      style={{ flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6
      }, payload.tabStyle,]}>
        <Animated.Text style={{
          textAlign: 'center',
          color: isTabActive ? theme.grey[9] : theme.grey[4],
          fontSize: 18,
          fontWeight: isTabActive ? 'normal' : 'normal',
        }}>
          {name}
        </Animated.Text>
      </View>
    </TouchableOpacity >
  }

  return (
    <View style={{ height: 46, flexDirection: 'row', backgroundColor: theme.navigationTabBarBackgound, }}>
      <View style={{ width: betweenWidth, }}></View>
      {payload.tabs.map((name, page) => {
        const isTabActive = payload.activeTab === page
        // const renderTab = payload.renderTab || renderTab
        return renderTab(name, page, isTabActive, payload.goToPage)
      })}

      <Animated.View style={{
        position: 'absolute',
        width: itemWidth,
        bottom: 14,
        left: betweenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [
          { translateX },
        ],
      }}>
        <View style={{ width: 50, borderRadius: 5, opacity: 0.4, flex: 1, height: 6, backgroundColor: theme.main, }}></View>
      </Animated.View>

      <View style={{ width: betweenWidth, }}></View>
    </View>
  )
}

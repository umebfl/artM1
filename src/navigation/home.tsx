import R from 'ramda'
import React, { useContext, useEffect, } from 'react'

import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Context from '../reducer'

import Futu from './futu'
import Info from './info'
import Other from './other'
import Skill from './skill'
import Todo from './todo'
import Test from '../tmp/test'

const Tab = createBottomTabNavigator()

const buildScreen = R.cond([
    [
        R.equals('futu'),
        () => Futu,
    ],
    [
        R.equals('info'),
        () => Info,
    ],
    [
        R.equals('other'),
        () => Other,
    ],
    [
        R.equals('skill'),
        () => Skill,
    ],
    [
        R.equals('todo'),
        () => Todo,
    ],
])

export default () => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        navigation: {
            home: {
                initialRouteName,
                tab,
            },
        },
    } = state

    return (
        <Tab.Navigator initialRouteName={initialRouteName}>
            {
                R.addIndex(R.map)(
                    (v, k) => (
                        <Tab.Screen key={k} name={v.name}
                            options={({ route }) => ({
                                tabBarLabel: v.text,
                                tabBarIcon: ({ focused, color, size }) => {

                                    const iconSize = focused ? 20 : 24
                                    const backgroundColor = theme.navigationTabBarBackgound || 'red'

                                    return (
                                        <LinearGradient
                                            start={{ x: 1.0, y: 0.25 }}
                                            end={{ x: 0.5, y: 1.0 }}
                                            colors={
                                                focused
                                                    ? [theme.second || 'red', theme.second || 'red', theme.main || 'red']
                                                    : [backgroundColor, backgroundColor]}
                                            style={{ width: 26, height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: 15, }}>
                                            <Icon
                                                style={{ width: iconSize, height: iconSize }}
                                                name={v.icon}
                                                size={iconSize}
                                                color={focused ? 'white' : 'gray'} />
                                        </LinearGradient>
                                    )
                                },
                            })}
                            component={buildScreen(v.name)} />
                    )
                )(tab)
            }
        </Tab.Navigator>
    )
}


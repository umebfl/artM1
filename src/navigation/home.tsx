import R from 'ramda'
import React, { useContext, useEffect, useMemo, } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'

import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Context from '../reducer'

import Futu from './futu'
import Info from './info'
import Other from './other'
import Skill from './skill'
import SkillTab from './skillTab'
import Server from './server'
import Theory from './theory'
import Interactive from './interactive'
import Todo from './todo'
import Test from '../tmp/test'

const Tab = createBottomTabNavigator()

// const buildScreen = R.cond([
//     [
//         R.equals('futu'),
//         () => Futu,
//     ],
//     [
//         R.equals('info'),
//         () => Info,
//     ],
//     [
//         R.equals('other'),
//         () => Other,
//     ],
//     // [
//     //     R.equals('skill'),
//     //     () => Skill,
//     // ],
//     [
//         R.equals('interactive'),
//         () => ({ navigation, }) => SkillTab({ navigation, type: 'interactive', }),
//     ],
//     [
//         R.equals('server'),
//         () => ({ navigation, }) => SkillTab({ navigation, type: 'server', }),
//     ],
//     [
//         R.equals('theory'),
//         () => ({ navigation, }) => SkillTab({ navigation, type: 'theory', }),
//     ],
//     [
//         R.equals('todo'),
//         () => Todo,
//     ],
// ])

const buildIcon = ({ focused, color, size, theme, icon, }) => {

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
                name={icon}
                size={iconSize}
                color={focused ? 'white' : 'gray'} />
        </LinearGradient>
    )
}

export default () => {
    const { state, dispatch, } = useContext(Context)

    const {
        theme,
        navigation: {
            home: {
                initialRouteName,
                tab: {
                    info,
                    interactive,
                    server,
                    theory,
                    other,
                },
            },
        },
    } = state

    return (
        <Tab.Navigator initialRouteName={initialRouteName}>

            <Tab.Screen name={info.name}
                options={({ route }) => ({
                    tabBarLabel: info.text,
                    tabBarIcon: ({ focused, color, size, }) => buildIcon({ focused, color, size, theme, icon: info.icon, }),
                })}
                component={Info} />

            <Tab.Screen name={interactive.name}
                options={({ route }) => ({
                    tabBarLabel: interactive.text,
                    tabBarIcon: ({ focused, color, size, }) => buildIcon({ focused, color, size, theme, icon: interactive.icon, }),
                })}
                component={Interactive} />


            <Tab.Screen name={theory.name}
                options={({ route }) => ({
                    tabBarLabel: theory.text,
                    tabBarIcon: ({ focused, color, size, }) => buildIcon({ focused, color, size, theme, icon: theory.icon, }),
                })}
                component={Theory} />


            <Tab.Screen name={server.name}
                options={({ route }) => ({
                    tabBarLabel: server.text,
                    tabBarIcon: ({ focused, color, size, }) => buildIcon({ focused, color, size, theme, icon: server.icon, }),
                })}
                component={Server} />

            <Tab.Screen name={other.name}
                options={({ route }) => ({
                    tabBarLabel: other.text,
                    tabBarIcon: ({ focused, color, size, }) => buildIcon({ focused, color, size, theme, icon: other.icon, }),
                })}
                component={Other} />





            {/* {
                R.compose(
                    R.values,
                    R.map(
                        v => (
                            <Tab.Screen key={v.name} name={v.name}
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
                    ),
                )(tab)
            } */}
        </Tab.Navigator>
    )
}

{/* <Tab.Screen key={v.name} name={v.name}
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
component={buildScreen(v.name)} /> */}
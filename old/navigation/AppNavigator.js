import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Image} from 'react-native';

import BackArrowIcon from '../../assets/oldImg/BackArrow.png';
import StoneHedge from '../../assets/oldImg/StoneHedge.png'
import HomeIcon from '../../assets/oldImg/Home.png'

import BackImage from '../components/buttons/BackImage';
import RegistrationOrLoginScreen from '../screens/StartScreens/RegistrationOrLoginScreen';
import WelcomeScreen from "../screens/StartScreens/WelcomeScreen";
import TabNavigator from "./TabNavigator";
import UpdateAppScreen from "../screens/StartScreens/UpdateAppScreen";
import SwitcherScreen from "../screens/StartScreens/SwitcherScreen";
import SignInScreen from "../screens/StartScreens/SignInScreen";
import GreetingScreen from "../screens/StartScreens/GreetingScreen";
import PinCodeScreen from "../screens/StartScreens/PinCodeScreen";
import HomeScreen from "../screens/HomeScreen";

const {tabBarLabelStyle, headerStyle, ...styles} = StyleSheet.create({
    headerStyle: {
        height: 56,
        backgroundColor: 'transparent',
        elevation: 0,
    },
});


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="UpdateAppScreen"
            screenOptions={{
                gestureEnabled: false,
                headerBackImage: () => (
                    <BackImage width={21.33} height={16} source={BackArrowIcon}/>
                ),
                headerBackTitle: false,
                headerBackTitleVisible: false,
                headerStyle,
                headerTitleAlign: 'center',
                headerTitleStyle: styles.appHeaderTitleStyle,
            }}>
            <Stack.Screen
                name={'TabNavigator'}
                component={TabNavigator}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'SignInScreen'}
                component={SignInScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'SwitcherScreen'}
                component={SwitcherScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'RegistrationOrLoginScreen'}
                component={RegistrationOrLoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'WelcomeScreen'}
                component={WelcomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'UpdateAppScreen'}
                component={UpdateAppScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'GreetingScreen'}
                component={GreetingScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'PinCodeScreen'}
                component={PinCodeScreen}
                options={({
                              route: {
                                  params: { header },
                              },
                          }) => ({
                    title: header === 'create' ? 'Создание PIN-кода' : '',
                    headerTitle:
                        header === 'enter'
                            ? () => (
                                <Image
                                    style={{ height: 30, width: 151 }}
                                    source={StoneHedge}
                                />
                            )
                            : undefined,
                    headerLeft: header === 'enter' ? () => null : undefined,
                })
            }
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: '',
                    tabBarLabel: 'Главная',
                    tabBarIcon: ({ color: tintColor }) => (
                        <Image style={[styles.homeIcon, { tintColor }]} source={HomeIcon} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

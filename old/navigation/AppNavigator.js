import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import BackArrowIcon from '../../assets/oldImg/BackArrow.png';
import HomeIcon from '../../assets/oldImg/Home.png';
import BackImage from '../components/buttons/BackImage';
import RegistrationOrLoginScreen from '../screens/RegistrationOrLoginScreen';
import SignInScreen from "../screens/SignInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const {tabBarLabelStyle, headerStyle, ...styles} = StyleSheet.create({
    tabBarLabelStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 11,
    },
    headerStyle: {
        height: 56,
        backgroundColor: 'transparent',
        elevation: 0,
    },
    tabHeaderTitleStyle: {
        color: '#111111',
        fontFamily: 'SFUIDisplay-Bold',
        fontSize: 18,
    },
    appHeaderTitleStyle: {
        color: '#111111',
        fontFamily: 'SFUIDisplay-Regular',
        fontSize: 14,
    },
    homeIcon: {
        width: 20.93,
        height: 18.21,
    },
    estateIcon: {
        width: 24.62,
        height: 13.17,
        transform: [{rotate: '-45deg'}],
    },
    appealsIcon: {
        width: 20.1,
        height: 19.7,
    },
    profileIcon: {
        width: 15.61,
        height: 19.37,
    },
    filter: {
        width: 20,
        height: 20,
        marginEnd: 20,
        tintColor: '#111111',
    },
    title: {
        marginLeft: 16,
        color: '#111111',
        fontFamily: 'SFUIDisplay-Bold',
        fontSize: 18,
    },

    headerContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    headerTitle: {
        fontFamily: 'SFUIDisplay-Regular',
        fontSize: 14,
    },
    headerDescription: {
        alignSelf: 'center',
        color: '#747E90',
        fontFamily: 'SFCompactDisplay-Light',
        fontSize: 12,
    },
});

const TabStack = createBottomTabNavigator();

function TabNavigator() {
    // const { bottom } = useSafeAreaInsets();
    return (
        <TabStack.Navigator
            initialRouteName="RegistrationOrLoginScreen"
            screenOptions={{
                gestureEnabled: false,
                headerBackTitle: false,
                headerBackTitleVisible: false,
                //headerRight: NotificationsButton,
                headerStyle,
                headerTitleStyle: styles.tabHeaderTitleStyle,
                tabBarActiveTintColor: '#101010',
                tabBarInactiveTintColor: '#747E90',
                tabBarLabelStyle,
                //tabBarStyle: { paddingBottom: bottom + 4 },
            }}>
            <TabStack.Screen
                name="RegistrationOrLoginScreen"
                component={RegistrationOrLoginScreen}
                options={{
                    title: '',
                    tabBarLabel: 'Главная',
                    tabBarIcon: ({color: tintColor}) => (
                        <Image style={[styles.homeIcon, {tintColor}]} source={HomeIcon}/>
                    ),
                }}
            />
            <TabStack.Screen
                name="RegistrationOrLoginScreen"
                component={RegistrationOrLoginScreen}
                options={{
                    title: '',
                    tabBarLabel: 'Главная',
                    tabBarIcon: ({color: tintColor}) => (
                        <Image style={[styles.homeIcon, {tintColor}]} source={HomeIcon}/>
                    ),
                }}
            />
        </TabStack.Navigator>
    );
}

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
            <Stack.Navigator
                initialRouteName="WelcomeScreen"
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
                    name={'RegistrationOrLoginScreen'}
                    component={RegistrationOrLoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={'SignInScreen'}
                    component={SignInScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={'WelcomeScreen'}
                    component={WelcomeScreen}
                    options={{headerShown: false}}
                />

            </Stack.Navigator>
    );
}

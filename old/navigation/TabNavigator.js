import { Image, StyleSheet, TouchableOpacity } from 'react-native'

import AppealsIcon from '../../assets/oldImg/Appeals.png'
import EstateIcon from '../../assets/oldImg/Estate.png'
import Filter from '../../assets/oldImg/Filter.png'
import HomeIcon from '../../assets/oldImg/Home.png'
import ProfileIcon from '../../assets/oldImg/Profile.png'

import AppealsScreen from '../screens/Appeals/AppealsScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RegistrationOrLoginScreen from '../screens/StartScreens/RegistrationOrLoginScreen'

import { Fonts } from '../utils/Fonts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TransitionPresets } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()

function TabNavigator() {
    const { tabBarLabelStyle, headerStyle, ...styles } = StyleSheet.create({
        tabBarLabelStyle: {
            fontFamily: Fonts.TextRegular,
            fontSize: 11,
        },
        headerStyle: {
            height: 56,
            backgroundColor: 'transparent',
            elevation: 0,
        },
        tabHeaderTitleStyle: {
            color: '#111111',
            fontFamily: Fonts.DisplayBold,
            fontSize: 18,
        },

        homeIcon: {
            width: 20.93,
            height: 18.21,
        },
        estateIcon: {
            width: 24.62,
            height: 13.17,
            transform: [{ rotate: '-45deg' }],
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
            fontFamily: Fonts.DisplayBold,
            fontSize: 18,
        },

        headerContainer: {
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        headerTitle: {
            fontFamily: Fonts.DisplayRegular,
            fontSize: 14,
        },
        headerDescription: {
            alignSelf: 'center',
            color: '#747E90',
            fontFamily: Fonts.DisplayCompactLight,
            fontSize: 12,
        },
    })

    const { bottom } = useSafeAreaInsets()
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
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
                tabBarStyle: { paddingBottom: bottom + 4 },
                ...TransitionPresets.ScaleFromCenterAndroid,
            }}>
            <Tab.Screen
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
            <Tab.Screen
                name="ResidenceScreen"
                component={RegistrationOrLoginScreen}
                options={{
                    title: 'Управление недвижимостью',
                    tabBarLabel: 'Недвижимость',
                    tabBarIcon: ({ color: tintColor }) => (
                        <Image style={[styles.estateIcon, { tintColor }]} source={EstateIcon} />
                    ),
                }}
            />
            <Tab.Screen
                name="AppealsScreen"
                component={AppealsScreen}
                options={({ route: { params }, navigation: { navigate } }) => ({
                    title: 'Обращения',
                    tabBarLabel: 'Обращения',
                    tabBarIcon: ({ color: tintColor }) => (
                        <Image style={[styles.appealsIcon, { tintColor }]} source={AppealsIcon} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                        // onPress={navigate('AppealsFilterScreen', {
                        //     filter: params?.filter || {},
                        // })}
                        >
                            <Image style={styles.filter} source={Filter} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Профиль',
                    tabBarLabel: 'Профиль',
                    tabBarIcon: ({ color: tintColor }) => (
                        <Image style={[styles.profileIcon, { tintColor }]} source={ProfileIcon} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

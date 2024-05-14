import React from 'react'
import { StyleSheet } from 'react-native'

import StoneHedge from '../../assets/oldImg/StoneHedge.png'

import AppealCreateScreen from '../screens/Appeals/AppealCreateScreen'
import EventAppealScreen from '../screens/Appeals/EventAppealScreen'
import MyEventChangeProfileAppealScreen from '../screens/Appeals/MyEventChangeProfileAppealScreen'
import MyEventManagementCompanyAppealScreen from '../screens/Appeals/MyEventManagementCompanyAppealScreen'
import MyEventsGuestPassOrderScreen from '../screens/Appeals/MyEventsGuestPassOrderScreen'
import MyEventsTaxiPassOrderScreen from '../screens/Appeals/MyEventsTaxiPassOrderScreen'
import CreateEventBuildingDeliveryPassScreen from '../screens/CreateEventBuildingDeliveryPassScreen'
import CreateEventDeliveryPassScreen from '../screens/CreateEventDeliveryPassScreen'
import CreateEventGuestPassOrderScreen from '../screens/CreateEventGuestPassOrderScreen'
import CreateEventLargeSizeDeliveryPassScreen from '../screens/CreateEventLargeSizeDeliveryPassScreen'
import CreateEventTaxiPassOrderScreen from '../screens/CreateEventTaxiPassOrderScreen'
import EditProfileScreen from '../screens/EditUserScreen/EditProfileScreen'
import PasswordChangeScreen from '../screens/EditUserScreen/PasswordChangeScreen'
import PasswordRecoveryScreen from '../screens/EditUserScreen/PasswordRecoveryScreen'
import FakeScreen from '../screens/FakeScreen/FakeScreen'
import MyResidenceScreen from '../screens/MyResidenceScreen'
import NewsScreen from '../screens/NewsScreen'
import PdfViewScreen from '../screens/PdfViewScreen'
import SelectPassOrderScreen from '../screens/SelectPassOrderScreen'
import GreetingScreen from '../screens/StartScreens/GreetingScreen'
import PinCodeScreen from '../screens/StartScreens/PinCodeScreen'
import RegistrationOrLoginScreen from '../screens/StartScreens/RegistrationOrLoginScreen'
import SignInScreen from '../screens/StartScreens/SignInScreen'
import SwitcherScreen from '../screens/StartScreens/SwitcherScreen'
import UpdateAppScreen from '../screens/StartScreens/UpdateAppScreen'
import WelcomeScreen from '../screens/StartScreens/WelcomeScreen'

import ItemSelectionScreen from '../components/custom/ItemSelectionScreen'

import TabNavigator from './TabNavigator'

import { Fonts } from '../utils/Fonts'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TransitionPresets } from '@react-navigation/stack'

const { tabBarLabelStyle, headerStyle, ...styles } = StyleSheet.create({
    headerStyle: {
        height: 56,
        elevation: 0,
    },
    appHeaderTitleStyle: {
        color: '#111111',
        fontFamily: Fonts.DisplayRegular,
        fontSize: 14,
    },
})

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="SwitcherScreen"
            screenOptions={{
                gestureEnabled: false,
                headerBackTitleVisible: false,
                headerStyle,
                headerTitleAlign: 'center',
                headerTitleStyle: styles.appHeaderTitleStyle,
                tabBarStyle: { paddingBottom: 10 + 4 },
                ...TransitionPresets.ScaleFromCenterAndroid,
            }}>
            <Stack.Screen
                name={'TabNavigator'}
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'UpdateAppScreen'}
                component={UpdateAppScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'WelcomeScreen'}
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'SwitcherScreen'}
                component={SwitcherScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'RegistrationOrLoginScreen'}
                component={RegistrationOrLoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'SignInScreen'}
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'GreetingScreen'}
                component={GreetingScreen}
                options={{ headerShown: false }}
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
                            ? () => <Image style={{ height: 30, width: 151 }} source={StoneHedge} />
                            : undefined,
                    headerLeft: header === 'enter' ? () => null : undefined,
                })}
            />

            <Stack.Screen
                name={'NewsScreen'}
                component={NewsScreen}
                options={({ route }) => ({
                    title: route?.params?.title,
                    headerTitleContainerStyle: {
                        width: '70%',
                        alignItems: 'center',
                    },
                })}
            />
            <Stack.Screen
                name={'PdfViewScreen'}
                component={PdfViewScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
                name={'EditProfileScreen'}
                component={EditProfileScreen}
                options={{ title: 'Изменить профиль' }}
            />
            <Stack.Screen
                name={'PasswordChangeScreen'}
                component={PasswordChangeScreen}
                options={{ title: 'Изменить пароль' }}
            />
            <Stack.Screen
                name={'PasswordRecoveryScreen'}
                component={PasswordRecoveryScreen}
                options={{ title: 'Восстановление пароля' }}
            />
            <Stack.Screen
                name={'AppealCreateScreen'}
                component={AppealCreateScreen}
                options={{ title: 'Создать обращение' }}
            />
            <Stack.Screen
                name={'EventAppealScreen'}
                component={EventAppealScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
                name={'SelectPassOrderScreen'}
                component={SelectPassOrderScreen}
                options={{ title: 'Заказать пропуск' }}
            />
            <Stack.Screen name={'FakeScreen'} component={FakeScreen} />
            <Stack.Screen
                name={'ItemSelectionScreen'}
                component={ItemSelectionScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
                name={'CreateEventDeliveryPassScreen'}
                component={CreateEventDeliveryPassScreen}
                options={{ title: 'Заказать пропуск для доставки' }}
            />

            <Stack.Screen
                name={'CreateEventTaxiPassOrderScreen'}
                component={CreateEventTaxiPassOrderScreen}
                options={{ title: 'Заказать пропуск для такси' }}
            />
            <Stack.Screen
                name={'CreateEventGuestPassOrderScreen'}
                component={CreateEventGuestPassOrderScreen}
                options={{ title: 'Заказать пропуск для гостя' }}
            />
            <Stack.Screen
                name={'CreateEventBuildingDeliveryPassScreen'}
                component={CreateEventBuildingDeliveryPassScreen}
                options={{ title: 'Заказать пропуск для стройматериалов' }}
            />
            <Stack.Screen
                name={'CreateEventLargeSizeDeliveryPassScreen'}
                component={CreateEventLargeSizeDeliveryPassScreen}
                options={{ title: 'Заказать пропуск для крупногабаритных грузов' }}
            />
            <Stack.Screen
                name={'MyEventsGuestPassOrderScreen'}
                component={MyEventsGuestPassOrderScreen}
                options={{ title: 'Мои события' }}
            />
            <Stack.Screen
                name={'MyEventsTaxiPassOrderScreen'}
                component={MyEventsTaxiPassOrderScreen}
                options={{ title: 'Мои события' }}
            />
            <Stack.Screen
                name={'MyEventChangeProfileAppealScreen'}
                component={MyEventChangeProfileAppealScreen}
                options={{ title: 'Мои события' }}
            />
            <Stack.Screen
                name={'MyEventManagementCompanyAppealScreen'}
                component={MyEventManagementCompanyAppealScreen}
                update
                options={{ title: 'Мои события' }}
            />
            <Stack.Screen
                name={'MyResidenceScreen'}
                component={MyResidenceScreen}
                options={({ route }) => ({
                    title: route.params ? route.params.data.projectName : '',
                })}
            />
        </Stack.Navigator>
    )
}

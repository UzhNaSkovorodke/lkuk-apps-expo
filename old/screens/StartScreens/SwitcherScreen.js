import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import Spinner from '../../components/custom/Spinner'
import reportError from '../../utils/ReportError'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import shared from 'stonehedge-shared'

const SwitcherScreen = ({ navigation, auth, fetchProfile }) => {
    useEffect(() => {
        const handleFocus = () => {
            bootstrapAsync()
        }
        navigation.addListener('focus', handleFocus)
        return () => {
            navigation.removeListener('focus', handleFocus)
        }
    }, [navigation])

    const bootstrapAsync = async () => {
        await SecureStore.getItemAsync('password')
            .then((isExisted) => (isExisted ? onCheckLoggedLaunch() : onCheckFirstLaunch()))
            .catch((error) => reportError(error, 'SwitcherScreen/bootstrapAsync'))
    }

    const onCheckLoggedLaunch = async () => {
        const login = await SecureStore.getItemAsync('login')
        const password = await SecureStore.getItemAsync('password')
        auth({ login, password })
            .then(() => fetchProfile())
            .then((res) => {
                const fio = (res.payload.data.profile && res.payload.data.profile.fio) || ''
                navigation.navigate('GreetingScreen', { fio })
            })
            .catch((error) => {
                reportError(error, 'SwitcherScreen/OnCheckLoggedLaunch/auth')
                navigation.navigate('RegistrationOrLoginScreen')
            })
    }
    const onCheckFirstLaunch = async () => {
        AsyncStorage.getItem('logged').then((isLogin) => {
            navigation.navigate(isLogin ? 'RegistrationOrLoginScreen' : 'WelcomeScreen')
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
        </View>
    )
}

export default connect(null, {
    auth: shared.actions.auth,
    authSuccess: shared.actions.authSuccess,
    fetchProfile: shared.actions.fetchProfile,
    fetchConfig: shared.actions.fetchConfig,
})(SwitcherScreen)

import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import DefaultButton from '../../components/buttons/DefaultButton'
import TextField from '../../components/custom/TextField'
import shared from 'stonehedge-shared'

const EditProfileScreen = ({ navigation, setSuccess, editProfile, route }) => {
    const [isProgress, setIsProgress] = useState(false)
    const [profileFio, setProfileFio] = useState(route.params.profileFio)
    const [profilePhoneNumber, setProfilePhoneNumber] = useState(route.params.phoneNumber)
    const [profileEmail, setProfileEmail] = useState(route.params.profileEmail)

    const sendChangesButtonPress = () => {
        setIsProgress(true)

        editProfile({
            fio: profileFio.replace('"', '\\"'),
            phone: profilePhoneNumber,
            email: profileEmail,
        })
            .then(() => {
                setSuccess([
                    {
                        message: 'Ваша заявка принята, следите за статусом в разделе «обращения»',
                    },
                ])
                navigation.goBack()
            })
            .finally(() => setIsProgress(false))
    }

    return (
        <View style={styles.mainWrapper}>
            <ScrollView scrollEventThrottle={16}>
                <View style={styles.wrapper}>
                    <TextField
                        label="ФИО"
                        value={profileFio}
                        keyboardType="default"
                        onChangeText={(text) => setProfileFio(text)}
                    />
                    <TextField
                        label="Телефон"
                        masked
                        keyboardType="phone-pad"
                        value={profilePhoneNumber}
                        onChangeText={(text) => setProfilePhoneNumber(text)}
                    />
                    <TextField
                        label="Электронная почта"
                        keyboardType="email-address"
                        autoCompleteType="email"
                        value={profileEmail}
                        onChangeText={(text) => setProfileEmail(text)}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <DefaultButton
                    isShowLoader={isProgress}
                    disabled={isProgress}
                    text="Отправить заявку на изменения"
                    onPress={sendChangesButtonPress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        paddingBottom: 120,
        paddingHorizontal: 16,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 32,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
})

export default connect(null, {
    setSuccess: shared.actions.success,
    editProfile: shared.actions.editProfileRequest,
})(EditProfileScreen)

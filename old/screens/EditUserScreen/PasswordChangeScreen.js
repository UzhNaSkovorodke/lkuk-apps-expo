import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'

import DefaultButton from '../../components/buttons/DefaultButton'
import TextField from '../../components/custom/TextField'
import TextFieldNew from '../../components/custom/TextFieldNew'
import commonStyles from '../../styles/CommonStyles'
import { Fonts } from '../../utils/Fonts'
import reportError from '../../utils/ReportError'
import shared from 'stonehedge-shared'

const PasswordChangeScreen = ({ changePassword, navigation, setError }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordCheck, setNewPasswordCheck] = useState('')
    //TODO сделать валидацию сделать loading и сообщение
    const onSendButtonPress = () => {
        if (newPassword !== newPasswordCheck) {
            setError([
                {
                    message: 'Пароли не совпадают. Проверьте правильность введенных данных.',
                },
            ])
            return
        }

        changePassword({
            password: oldPassword,
            newPassword,
        })
            .then(() => {
                navigation.goBack()
            })
            .catch((error) => {
                reportError(error, 'PasswordChange/onSendButtonPress/changePassword')
                setError({ message: 'Ошибка сервера' })
            })
    }

    return (
        <ScrollView scrollEventThrottle={16}>
            <View style={[commonStyles.container, { justifyContent: 'center' }]}>
                <TextField
                    label="Текущий пароль"
                    onChangeText={setOldPassword}
                    value={oldPassword}
                    secureTextEntry
                />

                <TextFieldNew placeholder="Текущий пароль" secureTextEntry />

                <TextField
                    label="Новый пароль"
                    onChangeText={setNewPassword}
                    value={newPassword}
                    secureTextEntry
                />

                <TextField
                    label="Повторите пароль"
                    onChangeText={setNewPasswordCheck}
                    value={newPasswordCheck}
                    secureTextEntry
                />

                <Text
                    style={{
                        fontSize: 13,
                        color: '#BBBBBB',
                        fontFamily: Fonts.TextRegular,
                        marginTop: 20,
                    }}>
                    {
                        'Требования к паролю:\nПароль должен быть длиной не менее 10 символов, содержать латинские символы верхнего и нижнего региста, а также знаки пунктуации'
                    }
                </Text>

                <DefaultButton
                    disabled={!oldPassword || !newPassword || !newPasswordCheck}
                    onPress={onSendButtonPress}
                    text="Применить"
                />
            </View>
        </ScrollView>
    )
}

export default connect(
    ({ auth, profile }) => ({
        auth,
        profile,
    }),
    {
        changePassword: shared.actions.changePassword,
        setError: shared.actions.error,
    }
)(PasswordChangeScreen)

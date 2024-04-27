import DefaultButton from '../../components/buttons/DefaultButton'
import TextField from '../../components/custom/TextField'
import commonStyles from '../../styles/CommonStyles'
import { Fonts } from '../../utils/Fonts'
import reportError from '../../utils/ReportError'
import shared from 'stonehedge-shared'

import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'

class PasswordChangeScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordCheck: '',
        }
    }

    onSendButtonPress = () => {
        const { newPassword, newPasswordCheck, oldPassword } = this.state
        const { changePassword, navigation, setError } = this.props
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

    render() {
        const { oldPassword, newPassword, newPasswordCheck } = this.state
        return (
            <ScrollView>
                <View style={[commonStyles.container, { justifyContent: 'center' }]}>
                    <TextField
                        label="Текущий пароль"
                        onChangeText={(oldPasswordText) => {
                            this.setState({ oldPassword: oldPasswordText })
                        }}
                        secureTextEntry
                    />

                    <TextField
                        label="Новый пароль"
                        onChangeText={(newPasswordText) => {
                            this.setState({ newPassword: newPasswordText })
                        }}
                        secureTextEntry
                    />

                    <TextField
                        label="Повторите пароль"
                        onChangeText={(newPasswordCheckText) => {
                            this.setState({ newPasswordCheck: newPasswordCheckText })
                        }}
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
                        onPress={this.onSendButtonPress}
                        text="Применить"
                    />
                </View>
            </ScrollView>
        )
    }
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

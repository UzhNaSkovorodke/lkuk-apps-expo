import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'

import DefaultButton from '../../components/buttons/DefaultButton'
import TextField from '../../components/custom/TextField'
import commonStyles from '../../styles/CommonStyles'
import reportError from '../../utils/ReportError'
import shared from 'stonehedge-shared'

class PasswordRecoveryScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
        }
    }

    validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    onGetNewPassButtonPress = () => {
        const { resetPassword, navigation, setSuccess } = this.props
        const { value } = this.state

        resetPassword({ [this.validateEmail(value) ? 'email' : 'login']: value })
            .then(() => {
                setSuccess([{ message: 'Новый пароль выслан на указанный в профиле e-mail' }])
                navigation.navigate('SignInScreen')
            })
            .catch((error) => {
                reportError(error, 'PasswordRecovery/onGetNewPassButtonPress/resetPassword')
                navigation.navigate('SignInScreen')
            })
    }

    render() {
        const { value } = this.state
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEventThrottle={16}>
                <View
                    style={[commonStyles.container, { justifyContent: 'center', marginTop: -60 }]}>
                    <TextField
                        label="Введите логин или email"
                        onChangeText={(changedValue) => {
                            this.setState({ value: changedValue })
                        }}
                    />
                    <DefaultButton
                        disabled={!value}
                        style={{ marginTop: 100 }}
                        text="Выслать новый пароль"
                        onPress={this.onGetNewPassButtonPress}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default connect(null, {
    resetPassword: shared.actions.resetPassword,
    setSuccess: shared.actions.success,
})(PasswordRecoveryScreen)

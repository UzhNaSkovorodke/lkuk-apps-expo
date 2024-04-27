import DefaultButton from '../../components/buttons/DefaultButton'
import TextField from '../../components/custom/TextField'
import shared from 'stonehedge-shared'

import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

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

class EditProfileScreen extends React.Component {
    constructor(props) {
        super(props)

        const {
            route: { params },
        } = this.props

        this.state = {
            isProgress: false,
            profileFio: params.profileFio,
            profilePhoneNumber: params.phoneNumber,
            profileEmail: params.profileEmail,
        }
    }

    sendChangesButtonPress = () => {
        const { navigation, setSuccess, editProfile } = this.props
        const { profileFio, profilePhoneNumber, profileEmail } = this.state

        this.setState({ isProgress: true })

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
            .finally(() => this.setState({ isProgress: false }))
    }

    render() {
        const { isProgress, profileEmail, profileFio, profilePhoneNumber } = this.state

        return (
            <View style={styles.mainWrapper}>
                <ScrollView>
                    <View style={styles.wrapper}>
                        <TextField
                            label="ФИО"
                            value={profileFio}
                            keyboardType="default"
                            onChangeText={(text) => this.setState({ profileFio: text })}
                        />
                        <TextField
                            label="Телефон"
                            masked
                            keyboardType="phone-pad"
                            value={profilePhoneNumber}
                            onChangeText={(text) => this.setState({ profilePhoneNumber: text })}
                        />
                        <TextField
                            label="Электронная почта"
                            keyboardType="email-address"
                            autoCompleteType="email"
                            value={profileEmail}
                            onChangeText={(text) => this.setState({ profileEmail: text })}
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <DefaultButton
                        isShowLoader={isProgress}
                        disabled={isProgress}
                        text="Отправить заявку на изменения"
                        onPress={this.sendChangesButtonPress}
                    />
                </View>
            </View>
        )
    }
}

export default connect(null, {
    setSuccess: shared.actions.success,
    editProfile: shared.actions.editProfileRequest,
})(EditProfileScreen)

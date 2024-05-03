import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import EditProfileImage from '../../assets/oldImg/EditProfileImage.png'

import DefaultButton from '../components/buttons/DefaultButton'
import CommentLabel from '../components/custom/CommentLabel'
import Spinner from '../components/custom/Spinner'
import SplitLine from '../components/custom/SplitLine'

import uri from '../constants/Uri'
import { Fonts } from '../utils/Fonts'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import shared from 'stonehedge-shared'

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    fioText: {
        marginTop: 3.5,
        marginLeft: 22,
        color: '#111111',
        fontSize: 16,
    },
    descriptionTextInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        color: '#111111',
        fontSize: 12,
    },
    profileExitButton: {
        marginTop: 13,
        fontFamily: Fonts.DisplayLight,
        fontSize: 14,
    },
    profileExitText: {
        color: '#747E90',
        fontFamily: Fonts.DisplayLight,
        fontSize: 14,
    },
    privacyPolicyText: {
        marginTop: 42,
        fontFamily: Fonts.DisplayLight,
        fontSize: 14,
    },
    rulesText: {
        marginTop: 13,
        fontFamily: Fonts.DisplayLight,
        fontSize: 14,
    },
    substitutionWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#747E90',
    },
    substitutionText: {
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
    },
    fioImagePlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#DEE0E5',
        borderRadius: 50,
    },
    placeholderLineColor: {
        backgroundColor: '#DEE0E5',
    },
    editProfileImageButton: {
        position: 'absolute',
        zIndex: 99,
        bottom: 6,
        left: 60,
    },
    editImageIcon: {
        width: 24,
        height: 24,
    },
    splitLine: {
        marginTop: 24,
        marginBottom: 24,
    },
    profileDataWrapper: {
        width: '100%',
        marginBottom: 12,
    },
    editProfileText: {
        marginTop: 5,
        marginLeft: 22,
        color: '#747E90',
        fontFamily: Fonts.DisplayLight,
        fontSize: 14,
    },
    placeholderLine1: {
        marginTop: 20,
        marginBottom: 15,
        backgroundColor: '#DEE0E5',
    },
    placeholderLine2: {
        marginBottom: 30,
        backgroundColor: '#DEE0E5',
    },
    placeholderLine3: {
        marginBottom: 15,
        backgroundColor: '#DEE0E5',
    },
    placeholderWrapper: {
        flex: 1,
        marginLeft: 22,
    },
    spinnerWrapper: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImageWrapper: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DEE0E5',
        borderRadius: 40,
    },
    noImageText: {
        color: '#747E90',
        fontFamily: Fonts.DisplayRegular,
        fontSize: 24,
    },
    text: {
        marginTop: 10,
        color: '#111111',
        fontFamily: Fonts.TextLight,
    },
    splitLine2: {
        marginTop: 6,
        marginBottom: 25,
    },
    splitLine3: {
        marginTop: 6,
        marginBottom: 0,
    },
})

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAvatarLoading: true,
            profileAvatarUri:
                'https://img.freepik.com/premium-psd/3d-cartoon-man-smiling-portrait-isolated-transparent-background-png-psd_888962-1569.jpg',
            // props.profile.avatar
            // ? `${uri.imagesProxyUrl}${props.profile.avatar}`
            // : '',
        }
    }

    onPasswordChangeButtonPress = () => {
        this.props.navigation.navigate('PasswordChangeScreen')
    }

    onLogOutButtonPress = () => {
        const { navigation, logoutProfile } = this.props
        SecureStore.deleteItemAsync('login')
        SecureStore.deleteItemAsync('password')
        SecureStore.deleteItemAsync('PinCode')
        logoutProfile()
        navigation.navigate('SignInScreen')
    }

    selectProfileImage = () => {
        const { setError, editProfile } = this.props
        const { profileAvatarUri } = this.state
        const options = {
            title: 'Выберать фото',
            cancelButtonTitle: 'Отмена',
            takePhotoButtonTitle: 'Сделать снимок',
            chooseFromLibraryButtonTitle: 'Загрузить из галереи',
            cameraType: 'front',
            customButtons: profileAvatarUri ? [{ name: 'deleteImage', title: 'Удалить' }] : [],
            permissionDenied: {
                title: 'Доступ запрещен',
                text: 'Чтобы иметь возможность делать снимки с помощью камеры и выбирать изображения из вашей библиотеки дайте доступ.',
                reTryTitle: 'Дать доступ',
                okTitle: 'Пропустить',
            },
            storageOptions: {
                path: 'images',
            },
        }
        ImagePicker.showImagePicker(options, (res) => {
            if (res.error && res.error === 'Photo library permissions not granted') {
                setError([
                    {
                        message:
                            'Доступ к фото запрещен. Дать доступ можно в настройках приложения.',
                    },
                ])
                return
            }
            this.setState({
                isAvatarLoading: true,
                profileAvatarUri: undefined,
            })
            editProfile({
                fileContent: res.data || null,
                fileName:
                    res.customButton && res.customButton === 'deleteImage' ? null : res.fileName,
            }).then(() => {
                this.setState({
                    profileAvatarUri: res.uri,
                    isAvatarLoading: false,
                })
            })
        })
    }

    renderImage = () => {
        const { profile } = this.props
        const { profileAvatarUri, isAvatarLoading } = this.state
        const [lastName, firstName] = ((profile && profile.fio) || '')
            .replace(/[^a-zA-Zа-яА-Я\s]/g, '')
            .split(' ')

        if (profileAvatarUri === '') {
            return (
                <View>
                    <View style={styles.noImageWrapper}>
                        <Text style={styles.noImageText}>
                            {lastName ? lastName[0] : ''}
                            {firstName ? firstName[0] : ''}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editProfileImageButton}
                        onPress={this.selectProfileImage}>
                        <Image style={styles.editImageIcon} source={EditProfileImage} />
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View>
                <Image
                    style={styles.profileImage}
                    resizeMode="cover"
                    source={{ uri: profileAvatarUri }}
                    onLoadEnd={() => this.setState({ isAvatarLoading: false })}
                    onLoadStart={() => this.setState({ isAvatarLoading: true })}
                />
                {isAvatarLoading ? (
                    <View style={[styles.profileImage, styles.spinnerWrapper]}>
                        <Spinner />
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.editProfileImageButton}
                        onPress={this.selectProfileImage}>
                        <Image style={styles.editImageIcon} source={EditProfileImage} />
                    </TouchableOpacity>
                )}
            </View>
        )
    }

    renderProfileFIO = () => {
        const { navigation, profile } = this.props
        const [lastName, firstName, patronymic] = ((profile && profile.fio) || '').split(' ')
        return (
            <View>
                <Text style={styles.fioText}>
                    {lastName ? `${lastName}` : ''}
                    {firstName ? `\n${firstName}` : ''}
                    {patronymic ? `\n${patronymic}` : ''}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('EditProfileScreen', {
                            profileFio: profile.fio,
                            phoneNumber: profile.phoneNumber,
                            profileEmail: profile.email,
                        })
                    }}>
                    <Text style={styles.editProfileText}>Редактировать профиль</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderContacts() {
        const { profile } = this.props
        return (
            <View style={styles.profileDataWrapper}>
                <CommentLabel text="Телефон" />
                <Text style={styles.text}>{profile.phoneNumber || ''}</Text>
                <SplitLine style={styles.splitLine2} />
                <CommentLabel text="Электронная почта" />
                <Text style={styles.text}>{profile.email || ''}</Text>
                <SplitLine style={styles.splitLine3} />
            </View>
        )
    }

    render() {
        const { navigation } = this.props
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        {this.renderImage()}
                        {this.renderProfileFIO()}
                    </View>
                    <SplitLine style={styles.splitLine} />
                    {this.renderContacts()}
                    <DefaultButton
                        onPress={this.onPasswordChangeButtonPress}
                        text="Изменить пароль"
                    />
                    <TouchableOpacity
                        style={styles.privacyPolicyText}
                        onPress={() =>
                            navigation.navigate('PdfViewScreen', {
                                fileLink: uri.privacyPolicyFileLink,
                                title: 'Политика Конфиденциальности',
                            })
                        }>
                        <Text style={styles.profileExitText}>Политика конфиденциальности</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rulesText}
                        onPress={() =>
                            navigation.navigate('PdfViewScreen', {
                                fileLink: uri.rulesFileLink,
                                title: 'Правила участия в программе',
                            })
                        }>
                        <Text style={styles.profileExitText}>Правила участия в программе</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.profileExitButton}
                        onPress={this.onLogOutButtonPress}>
                        <Text style={styles.profileExitText}>Выйти из профиля</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default connect(({ profile }) => ({ profile }), {
    logoutProfile: shared.actions.logout,
    editProfile: shared.actions.editProfile,
    setError: shared.actions.error,
})(ProfileScreen)

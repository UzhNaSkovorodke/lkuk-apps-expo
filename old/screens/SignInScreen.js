import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import shared from 'stonehedge-shared';
import { actions, store } from 'stonehedge-shared';

import StoneHedge from '../../assets/oldImg/StoneHedge.png';
import { Fonts } from '../utils/Fonts';
//import reportError from '../utils/ReportError';
import DefaultButton from "../components/buttons/DefaultButton";
import CircleCheckBox from "../components/custom/CircleCheckBox";
import ModalPrivacyPolicy from "../components/custom/ModalPrivacyPolicy";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 24,
  },
  textForgot: {
    alignSelf: 'flex-end',
    marginRight: 10,
    color: '#747E90',
    fontFamily: Fonts.DisplayLight,
    fontSize: 12,
  },
  login: {
    height: 60,
    paddingTop: 25,
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
    color: '#747E90',
    fontStyle: 'italic',
  },
  password: {
    height: 60,
    paddingTop: 25,
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
    color: '#747E90',
    fontStyle: 'italic',
  },
  imageLabel: {
    width: '100%',
    resizeMode: 'contain',
    tintColor: '#222221',
  },
  buttonPasswordForgot: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxLabel: {
    justifyContent: 'center',
    color: '#747E90',
    fontFamily: Fonts.DisplayLight,
    fontSize: 12,
  },
  agreementCheckBoxText: {
    color: '#747E90',
    fontFamily: Fonts.DisplayLight,
    fontSize: 11,
  },
  agreementCheckBoxLink: {
    textDecorationLine: 'underline',
  },
  agreementCheckBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
  },
  additionalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textButton: {
    fontFamily: Fonts.DisplayCompactRegular,
    fontSize: 16,
  },
  signInButton: {
    marginTop: 80,
    marginBottom: 0,
  },
});

class SignInScreen extends React.Component {
  static timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // this.props.setError([{ message: 'Извините, во время работы системы произошла ошибка. Попробуйте позже.' }]);
        reject(new Error('timeout'));
      }, ms);
      promise.then(resolve, reject);
    });
  }

  constructor(props) {
    super(props);

    this.modalPrivacyPolicyRef = React.createRef();
    this.state = {
      login: __DEV__ ? 'extra1' : '',
      password: __DEV__ ? 'extra1extra1' : '',
      isProgress: false,
      isRememberMe: false,
    };
  }

  openPolicyModal = async () => {
    this.modalPrivacyPolicyRef.current.open();

    // Выпилен permission для яндекс метрики
    // if (Platform.OS === 'ios') {
    //   return true;
    // }
    // try {
    //   await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );
    // } catch (err) {
    //   return false;
    // }
    // return true;
  };

  handleCheckBox = () => {
    const { isRememberMe } = this.state;
    this.setState({ isRememberMe: !isRememberMe });
  };

  signIn = () => {
    const { login, password } = this.state;
    const { auth } = this.props;

    this.setState({ isProgress: true });

    SignInScreen.timeout(8000, auth({ login, password }))
      .then(() => {
        RNSecureStorage.get('login')
          .then(() => this.signInSuccess())
          .catch(() => this.openPolicyModal());
      })
      .catch(error => {})
      .finally(() => this.setState({ isProgress: false }));
  };

  signInSuccess = () => {
    const { login, password, isRememberMe } = this.state;
    const { fetchProfile, navigation } = this.props;

    fetchProfile()
      .then(res => {
        // RNSecureStorage.set('login', login, {
        //   accessible: ACCESSIBLE.WHEN_UNLOCKED,
        // });

        if (isRememberMe) {
          // RNSecureStorage.set('password', password, {
          //   accessible: ACCESSIBLE.WHEN_UNLOCKED,
          // });
        }

        const fio =
          (res.payload.data.profile && res.payload.data.profile.fio) || '';

        navigation.navigate(isRememberMe ? 'PinCodeScreen' : 'GreetingScreen', {
          fio,
        });
      })
      .catch(error => {}
    //reportError(error, 'SingIn/signInSuccess/fetchProfile'
    );
  };

  render() {
    const { login, password, isRememberMe, isProgress } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ModalPrivacyPolicy
          modalRef={this.modalPrivacyPolicyRef}
          onAcceptClicked={this.signInSuccess}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image style={styles.imageLabel} source={StoneHedge} />
            <TextInput
              style={styles.login}
              placeholder="Введите логин"
              autoCapitalize="none"
              selectionColor="#747E90"
              onChangeText={l => this.setState({ login: l })}
              value={login}
            />
            <TextInput
              style={styles.password}
              placeholder="Введите пароль"
              autoCapitalize="none"
              selectionColor="#747E90"
              secureTextEntry
              onChangeText={p => this.setState({ password: p })}
              value={password}
            />
            <View style={styles.additionalWrapper}>
              <CircleCheckBox
                styleLabel={styles.checkBoxLabel}
                checked={isRememberMe}
                onToggle={() => this.handleCheckBox()}
                labelPosition="right"
                label="Запомнить меня"
              />
              <TouchableOpacity
                style={styles.buttonPasswordForgot}
                onPress={() => navigation.navigate('PasswordRecoveryScreen')}>
                <Text style={styles.textForgot}>Забыли пароль?</Text>
              </TouchableOpacity>
            </View>
            <DefaultButton
              style={styles.signInButton}
              textStyle={styles.textButton}
              onPress={this.signIn}
              isShowLoader={isProgress}
              text="Войти"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {
  auth: shared.actions.auth,
  fetchProfile: shared.actions.fetchProfile,
  setError: shared.actions.error,
})(SignInScreen);

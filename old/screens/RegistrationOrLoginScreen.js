import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Stnhdg from '../../assets/oldImg/Stnhdg.png';
import DefaultButton from '../components/buttons/DefaultButton';
import { Fonts } from '../utils/Fonts';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F1EFF0',
  },
  container: {
    justifyContent: 'center',
    marginBottom: 36,
    marginHorizontal: 20,
  },
  textButton: {
    fontFamily: Fonts.DisplayCompactRegular,
    fontSize: 16,
  },
  text: {
    color: '#747E90',
    fontFamily: Fonts.DisplayLight,
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
  },
});

class RegistrationOrLoginScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const { height } = Dimensions.get('window');
    return (
      <View style={styles.wrapper}>
        <View style={{ flex: 1 }}>
          <Image
            style={{
              marginTop: height / 22,
              marginLeft: 24,
              width: height / 0.932657,
              height: height / 1.4659,
              position: 'absolute',
            }}
            source={Stnhdg}
          />
        </View>
        <View style={styles.container}>
          <DefaultButton
            style={{ marginBottom: height > 600 ? 27 : 12 }}
            textStyle={styles.textButton}
            onPress={async () => {
              try {
                const { navigation, auth, fetchProfile } = this.props;
                //const login = await RNSecureStorage.get('login');
                //const password = await RNSecureStorage.get('password');

                if (login !== undefined && password !== undefined) {
                  auth({ login, password })
                    .then(() => fetchProfile())
                    .then(res => {
                      const fio =
                        (res.payload.data.profile &&
                          res.payload.data.profile.fio) ||
                        '';
                      navigation.navigate('PinCodeScreen', { fio });
                    })
                    .catch(navigation.navigate('SignInScreen'));
                } else {
                  navigation.navigate('SignInScreen');
                }
              } catch {
                navigation.navigate('SignInScreen');
              }
            }}
            text="Войти"
          />
          <Text style={styles.text}>
            Для регистрации в Личном кабинете, обратитесь в управляющую компанию
          </Text>
        </View>
      </View>
    );
  }
}

export default RegistrationOrLoginScreen;

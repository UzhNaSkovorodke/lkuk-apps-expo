import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import RegistrationOrLoginScreen from "./old/screens/RegistrationOrLoginScreen";
import {useFonts} from "expo-font";

const Tab = createBottomTabNavigator();

export default function App() {
    const [fontsLoaded, fontError] =  useFonts({
            'SFUIDisplay-Light': require('./assets/fonts/SFUIDisplay-Light.ttf'),
            'SFUIDisplay-Regular': require('./assets/fonts/SFUIDisplay-Regular.ttf'),
            'SFUIDisplay-Bold': require('./assets/fonts/SFUIDisplay-Bold.ttf'),
            'SFProDisplay-SemiBold': require('./assets/fonts/SFProText-SemiBold.ttf'),
            'SFCompactDisplay-SemiBold': require('./assets/fonts/SFCompactDisplay-SemiBold.ttf'),
            'SFCompactDisplay-Bold': require('./assets/fonts/SFCompactDisplay-Bold.ttf'),
            'SFCompactDisplay-Light': require('./assets/fonts/SFCompactDisplay-Light.ttf'),
            'SFCompactDisplay-Regular': require('./assets/fonts/SFCompactDisplay-Regular.ttf'),
            'PFEncoreSansPro-Light': require('./assets/fonts/PFEncoreSansPro-Light.ttf'),
            'SFUIText-Regular': require('./assets/fonts/SFUIText-Regular.ttf'),
            'SFUIText-Bold': require('./assets/fonts/SFUIText-Bold.ttf'),
            'SFUIText-Light': require('./assets/fonts/SFUIText-Light.ttf'),
            'SFCompactText-Light': require('./assets/fonts/SFCompactText-Light.ttf'),
            'SFProText-SemiBold': require('./assets/fonts/SFProText-SemiBold.ttf'),
        }
    );

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <NavigationContainer>
           <RegistrationOrLoginScreen />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

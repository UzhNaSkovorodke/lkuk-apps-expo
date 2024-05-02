import React, { Component } from 'react'
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import Image1 from '../../../assets/oldImg/WelcomeScreen/FirstWelcomeDefault.png'
import FirstWelcomeIphoneX from '../../../assets/oldImg/WelcomeScreen/FirstWelcomeIphoneX.png'
import Image4 from '../../../assets/oldImg/WelcomeScreen/ForthWelcomeDefault.png'
import ForthWelcomeIphoneX from '../../../assets/oldImg/WelcomeScreen/ForthWelcomeIphoneX.png'
import Image2 from '../../../assets/oldImg/WelcomeScreen/SecondWelcomeDefault.png'
import SecondWelcomeIphoneX from '../../../assets/oldImg/WelcomeScreen/SecondWelcomeIphoneX.png'
import Image3 from '../../../assets/oldImg/WelcomeScreen/ThirdWelcomeDefault.png'
import ThirdWelcomeIphoneX from '../../../assets/oldImg/WelcomeScreen/ThirdWelcomeIphoneX.png'
import reportError from '../../utils/ReportError'
import Timer from '../../utils/Timer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProgressBarAnimated from 'react-native-progress-bar-animated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window')
const { height: screenHeight } = Dimensions.get('screen')
const isLongScreen = height / width > 2 // для Iphone X, huawei p20 ..

const styles = {
    startButton: {
        borderRadius: 26,
        backgroundColor: '#747E90',
        marginBottom: (((height / 100) * 95) / 100) * 16,
        marginRight: width / 18, // динамический отступ от правого края
        width: 103,
        height: 40,
        justifyContent: 'center',
    },
    textStartButton: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#E6E6E6',
    },
    slide: {
        flex: 1,
        marginTop: -80,
        justifyContent: 'flex-start',
        backgroundColor: '#E6E6E6',
    },
    wrapperImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: '95%',
        marginLeft: 'auto',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    dotsContainer: {
        marginHorizontal: 5,
        backgroundColor: '#BBBBBB',
        borderRadius: 4,
    },
}

export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            currentPage: 0,
        }
    }

    componentDidMount() {
        this.timer = new Timer(this.increase, 500) // задержка для прогрузки картинок
    }

    onButtonClicked = async () => {
        const { navigation } = this.props
        navigation.navigate('RegistrationOrLoginScreen')
        await AsyncStorage.setItem('logged', '1').catch((error) =>
            reportError(error, 'WelcomeScreen/onButtonClicked/setItem')
        )
    }

    increase = () => {
        const { progress, currentPage } = this.state
        if (progress === 100) {
            if (currentPage < 3) {
                this.swiperRef.scrollBy(1)
            }
        } else {
            this.setState({ progress: progress + 2.5 }, () => {
                this.timer = new Timer(() => this.increase(), 75)
            })
        }
    }

    onStopCorousel = () => {
        this.timer.pause()
    }

    onResumeCorousel = () => {
        this.timer.resume()
    }

    render() {
        const { progress } = this.state

        return (
            <SafeAreaView style={styles.container}>
                <Swiper
                    ref={(ref) => {
                        this.swiperRef = ref
                    }}
                    onIndexChanged={(currentPage) => {
                        this.timer.pause()
                        this.setState({ progress: 0, currentPage }, () => {
                            this.increase()
                        })
                    }}
                    onTouchStart={this.onStopCorousel}
                    onTouchEnd={this.onResumeCorousel}
                    height={height}
                    loop={false}
                    paginationStyle={{
                        bottom: height * 0.95,
                    }}
                    containerStyle={{
                        justifyContent: 'flex-start',
                        textAlign: 'flex-start',
                    }}
                    dot={
                        <View style={styles.dotsContainer}>
                            <ProgressBarAnimated
                                barAnimationDuration={1}
                                borderWidth={0}
                                height={3}
                                width={width / 5}
                                value={0}
                                backgroundColor="#FFFFFF"
                            />
                        </View>
                    }
                    activeDot={
                        <View style={styles.dotsContainer}>
                            <ProgressBarAnimated
                                borderWidth={0}
                                backgroundColor="#FFFFFF"
                                height={3}
                                width={width / 5}
                                barAnimationDuration={125}
                                value={progress}
                            />
                        </View>
                    }>
                    <View style={styles.slide}>
                        <TouchableOpacity
                            style={styles.wrapperImg}
                            activeOpacity={1}
                            delayPressIn={0}>
                            <ImageBackground
                                style={styles.image}
                                source={isLongScreen ? FirstWelcomeIphoneX : Image1}>
                                <TouchableOpacity
                                    style={styles.startButton}
                                    onPress={this.onButtonClicked}>
                                    <Text style={styles.textStartButton}>Начать</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.slide}>
                        <TouchableOpacity
                            activeOpacity={1}
                            delayPressIn={0}
                            style={styles.wrapperImg}
                            delayPressOut={0}>
                            <ImageBackground
                                style={styles.image}
                                source={isLongScreen ? SecondWelcomeIphoneX : Image2}>
                                <TouchableOpacity
                                    style={styles.startButton}
                                    onPress={this.onButtonClicked}>
                                    <Text style={styles.textStartButton}>Начать</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.slide}>
                        <TouchableOpacity
                            activeOpacity={1}
                            delayPressIn={0}
                            style={styles.wrapperImg}
                            delayPressOut={0}>
                            <ImageBackground
                                style={styles.image}
                                source={isLongScreen ? ThirdWelcomeIphoneX : Image3}>
                                <TouchableOpacity
                                    style={styles.startButton}
                                    onPress={this.onButtonClicked}>
                                    <Text style={styles.textStartButton}>Начать</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.slide}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.wrapperImg}
                            delayPressIn={0}
                            delayPressOut={0}>
                            <ImageBackground
                                style={styles.image}
                                source={isLongScreen ? ForthWelcomeIphoneX : Image4}>
                                <TouchableOpacity
                                    style={styles.startButton}
                                    onPress={this.onButtonClicked}>
                                    <Text style={styles.textStartButton}>Начать</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </SafeAreaView>
        )
    }
}

import { APPEAL_SELECTION_TYPES, APPEAL_TYPES } from '../constants/AppealTypes'
import commonStyles from '../styles/CommonStyles'
import { Fonts } from '../utils/Fonts'
import reportError from '../utils/ReportError'
import { filterAvailableProjectAppealTypes } from '../utils/Utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import shared from 'stonehedge-shared'

import React from 'react'
import {
    AppState,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'
import { connect } from 'react-redux'

import BuildingAppealIcon from '../../assets/oldImg/BuildingDeveloper.png'
import GuestsIcon from '../../assets/oldImg/Guests.png'
import MakeAppealIcon from '../../assets/oldImg/MakeAppeal.png'
import NewsIcon from '../../assets/oldImg/News.jpg'
import TaxiIcon from '../../assets/oldImg/Taxi.png'

import ButtonWithIcon from '../components/buttons/ButtonWithIcon'
import SplitLine from '../components/custom/SplitLine'

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F7F7F9',
    },
    flatlist: {
        width: '100%',
    },
    container: {
        marginTop: 16,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
    },
    wrapper: {
        width: '100%',
        paddingHorizontal: 6,
    },
    newsImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    containerText: {
        marginTop: 5,
        marginBottom: 26,
        color: '#111111',
        fontFamily: Fonts.DisplayBold,
        fontSize: 18,
        marginHorizontal: 6,
    },
    newsText: {
        color: '#111111',
        fontFamily: Fonts.DisplayCompactSemiBold,
        fontSize: 14,
    },
    oneNews: {
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        marginHorizontal: 6,
        shadowColor: '#B7B7B7',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 0 },
    },
    guestsIcon: {
        width: 28,
        height: 17,
        marginHorizontal: 16,
    },
    taxiIcon: {
        width: 40,
        height: 16,
        marginHorizontal: 10,
    },
    makeAppealIcon: {
        width: 26,
        height: 25,
        marginHorizontal: 18,
    },
    buildingAppealIcon: {
        width: 25,
        height: 18,
        marginHorizontal: 18,
    },
    splitLine: {
        width: Dimensions.get('screen').width - 32,
        marginLeft: 6,
    },
    wrapperPadding: {
        padding: 16,
    },
    oneNewsButton: {
        flex: 1,
        borderRadius: 3,
    },
})

class HomeScreen extends React.Component {
    hasDevAppeals =
        filterAvailableProjectAppealTypes({
            projects: this.props.projects,
            appealTypesArray: this.props.appealTypesArray,
            appealType: APPEAL_TYPES.DEV,
        })?.length > 0

    hasUKAppeals =
        filterAvailableProjectAppealTypes({
            projects: this.props.projects,
            appealTypesArray: this.props.appealTypesArray,
            appealType: APPEAL_TYPES.UK,
        })?.length > 0

    constructor(props) {
        super(props)
        this.previewState = []
        this._unsubscribe = () => {}
        this.state = {
            news: [],
            needUpdate: false,
            isEndLoadingNews: false,
            allNewsIsLoaded: false,
        }

        this.getNews()
    }

    async componentDidMount() {
        // Notifications.registerRemoteNotifications();
        await this.checkPermission()
        await this.createNotificationListeners()
        AppState.addEventListener('change', this.handleAppStateChange)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isEndLoadingNews: false })
            this.getNews(true)
        })
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            this.setState({ isEndLoadingNews: false })
            this.getNews(true)
            this.props.getNotifications()
        }
    }

    requestPermission = async () => {
        try {
            //await messaging().requestPermission()
            await this.getToken()
        } catch (error) {
            reportError(error, 'Home/requestPermission/Notifications')
            // User has rejected permissions
        }
    }

    checkPermission = async () => {
        const enabled = false
        //await messaging().hasPermission()

        if (enabled) {
            await this.getToken()
        } else {
            await this.requestPermission()
        }
    }

    getToken = async () => {
        const { editProfileFcmToken } = this.props

        // wasTokenResubscription -- костылёк, проверяем флаг, была ли совершена повторная подписка на пуш-уведомления
        let wasNotificationResubscription = false

        try {
            wasNotificationResubscription = await AsyncStorage.getItem(
                'wasNotificationResubscription'
            )

            // const fcmToken = await messaging().getToken();
            console.warn({ fcmToken })
            if (fcmToken) {
                await editProfileFcmToken({ enablePush: true, fcmToken })
                if (!wasNotificationResubscription) {
                    await AsyncStorage.setItem('wasNotificationResubscription', 'true')
                }
            }
        } catch (error) {
            // reportError(error, 'Home/getToken');
        }
    }

    createNotificationListeners = async () => {
        // Вызывается когда приложение открыто
        // Notifications.events().registerNotificationReceivedForeground(
        //    (notification, completion) => {
        //        this.props.incrementNotification();
        //         completion({alert: true, sound: true, badge: false});
        //     },
        //   );
        // Вызывается когда телефон неактивен
        //   Notifications.events().registerNotificationOpened(
        //      (notification, completion, action) => {
        //          this.handleNotification(notification.payload);
        //          completion();
        //       },
        //  );
        // Вызывается когда приложение неактивено
        //   Notifications.getInitialNotification()
        //     .then(
        //        notificationOpen =>
        //            notificationOpen && this.handleNotification(notificationOpen.payload),
        //    )
        //    .catch(error => {}
        // reportError(
        //     error,
        //     'Home/createNotificationListeners/getInitialNotification',
        // ),
        //   );
    }

    handleNotification = (notification) => {
        const { navigation, updateNotification, getNotifications } = this.props
        getNotifications()
        const response = JSON.parse(notification.data).notification
        if (response.event !== undefined) {
            const { eventTypeId, eventId } = response.event
            updateNotification({ notificationId: response.notificationId })
            this.checkEvent({ eventTypeId, eventId, navigation })
        } else if (response.bill !== undefined) {
            const { billId, description } = response.bill
            updateNotification({ notificationId: response.notificationId })
            this.checkBill({ billId, description, navigation })
        } else if (response.news !== undefined) {
            const { newsId, title } = response.news
            updateNotification({ notificationId: response.notificationId })
            navigation.navigate('NewsScreen', { title, id: newsId })
        } else {
            reportError(
                'Ошибка сервера или такой push notification не поддерживается',
                'Home/requestPermission/Notifications'
            )
        }
    }

    checkBill = ({ billId, description, navigation }) => {
        const { fetchBill } = this.props
        fetchBill({ billId }).then((response) => {
            const { fileLink } = response.payload.data.getBill
            navigation.navigate('PdfViewScreen', {
                fileLink,
                title: `${description}`,
            })
        })
    }

    checkEvent = ({ eventTypeId, eventId, navigation }) => {
        switch (eventTypeId) {
            case 1:
                //navigation.navigate('MyEventsGuestPassOrderScreen', {eventId});
                break
            case 2:
                //navigation.navigate('MyEventsTaxiPassOrderScreen', {eventId});
                break
            case 3:
                // navigation.navigate('MyEventManagementCompanyAppealScreen', {
                //     eventId,
                // });
                break

            default:
                break
        }
    }

    getNews = (isUpdateNews = false, count = 10) => {
        const { setWarning, fetchAllNews } = this.props
        const { news } = this.state
        const endLoadingNews = () => {
            this.setState({ isEndLoadingNews: true })
            if (this.state.news.length === 0) {
                setWarning([{ message: 'Список новостей пуст.' }])
            }
        }

        fetchAllNews({ page: (count / 10).toFixed(0) - 1, size: 10 }) // page = 1, size = 10
            .then((resp) => resp.payload.data.getNews)
            .then((data) => {
                if (
                    Number(data.pagingOptions.pageTotal) === Number((count / 10).toFixed(0)) &&
                    (data.news.length > 0 || news.length > 0)
                ) {
                    this.setState({ allNewsIsLoaded: true })
                }

                if (isUpdateNews) {
                    this.setState({ news: data.news }, () => endLoadingNews())
                } else {
                    this.setState({ news: news.concat(data.news) }, () => endLoadingNews())
                }
            })
    }

    loadAdditionallyNews = () => {
        const { news, needUpdate, allNewsIsLoaded } = this.state
        const { setSuccess } = this.props

        if (allNewsIsLoaded) {
            setSuccess([{ message: 'Мы загрузили все новости.' }])
            this.setState({ allNewsIsLoaded: false })
        }

        if (needUpdate || news.length % 10 !== 0) {
            return
        }

        this.setState({ needUpdate: true })
        this.getNews(false, news.length + 10)
    }

    onPaymentsButtonPress = () => this.props.navigation.navigate('PaymentsScreen')

    onPassOrderButtonPress = () => this.props.navigation.navigate('SelectPassOrderScreen')

    onContactManageCompanyButtonPress = (mode) => () =>
        this.props.navigation.navigate('AppealSelectionScreen', { mode })

    keyExtractor = (item) => item.newsId.toString()

    renderNews = () => {
        const { news, needUpdate } = this.state
        return (
            // <>
            //     {news.map((elem, index) => {
            //
            //     })}
            // </>
            <View
                style={styles.flatlist}
                keyExtractor={this.keyExtractor}
                extraData={needUpdate}
                data={news}
                renderItem={this.renderOneNews}
            />
        )
    }

    renderOneNews = (news, index) => {
        const { navigation } = this.props
        return (
            <View style={styles.oneNews}>
                <TouchableHighlight
                    key={index}
                    style={styles.oneNewsButton}
                    underlayColor="#E8E8E8"
                    onPress={() =>
                        navigation.navigate('NewsScreen', {
                            title: news.item.title,
                            id: news.item.newsId,
                        })
                    }>
                    <>
                        <Image
                            style={styles.newsImage}
                            source={
                                news.item.previewPicture
                                    ? {
                                          uri: `https://admin-lk.stonehedge.ru${news.item.previewPicture}`,
                                      }
                                    : NewsIcon
                            }
                        />
                        <View style={styles.wrapperPadding}>
                            <Text style={styles.newsText}>{news.item.title}</Text>
                        </View>
                    </>
                </TouchableHighlight>
            </View>
        )
    }

    renderPlaceholderNews = () => (
        <View style={styles.wrapper}>
            <View style={styles.placeholder}></View>
        </View>
    )

    isNearBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 100

    render() {
        const { isEndLoadingNews } = this.state
        return (
            <ScrollView
                style={styles.scrollView}
                onScroll={({ nativeEvent }) => {
                    if (this.isNearBottom(nativeEvent)) {
                        this.loadAdditionallyNews()
                    } else {
                        this.setState({ needUpdate: false })
                    }
                }}>
                <View style={[commonStyles.container, styles.container]}>
                    <View style={styles.wrapper}>
                        <ButtonWithIcon
                            label="Счета"
                            description="Нажмите, чтобы посмотреть и оплатить"
                            source={GuestsIcon}
                            imageStyle={styles.guestsIcon}
                            onPress={this.onPaymentsButtonPress}
                        />
                        <ButtonWithIcon
                            label="Заказать пропуск"
                            description="Для гостя, такси или доставки"
                            source={TaxiIcon}
                            imageStyle={styles.taxiIcon}
                            onPress={this.onPassOrderButtonPress}
                        />
                        {this.hasUKAppeals && (
                            <ButtonWithIcon
                                label="Обратиться в УК"
                                description="Нажмите, чтобы обратиться"
                                source={MakeAppealIcon}
                                imageStyle={styles.makeAppealIcon}
                                onPress={this.onContactManageCompanyButtonPress(
                                    APPEAL_SELECTION_TYPES.MANAGE_COMPANY
                                )}
                            />
                        )}
                        {this.hasDevAppeals && (
                            <ButtonWithIcon
                                label="Обратиться к застройщику"
                                description="Нажмите, чтобы выбрать тип обращения"
                                source={BuildingAppealIcon}
                                imageStyle={styles.buildingAppealIcon}
                                onPress={this.onContactManageCompanyButtonPress(
                                    APPEAL_SELECTION_TYPES.BUILDING_COMPANY
                                )}
                            />
                        )}
                    </View>

                    <SplitLine style={styles.splitLine} />

                    {/*<Text style={styles.containerText}>Лента новостей</Text>*/}
                    {/*{isEndLoadingNews ? this.renderNews() : this.renderPlaceholderNews()}*/}
                </View>
            </ScrollView>
        )
    }
}

export default connect(
    ({ notifications, dicts, projects }) => ({
        notifications,
        appealTypesArray: dicts.appealTypes,
        projects: projects.list,
    }),
    {
        fetchAllNews: shared.actions.fetchAllNews,
        setWarning: shared.actions.warning,
        setSuccess: shared.actions.success,
        editProfileFcmToken: shared.actions.editProfilePushNotifcations,
        fetchBill: shared.actions.fetchBill,
        updateNotification: shared.actions.updateNotification,
        incrementNotification: shared.actions.incrimentNotification,
        getNotifications: shared.actions.fetchNotifications,
    }
)(HomeScreen)

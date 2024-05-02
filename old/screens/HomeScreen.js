import React, { useEffect, useState } from 'react'
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

import { APPEAL_SELECTION_TYPES, APPEAL_TYPES } from '../constants/AppealTypes'
import commonStyles from '../styles/CommonStyles'
import { Fonts } from '../utils/Fonts'
import reportError from '../utils/ReportError'
import { filterAvailableProjectAppealTypes } from '../utils/Utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import shared from 'stonehedge-shared'

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

const HomeScreen = ({
    navigation,
    fetchAllNews,
    setWarning,
    setSuccess,
    editProfileFcmToken,
    fetchBill,
    updateNotification,
    incrementNotification,
    getNotifications,
    notifications,
    appealTypesArray,
    projects,
}) => {
    const [news, setNews] = useState([])
    const [needUpdate, setNeedUpdate] = useState(false)
    const [isEndLoadingNews, setIsEndLoadingNews] = useState(false)
    const [allNewsIsLoaded, setAllNewsIsLoaded] = useState(false)

    const hasDevAppeals =
        filterAvailableProjectAppealTypes({
            projects,
            appealTypesArray,
            appealType: APPEAL_TYPES.DEV,
        })?.length > 0

    const hasUKAppeals =
        filterAvailableProjectAppealTypes({
            projects,
            appealTypesArray,
            appealType: APPEAL_TYPES.UK,
        })?.length > 0

    useEffect(() => {
        const getNews = async (isUpdateNews = false, count = 10) => {
            try {
                const data = await fetchAllNews({ page: (count / 10).toFixed(0) - 1, size: 10 })
                const newsData = data.payload.data.getNews

                if (
                    Number(newsData.pagingOptions.pageTotal) === Number((count / 10).toFixed(0)) &&
                    (newsData.news.length > 0 || news.length > 0)
                ) {
                    setAllNewsIsLoaded(true)
                }

                if (isUpdateNews) {
                    setNews(newsData.news)
                    setIsEndLoadingNews(true)
                } else {
                    setNews([...news, ...newsData.news])
                    setIsEndLoadingNews(true)
                }
            } catch (error) {
                console.error(error)
            }
        }

        const loadAdditionallyNews = () => {
            if (allNewsIsLoaded) {
                setSuccess([{ message: 'Мы загрузили все новости.' }])
                setAllNewsIsLoaded(false)
            }

            if (needUpdate || news.length % 10 !== 0) {
                return
            }

            setNeedUpdate(true)
            getNews(false, news.length + 10)
        }

        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active') {
                setIsEndLoadingNews(false)
                getNews(true)
                getNotifications()
            }
        }

        const checkPermission = async () => {
            const enabled = false
            //await messaging().hasPermission()

            if (enabled) {
                await getToken()
            } else {
                await requestPermission()
            }
        }

        const requestPermission = async () => {
            try {
                //await messaging().requestPermission()
                await getToken()
            } catch (error) {
                reportError(error, 'Home/requestPermission/Notifications')
                // User has rejected permissions
            }
        }

        const getToken = async () => {
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

        const createNotificationListeners = async () => {
            // Вызывается когда приложение открыто
            // Notifications.events().registerNotificationReceivedForeground(
            //    (notification, completion) => {
            //        incrementNotification();
            //         completion({alert: true, sound: true, badge: false});
            //     },
            //   );
            // Вызывается когда телефон неактивен
            //   Notifications.events().registerNotificationOpened(
            //      (notification, completion, action) => {
            //          handleNotification(notification.payload);
            //          completion();
            //       },
            //  );
            // Вызывается когда приложение неактивено
            //   Notifications.getInitialNotification()
            //     .then(
            //        notificationOpen =>
            //            notificationOpen && handleNotification(notificationOpen.payload),
            //    )
            //    .catch(error => {}
            // reportError(
            //     error,
            //     'Home/createNotificationListeners/getInitialNotification',
            // ),
            //   );
        }

        checkPermission()
        createNotificationListeners()
        AppState.addEventListener('change', handleAppStateChange)

        return () => {}
    }, [allNewsIsLoaded, needUpdate, news])

    const handleNotification = (notification) => {
        const response = JSON.parse(notification.data).notification
        if (response.event !== undefined) {
            const { eventTypeId, eventId } = response.event
            updateNotification({ notificationId: response.notificationId })
            checkEvent({ eventTypeId, eventId })
        } else if (response.bill !== undefined) {
            const { billId, description } = response.bill
            updateNotification({ notificationId: response.notificationId })
            checkBill({ billId, description })
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

    const checkBill = ({ billId, description }) => {
        fetchBill({ billId }).then((response) => {
            const { fileLink } = response.payload.data.getBill
            navigation.navigate('PdfViewScreen', {
                fileLink,
                title: `${description}`,
            })
        })
    }

    const checkEvent = ({ eventTypeId, eventId }) => {
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

    const isNearBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 100

    const renderOneNews = ({ item }) => (
        <View style={styles.oneNews}>
            <TouchableHighlight
                style={styles.oneNewsButton}
                underlayColor="#E8E8E8"
                onPress={() =>
                    navigation.navigate('NewsScreen', {
                        title: item.title,
                        id: item.newsId,
                    })
                }>
                <>
                    <Image
                        style={styles.newsImage}
                        source={
                            item.previewPicture
                                ? {
                                      uri: `https://admin-lk.stonehedge.ru${item.previewPicture}`,
                                  }
                                : NewsIcon
                        }
                    />
                    <View style={styles.wrapperPadding}>
                        <Text style={styles.newsText}>{item.title}</Text>
                    </View>
                </>
            </TouchableHighlight>
        </View>
    )

    return (
        <ScrollView
            style={styles.scrollView}
            onScroll={({ nativeEvent }) => {
                if (isNearBottom(nativeEvent)) {
                    loadAdditionallyNews()
                } else {
                    setNeedUpdate(false)
                }
            }}>
            <View style={[commonStyles.container, styles.container]}>
                <View style={styles.wrapper}>
                    <ButtonWithIcon
                        label="Счета"
                        description="Нажмите, чтобы посмотреть и оплатить"
                        source={GuestsIcon}
                        imageStyle={styles.guestsIcon}
                        onPress={() => navigation.navigate('PaymentsScreen')}
                    />
                    <ButtonWithIcon
                        label="Заказать пропуск"
                        description="Для гостя, такси или доставки"
                        source={TaxiIcon}
                        imageStyle={styles.taxiIcon}
                        onPress={() => navigation.navigate('SelectPassOrderScreen')}
                    />
                    {hasUKAppeals && (
                        <ButtonWithIcon
                            label="Обратиться в УК"
                            description="Нажмите, чтобы обратиться"
                            source={MakeAppealIcon}
                            imageStyle={styles.makeAppealIcon}
                            onPress={() =>
                                navigation.navigate('AppealSelectionScreen', {
                                    mode: APPEAL_SELECTION_TYPES.MANAGE_COMPANY,
                                })
                            }
                        />
                    )}
                    {hasDevAppeals && (
                        <ButtonWithIcon
                            label="Обратиться к застройщику"
                            description="Нажмите, чтобы выбрать тип обращения"
                            source={BuildingAppealIcon}
                            imageStyle={styles.buildingAppealIcon}
                            onPress={() =>
                                navigation.navigate('AppealSelectionScreen', {
                                    mode: APPEAL_SELECTION_TYPES.BUILDING_COMPANY,
                                })
                            }
                        />
                    )}
                </View>

                <SplitLine style={styles.splitLine} />

                {isEndLoadingNews ? (
                    <FlatList
                        style={styles.flatlist}
                        keyExtractor={(item) => item.newsId.toString()}
                        data={news}
                        renderItem={renderOneNews}
                    />
                ) : (
                    <View style={styles.wrapper}>{/* Placeholder for loading indicator */}</View>
                )}
            </View>
        </ScrollView>
    )
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

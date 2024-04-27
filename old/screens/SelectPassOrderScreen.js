import { Fonts } from '../utils/Fonts'

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import BuildPass from '../../assets/oldImg/Building.png'
import DeliveryPass from '../../assets/oldImg/DeliveryImage.png'
import GuestPass from '../../assets/oldImg/GuestImage.png'
import LargeSizePass from '../../assets/oldImg/LargeSize.png'
import TaxiPass from '../../assets/oldImg/TaxiImage.png'

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F7F7F9',
    },
    label: {
        maxWidth: 260,
        marginBottom: 39,
        color: '#111111',
        fontFamily: Fonts.DisplayBold,
        fontSize: 18,
    },
    buttonContainer: {
        height: 117,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 27,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
    },
    textButtonStyle: {
        color: '#747E90',
        fontFamily: Fonts.DisplayCompactSemiBold,
        fontSize: 14,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    deliveryPass: {
        width: 49.48,
        height: 40,
    },
    taxiPass: {
        width: 60,
        height: 41,
    },
    guestPass: {
        width: 48,
        height: 40,
    },
    buildingPass: {
        width: 48,
        height: 40,
    },
    largeSizePass: {
        width: 60,
        height: 41,
    },
    emptyText: {
        color: '#747E90',
        fontFamily: Fonts.DisplayLight,
        fontSize: 12,
        textAlign: 'center',
    },
    emptyTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
styles.shadowButton = {
    shadowColor: '#8E97A8',
    shadowOpacity: 0.35,
    flexBasis: '48%',
    marginBottom: 16,
    borderRadius: 3,
    backgroundColor: '#747E90',
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
}

const APPEAL_TYPES = {
    GUEST: 1,
    TAXI: 2,
    DELIVERY: 4,
    LARGE: 6,
    BUILDING: 7,
}

class SelectPassOrderScreen extends React.Component {
    navigateToDeliveryPassScreen = () => {
        const { navigation } = this.props
        navigation.navigate('CreateEventDeliveryPassScreen')
    }

    navigateToTaxiPassOrderScreen = () => {
        const { navigation } = this.props
        navigation.navigate('CreateEventTaxiPassOrderScreen')
    }

    navigateToGuestPassOrderScreen = () => {
        const { navigation } = this.props
        navigation.navigate('CreateEventGuestPassOrderScreen')
    }
    navigateToBuildingPassOrderScreen = () => {
        const { navigation } = this.props
        navigation.navigate('CreateEventBuildingDeliveryPassScreen')
    }
    navigateToLargeSizeDeliveryPassScreen = () => {
        const { navigation } = this.props
        navigation.navigate('CreateEventLargeSizeDeliveryPassScreen')
    }

    appealButtonsProps = [
        {
            image: DeliveryPass,
            text: 'Доставка',
            onClick: this.navigateToDeliveryPassScreen,
            style: styles.deliveryPass,
            appealType: APPEAL_TYPES.DELIVERY,
        },
        {
            image: TaxiPass,
            text: 'Такси',
            onClick: this.navigateToTaxiPassOrderScreen,
            style: styles.taxiPass,
            appealType: APPEAL_TYPES.TAXI,
        },
        {
            image: GuestPass,
            text: 'Гость',
            onClick: this.navigateToGuestPassOrderScreen,
            style: styles.guestPass,
            appealType: APPEAL_TYPES.GUEST,
        },
        {
            image: BuildPass,
            text: 'Доставка стройматериалов',
            onClick: this.navigateToBuildingPassOrderScreen,
            style: styles.buildingPass,
            appealType: APPEAL_TYPES.BUILDING,
        },
        {
            image: LargeSizePass,
            text: 'Доставка \n габаритных грузов',
            onClick: this.navigateToLargeSizeDeliveryPassScreen,
            style: styles.largeSizePass,
            appealType: APPEAL_TYPES.LARGE,
        },
    ]

    renderVisibleAppealButtons = (appealButtonsProps) => {
        return appealButtonsProps.map((elem, index) => {
            return (
                <View style={styles.shadowButton} key={index}>
                    <TouchableOpacity onPress={elem.onClick} activeOpacity={0.93}>
                        <View style={styles.buttonContainer}>
                            <Image style={elem.style} source={elem.image} />
                            <Text style={styles.textButtonStyle}>{elem.text}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {
        const appealButtons = this.renderVisibleAppealButtons(this.appealButtonsProps)

        if (appealButtons.length === 0) {
            return (
                <View style={styles.emptyTextContainer}>
                    <Text style={styles.emptyText}>
                        Заказ пропусков недоступен для ваших проектов
                    </Text>
                </View>
            )
        }

        return (
            <View style={styles.wrapper}>
                <Text style={styles.label}>Выберите категорию для заказа пропуска</Text>
                <View style={styles.buttonsContainer}>{appealButtons}</View>
            </View>
        )
    }
}

export default connect(({ dicts, projects }) => ({
    eventTypes: dicts.eventType,
    projects: projects.list,
}))(SelectPassOrderScreen)

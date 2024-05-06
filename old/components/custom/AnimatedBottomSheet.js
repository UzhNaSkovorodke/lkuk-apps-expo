import React, { useEffect, useRef, useState } from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import EditableLabel from './EditablePaymentLabel'
import SplitLine from './SplitLine'

import CleaningIcon from '../../../assets/oldImg/Cleaning.png'
import DrycleaningIcon from '../../../assets/oldImg/Drycleaning.png'
import ParkingIcon from '../../../assets/oldImg/Parking.png'
import PdfDocIcon from '../../../assets/oldImg/PdfDoc.png'
import ReceiptBlueIcon from '../../../assets/oldImg/ReceiptBlue.png'
import TechnicalServicesIcon from '../../../assets/oldImg/TechnicalServices.png'
import UtilitiesIcon from '../../../assets/oldImg/Utilities.png'
import uri from '../../constants/Uri'
import { Fonts } from '../../utils/Fonts'
import DefaultButton from '../buttons/DefaultButton'
import Props from 'prop-types'
import Modal from 'react-native-modalbox'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AnimatedBottomSheet = ({
    isOpen,
    paymentInfo,
    onClosed,
    onPdfButtonClick,
    onMakePaymentPress,
    navigation,
}) => {
    const bottomSheetRef = useRef()
    const [isProgress] = useState(false)
    const [isAmountEditable, setIsAmountEditable] = useState(false)
    const [amount, setAmount] = useState(paymentInfo.price)
    const [isCheckValue, setCheckValue] = useState(true)

    useEffect(() => {
        setAmount(paymentInfo.price)
    }, [paymentInfo])

    let categoryIcon = {}
    let categoryIconStyle = {}

    const { serviceCode } = paymentInfo
    const isUtilityItem = serviceCode === 'UTILITY_BILLS'

    switch (serviceCode) {
        case 'UTILITY_BILLS':
            categoryIcon = UtilitiesIcon
            categoryIconStyle = styles.utilitiesIcon
            break
        case 'CLEANING':
            categoryIcon = CleaningIcon
            categoryIconStyle = styles.cleaningIcon
            break
        case 'DRY_CLEANING':
            categoryIcon = DrycleaningIcon
            categoryIconStyle = styles.drycleaningIcon
            break
        case 'TECHNICAL_SERVICES':
            categoryIcon = TechnicalServicesIcon
            categoryIconStyle = styles.technicalServicesIcon
            break
        case 'PARKING':
            categoryIcon = ParkingIcon
            categoryIconStyle = styles.parkingIcon
            break

        default:
            break
    }

    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current.open()
        } else {
            bottomSheetRef.current.close()
        }
    }, [isOpen])

    const handleModalClose = () => {
        setAmount(undefined)
        if (onClosed) {
            onClosed()
        }
    }

    const handleRejectAmountChange = () => {
        setIsAmountEditable(false)
    }

    const handleAcceptAmountChange = (newAmountValue) => {
        setAmount(newAmountValue)
        setIsAmountEditable(false)
    }

    const handleAcceptPaymentClick = () => {
        onMakePaymentPress({
            id: paymentInfo.billId,
            amount,
        })
        bottomSheetRef.current.close()
    }

    const handleAmountClick = () => {
        setIsAmountEditable(true)
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Image source={categoryIcon} style={categoryIconStyle} />
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>{paymentInfo.residence || ''}</Text>
                <Text style={styles.headerDescription}>{paymentInfo.serviceName || ''}</Text>
            </View>
        </View>
    )

    const renderContent = () => (
        <View style={styles.contentContainer}>
            <View style={styles.itemContentContainer}>
                <EditableLabel
                    minValue={1}
                    maxValue={500000}
                    amount={amount}
                    editable={isUtilityItem}
                    onClick={handleAmountClick}
                    onReject={handleRejectAmountChange}
                    onAccept={handleAcceptAmountChange}
                    setCheckValue={setCheckValue}
                />
            </View>
            {!isUtilityItem && (
                <View style={styles.itemContentContainer}>
                    <Text style={styles.itemTextTitle}>Статус</Text>
                    <Text style={styles.itemTextDescription}>{paymentInfo.statusName || ''}</Text>
                    <Text style={styles.itemTextTitle}>Квитанция</Text>
                    <TouchableOpacity
                        style={styles.informationBlock}
                        onPress={() =>
                            onPdfButtonClick(paymentInfo.billId, paymentInfo.receiptNumber)
                        }>
                        <Image source={ReceiptBlueIcon} style={styles.informationIconStyle} />
                        <Text style={styles.itemTextInformation}>Квитанция</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity
                style={styles.buttonPaymentsRules}
                onPress={() =>
                    navigation.navigate('PdfViewScreen', {
                        fileLink: uri.paymentRulesFileLink,
                        title: 'Правила оплаты',
                    })
                }>
                <Text style={styles.buttonText}>Правила оплаты</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('PdfViewScreen', {
                        fileLink: uri.returnPolicyFileLink,
                        title: 'Правила оплаты',
                    })
                }>
                <Text style={styles.buttonText}>Правила возврата</Text>
            </TouchableOpacity>
        </View>
    )

    const { bottom } = useSafeAreaInsets()

    return (
        <Modal
            style={[styles.modal, { paddingBottom: bottom }]}
            {...(Platform.OS === 'ios' && { coverScreen: true })}
            backdropOpacity={0.4}
            swipeThreshold={1}
            onClosed={handleModalClose}
            position="bottom"
            ref={bottomSheetRef}>
            <View style={styles.swiperLine} />
            {renderHeader()}
            <SplitLine style={styles.topSplitLine} />
            {renderContent()}
            <SplitLine style={styles.bottomSplitLine} />
            {paymentInfo?.isPaymentPaid ? (
                paymentInfo.paymentReceiptLink && (
                    <View style={styles.pdfContainer}>
                        <Text style={styles.itemTextTitle}>Квитанция</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('PdfViewScreen', {
                                    fileLink: paymentInfo.paymentReceiptLink,
                                    title: `Квитанция №${paymentInfo.billId}`,
                                })
                            }>
                            <View style={styles.pdfWrapper}>
                                <Image style={styles.pdfIcon} source={PdfDocIcon} />
                                <Text
                                    style={
                                        styles.pdfName
                                    }>{`Квитанция №${paymentInfo.receiptNumber}.pdf`}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <DefaultButton
                    disabled={isAmountEditable || !isCheckValue}
                    style={styles.defaultButton}
                    textStyle={styles.textStyleDefaultButton}
                    onPress={handleAcceptPaymentClick}
                    isShowLoader={isProgress}
                    text="Внести оплату"
                />
            )}
        </Modal>
    )
}

AnimatedBottomSheet.propTypes = {
    isOpen: Props.bool.isRequired,
    onMakePaymentPress: Props.func.isRequired,
    onPdfButtonClick: Props.func.isRequired,
    onClosed: Props.func.isRequired,
    paymentInfo: Props.shape({
        paymentReceiptLink: Props.string,
        serviceName: Props.string,
        serviceCode: Props.string,
        isPaymentPaid: Props.bool,
        billId: Props.number.isRequired,
        receiptNumber: Props.string,
        residence: Props.string.isRequired,
        price: Props.node,
        statusName: Props.string,
    }).isRequired,
}

export default AnimatedBottomSheet

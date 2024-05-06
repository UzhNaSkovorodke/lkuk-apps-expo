import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import RoomTransferAppeal from '../../assets/oldImg/RoomTransferImage.png'

import { APPEAL_SELECTION_TYPES } from '../constants/AppealTypes'
import { Fonts } from '../utils/Fonts'
import { checkValidUrl, filterAvailableProjectAppealTypes, getRootImageUrl } from '../utils/Utils'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F7F7F9',
    },
    mainContainer: {
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    shadowButton: {
        height: 117,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#F7F7F9',
        borderRadius: 3,
        shadowColor: '#B7B7B7',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 0 },
    },
    label: {
        maxWidth: 260,
        marginTop: 13,
        marginBottom: 26,
        color: '#111111',
        fontFamily: Fonts.DisplayBold,
        fontSize: 18,
        marginHorizontal: 8,
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: '#FFFFFF',
    },
    textButtonStyle: {
        color: '#747E90',
        fontFamily: Fonts.DisplayCompactSemiBold,
        fontSize: 14,
        textAlign: 'center',
    },
    сontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    conciergeAppeal: {
        width: 45.95,
        height: 38,
        marginTop: 29,
    },
    managerAppeal: {
        width: 27.1,
        height: 40,
        marginTop: 27,
    },
    parkingAppeal: {
        width: 42,
        height: 42,
        marginTop: 25,
    },
    customerServiceAppeal: {
        width: 54.52,
        height: 28.01,
        marginTop: 31,
    },
    proprietorshipRegistrationAppeal: {
        width: 34.74,
        height: 42,
        marginTop: 18,
    },
    roomTransferAppeal: {
        width: 38,
        height: 46.23,
        marginTop: 16,
        resizeMode: 'contain',
    },
    additionalLabel1: {
        marginBottom: 16,
        color: '#747E90',
        fontFamily: Fonts.DisplayLight,
        fontSize: 12,
        marginHorizontal: 8,
    },
    additionalLabel2: {
        marginTop: 6,
        marginBottom: 16,
        color: '#747E90',
        fontFamily: Fonts.DisplayLight,
        fontSize: 12,
        marginHorizontal: 8,
    },
    imageWrapper: {
        height: 67,
    },
    textWrapper: {
        height: 50,
        justifyContent: 'center',
    },
    columnWrapperStyle: {
        flex: 1,
        justifyContent: 'space-between',
    },
    shadowWrapper: {
        width: '100%',
        paddingHorizontal: 8,
    },
})

// const APPARTMENT_REGISTRATION_ID = 6; // ID категории обращения регистрации собственности
// const APPARTMENT_TRANSFERING_ID = 5; // ID категории обращения передачи собственности

export const APPEAL_TYPES = {
    UK: 'uk',
    DEV: 'dev',
}

const AppealSelectionScreen = ({ appealTypesArray, projects, route }) => {
    const navigation = useNavigation()
    const renderButton = ({ onClick, image, name, imageStyle }) => {
        return (
            <View style={styles.shadowWrapper}>
                <View style={styles.shadowButton}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={onClick}
                        activeOpacity={0.6}>
                        <>
                            <View style={styles.imageWrapper}>
                                <Image
                                    style={[imageStyle, { alignSelf: 'center' }]}
                                    source={checkValidUrl(image) ? { uri: image } : image}
                                />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.textButtonStyle}>{name}</Text>
                            </View>
                        </>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const navigateToEvent = ({ item }) => {
        navigation.navigate('CreateEventManagementCompanyAppealScreen', {
            typeID: item.id,
            projectsId: item.projects,
            title: item.name,
        })
    }

    const renderSelectionModeItems = (el) =>
        renderButton({
            name: el.item.name,
            onClick: () => navigateToEvent(el),
            image: el.item.icon ? `${getRootImageUrl()}${el.item.icon}` : RoomTransferAppeal,
            imageStyle: styles.roomTransferAppeal,
        })

    const getTitleByMode = (selectionMode) =>
        selectionMode === APPEAL_SELECTION_TYPES.BUILDING_COMPANY
            ? 'Обратиться к застройщику'
            : 'Обратиться в управляющую компанию'

    const renderList = (selectionMode) => (
        <FlatList
            numColumns={2}
            data={filterAvailableProjectAppealTypes({
                projects,
                appealTypesArray,
                appealType:
                    selectionMode === APPEAL_SELECTION_TYPES.BUILDING_COMPANY
                        ? APPEAL_TYPES.DEV
                        : APPEAL_TYPES.UK,
            })}
            ListHeaderComponent={
                <Text style={styles.additionalLabel1}>{getTitleByMode(selectionMode)}</Text>
            }
            columnWrapperStyle={styles.columnWrapperStyle}
            renderItem={(element) => (
                <View style={{ width: '50%' }}>{renderSelectionModeItems(element)}</View>
            )}
        />
    )
    return (
        <View style={styles.wrapper}>
            <View style={styles.mainContainer}>
                <Text style={styles.label}>Выберите категорию для написания обращения</Text>
                {renderList(route.params.mode)}
            </View>
        </View>
    )
}

export default connect(({ dicts, projects }) => ({
    appealTypesArray: dicts.appealTypes,
    projects: projects.list,
}))(AppealSelectionScreen)

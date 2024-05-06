import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import RoomTransferAppeal from '../../assets/oldImg/RoomTransferImage.png'

import { APPEAL_TYPES } from '../constants/AppealTypes'
import { Fonts } from '../utils/Fonts'
import { checkValidUrl, filterAvailableProjectAppealTypes, getRootImageUrl } from '../utils/Utils'
import { useNavigation } from '@react-navigation/native'

const AppealCreateScreen = ({ appealTypesArray, projects }) => {
    const navigation = useNavigation()

    const appealTypes = filterAvailableProjectAppealTypes({
        projects,
        appealTypesArray,
        appealType: APPEAL_TYPES.UK,
    })

    return (
        <View style={styles.wrapper}>
            <View style={styles.mainContainer}>
                <Text style={styles.label}>Выберите категорию для написания обращения</Text>
            </View>

            <FlatList
                numColumns={2}
                data={appealTypes}
                ListHeaderComponent={
                    <Text style={styles.subLabel}>Обратиться в управляющую компанию</Text>
                }
                columnWrapperStyle={styles.columnWrapperStyle}
                renderItem={(e) => {
                    const getImg = (elem) => {
                        const image = elem.item.icon
                            ? `${getRootImageUrl()}${elem.item.icon}`
                            : RoomTransferAppeal

                        return checkValidUrl(image) ? { uri: image } : image
                    }
                    const imgSrc = getImg(e)

                    const navigationHandler = ({ item }) => {
                        navigation.navigate('EventAppealScreen', {
                            typeID: item.id,
                            projectsId: item.projects,
                            title: item.name,
                        })
                    }

                    return (
                        <View style={{ width: '50%' }}>
                            <View style={styles.btnWrapper}>
                                <View style={styles.shadowButton}>
                                    <Pressable
                                        style={{ paddingHorizontal: 8 }}
                                        onPress={() => navigationHandler(e)}>
                                        <View style={styles.imageWrapper}>
                                            <Image style={styles.imgAppeal} source={imgSrc} />
                                        </View>
                                        <View style={styles.textWrapper}>
                                            <Text style={styles.textButtonStyle}>
                                                {e.item.name}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F7F7F9',
    },
    mainContainer: {
        marginBottom: 24,
        paddingHorizontal: 8,
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
    subLabel: {
        marginBottom: 16,
        color: '#747E90',
        fontFamily: Fonts.DisplayLight,
        fontSize: 12,
        marginHorizontal: 8,
    },
    btnWrapper: {
        width: '100%',
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
    imgAppeal: {
        width: 38,
        alignSelf: 'center',
        height: 46.23,
        marginTop: 16,
        resizeMode: 'contain',
    },
    imageWrapper: {},
    textWrapper: {
        height: 50,
        justifyContent: 'center',
    },
    textButtonStyle: {
        color: '#747E90',
        fontFamily: Fonts.DisplayCompactSemiBold,
        fontSize: 14,
        textAlign: 'center',
    },
    columnWrapperStyle: {
        flex: 1,
        justifyContent: 'space-between',
    },
})
export default connect(({ dicts, projects }) => ({
    appealTypesArray: dicts.appealTypes,
    projects: projects.list,
}))(AppealCreateScreen)

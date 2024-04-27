import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Fonts } from '../../utils/Fonts'

const styles = StyleSheet.create({
    commentLabel: {
        color: '#747E90',
        fontFamily: Fonts.DisplayLight,
        fontSize: 12,
    },
    element: {
        fontSize: 12,
        color: 'red',
    },
})

export default class CommentLabel extends React.Component {
    render() {
        const { required, viewStyle, style, text } = this.props

        let requiredElement
        if (required) {
            requiredElement = <Text style={styles.element}>*</Text>
        }

        return (
            <View style={[{ flexDirection: 'row' }, viewStyle]}>
                <Text style={[styles.commentLabel, style]}>{text}</Text>
                {requiredElement}
            </View>
        )
    }
}

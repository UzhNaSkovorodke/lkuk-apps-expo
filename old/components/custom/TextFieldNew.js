import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, TextInput, View } from 'react-native'

const TextFieldNew = ({
    value,
    setValue,
    placeholder = '',
    keyboardType = 'default',
    isBorderBot = true,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const fontSize = useRef(new Animated.Value(14)).current
    const top = useRef(new Animated.Value(30)).current

    const focusIn = () => {
        Animated.timing(fontSize, {
            toValue: 12,
            duration: 300,
            useNativeDriver: false,
        }).start()

        Animated.timing(top, {
            toValue: 10,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }

    const focusOut = () => {
        if (!isFocused && !value) {
            Animated.timing(fontSize, {
                toValue: 14,
                duration: 200,
                useNativeDriver: false,
            }).start()

            Animated.timing(top, {
                toValue: 30,
                duration: 200,
                useNativeDriver: false,
            }).start()
        }
    }

    useEffect(() => {
        if (isFocused) focusIn()
        else focusOut()
    }, [isFocused])

    return (
        <View style={styles.root}>
            <TextInput
                style={[styles.input, isBorderBot ? styles.borderBot : '']}
                onChangeText={setValue}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            <PlaceHolder
                isFocused={isFocused}
                placeholder={placeholder}
                value={value}
                fontSize={fontSize}
                top={top}
            />
        </View>
    )
}

const PlaceHolder = ({ isFocused, placeholder, value, fontSize, top }) => {
    const isFloat = isFocused || value

    return (
        <View style={[styles.floatLabel]}>
            <Animated.Text
                style={[
                    isFloat ? styles.floatLabelText : styles.labelText,
                    { fontSize: fontSize, top: top },
                ]}>
                {placeholder}
            </Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flex: 1,
        position: 'relative',
        paddingTop: 20,
    },
    input: {
        zIndex: 2,
        height: 44,
        fontSize: 14,
        lineHeight: 24,
        borderBottomColor: '#E0E0E0',
    },
    borderBot: {
        borderBottomWidth: 1,
    },
    floatLabel: {
        zIndex: 1,
        position: 'absolute',
        left: 0,
    },
    labelText: {
        color: '#111111',
        fontWeight: '300',
        top: 30,
    },
    floatLabelText: {
        color: '#747E90',
        fontWeight: '300',
        top: 10,
    },
})

export default TextFieldNew

import React from 'react'
import { Image, Platform, View } from 'react-native'

export default class BackImage extends React.Component {
    render() {
        const { width, height, source } = this.props
        return (
            <View style={{ padding: 8, marginLeft: Platform.OS === 'ios' ? 8 : 0 }}>
                <Image
                    style={{
                        width,
                        height,
                        tintColor: '#434851',
                    }}
                    source={source}
                />
            </View>
        )
    }
}

import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import PropTypes from 'prop-types'

export const LABEL_POSITION = {
    RIGHT: 'right',
    LEFT: 'left',
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    alignStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxLabel: {
        marginRight: 5,
        marginLeft: 5,
    },
})

export default class CircleCheckBox extends React.Component {
    static propTypes = {
        checked: PropTypes.bool,
        label: PropTypes.string,
        outerSize: PropTypes.number,
        filterSize: PropTypes.number,
        innerSize: PropTypes.number,
        outerColor: PropTypes.string,
        filterColor: PropTypes.string,
        innerColor: PropTypes.string,
        onToggle: PropTypes.func.isRequired,
        labelPosition: PropTypes.oneOf([LABEL_POSITION.RIGHT, LABEL_POSITION.LEFT]),
        // styleCheckboxContainer: ViewPropTypes.style.isRequired,
        styleLabel: Text.propTypes.style,
    }

    static defaultProps = {
        checked: false,
        outerSize: 12,
        filterSize: 23,
        innerSize: 6,
        outerColor: '#747E90',
        filterColor: '#FFFFFF',
        innerColor: '#747E90',
        label: '',
        labelPosition: LABEL_POSITION.RIGHT,
        styleLabel: {},
    }

    constructor(props) {
        super(props)
        const outerSize =
            parseInt(props.outerSize, 10) < 10 || Number.isNaN(parseInt(props.outerSize, 10))
                ? 10
                : parseInt(props.outerSize, 10)
        const filterSize =
            parseInt(props.filterSize, 10) > outerSize + 3 ||
            Number.isNaN(parseInt(props.filterSize, 10))
                ? outerSize - 3
                : parseInt(props.filterSize, 10)
        const innerSize =
            parseInt(props.innerSize, 10) > filterSize + 5 ||
            Number.isNaN(parseInt(props.innerSize, 10))
                ? filterSize - 5
                : parseInt(props.innerSize, 10)

        const customStyle = StyleSheet.create({
            circleOuterStyle: {
                width: outerSize,
                height: outerSize,
                backgroundColor: props.outerColor,
                borderRadius: outerSize / 2,
            },
            circleFilterStyle: {
                width: filterSize,
                height: filterSize,
                backgroundColor: props.filterColor,
                borderRadius: filterSize / 2,
            },
            circleInnerStyle: {
                width: innerSize,
                height: innerSize,
                backgroundColor: props.innerColor,
                borderRadius: innerSize / 2,
            },
        })

        this.state = {
            customStyle,
        }
    }

    onToggle = () => {
        const { onToggle, checked } = this.props
        if (onToggle) {
            onToggle(!checked)
        }
    }

    renderInner() {
        const { checked } = this.props
        const { customStyle } = this.state
        return checked ? <View style={customStyle.circleInnerStyle} /> : <View />
    }

    renderLabel(position) {
        const { label, labelPosition, styleLabel } = this.props
        return label.length > 0 && position === labelPosition ? (
            <Text style={[styles.checkBoxLabel, styleLabel]}>{label}</Text>
        ) : (
            <View />
        )
    }

    render() {
        const { styleCheckboxContainer } = this.props
        const { customStyle } = this.state
        return (
            <TouchableOpacity onPress={this.onToggle}>
                <View style={[styles.checkBoxContainer, styleCheckboxContainer]}>
                    {this.renderLabel(LABEL_POSITION.LEFT)}
                    <View style={[styles.alignStyle, customStyle.circleOuterStyle]}>
                        <View style={[styles.alignStyle, customStyle.circleFilterStyle]}>
                            {this.renderInner()}
                        </View>
                    </View>
                    {this.renderLabel(LABEL_POSITION.RIGHT)}
                </View>
            </TouchableOpacity>
        )
    }
}

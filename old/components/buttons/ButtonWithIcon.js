import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Fonts} from '../../utils/Fonts';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#747E90',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#8E97A8',
    borderRadius: 3,
  },
  labelText: {
    color: '#F7F7F9',
    fontFamily: Fonts.DisplaySemiBold,
    fontSize: 14,
  },
  descriptionText: {
    color: '#C5CAD2',
    fontFamily: Fonts.TextLight,
    fontSize: 12,
  },
  icon: {
    resizeMode: 'cover',
    tintColor: '#F7F7F9',
  },
  shadowBoxContainer: {
    width: '100%',
    height: 75,
    marginBottom: 14,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#747E90',
    shadowColor: '#8E97A8',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
});

export default class ButtonWithIcon extends React.Component {
  render() {
    const { imageStyle, style, onPress, source, label, description } =
      this.props;
    return (
      <View style={[styles.shadowBoxContainer, style]}>
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
          <Image style={[styles.icon, imageStyle]} source={source} />
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

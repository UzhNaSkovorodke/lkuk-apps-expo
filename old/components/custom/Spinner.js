import React, { Component } from 'react';
import { Animated, Easing, View } from 'react-native';
import SpinLoader from '../../../assets/oldImg/SpinLoader.png';

export default class Spinner extends Component {
  constructor() {
    super();

    this.loadingSpin = new Animated.Value(0);
  }

  componentDidMount() {
    this.spinAnimation();
  }

  spinAnimation() {
    this.loadingSpin.setValue(0);
    Animated.sequence([
      Animated.timing(this.loadingSpin, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(() => this.spinAnimation());
  }

  render() {
    const spin = this.loadingSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View>
        <Animated.Image
          style={{
            height: 35,
            width: 35,
            transform: [{ rotate: spin }],
            ...this.props.style,
          }}
          tintColor="#747E90"
          source={SpinLoader}
        />
      </View>
    );
  }
}

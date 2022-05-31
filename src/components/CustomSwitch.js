/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Images from '../theme/Images';

class CustomSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            value: !this.state.value,
          });
          this.props.onChange(!this.state.value);
        }}>
        {this.state.value ? (
          <Image source={Images.switch_on} style={styles.image} />
        ) : (
          <Image source={Images.switch_off} style={styles.image} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 51,
    height: 31,
  },
});

export default CustomSwitch;

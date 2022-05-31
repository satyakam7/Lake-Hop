/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class SeperatorLine extends Component {
  render() {
    return (
      <View
        style={[
          styles.separator,
          {marginVertical: !this.props.margin ? 10 : this.props.margin},
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: '#B4BBC9',
  },
});

export default SeperatorLine;

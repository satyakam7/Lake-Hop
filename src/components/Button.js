import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Fonts from '../theme/Fonts';

export default class Button extends React.Component {
  render() {
    const {underline, bold} = this.props;
    let propStyle = {};
    if (underline) {
      propStyle = {textDecorationLine: 'underline'};
    }
    if (bold) {
      propStyle = {fontWeight: 'bold'};
    }
    return (
      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => this.props.onPress()}>
        <Text style={[propStyle, styles.textLabel]}> {this.props.title} </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },

  textLabel: {
    fontFamily: Fonts.light,
    fontSize: 16,
    color: 'black',
  },

  underlineText: {
    textDecorationLine: 'underline',
  },
});

import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
export default class RoundButton extends React.Component {
  render() {
    const {style, theme, title, onPress, arrow} = this.props;
    return (
      <TouchableOpacity style={[style]} onPress={onPress}>
        {theme === 'main' ? (
          <View style={[styles.buttonContainer, styles.mainButton]}>
            <Text style={[styles.buttonText, styles.whiteText]}>{title}</Text>
            {arrow === 'left' && (
              <FontAwesome5
                name="arrow-left"
                size={15}
                color="#fff"
                style={styles.arrow_left}
              />
            )}
            {arrow === 'right' && (
              <FontAwesome5
                name="arrow-right"
                size={15}
                color="#fff"
                style={styles.arrow_right}
              />
            )}
            {arrow === 'yes' && (
              <FontAwesome5
                name="check"
                size={15}
                color="#fff"
                style={styles.arrow_right}
              />
            )}
            {arrow === 'no' && (
              <AntDesign
                name="close"
                size={15}
                color="#C30101"
                style={styles.arrow_right}
              />
            )}
          </View>
        ) : null}
        {theme === 'orange' ? (
          <View style={[styles.buttonContainer, styles.orangeButton]}>
            <Text style={[styles.buttonText, styles.whiteText]}>{title}</Text>
            {arrow === 'gift' && (
              <Ionicons
                name="gift"
                style={styles.arrow_right}
                size={20}
                color="#fff"
              />
            )}
            {arrow === 'right' && (
              <FontAwesome5
                name="arrow-right"
                size={15}
                color="#fff"
                style={styles.arrow_right}
              />
            )}
          </View>
        ) : null}
        {theme === 'lightSky' ? (
          <View style={[styles.buttonContainer, styles.lightSky]}>
            <Text style={[styles.buttonText, styles.blackText]}>{title}</Text>
          </View>
        ) : null}
        {theme === 'dark_lightSky' ? (
          <View style={[styles.buttonContainer, styles.dark_lightSky]}>
            <Text style={[styles.buttonText, styles.whiteText]}>{title}</Text>
          </View>
        ) : null}
        {theme === 'dark_sky' ? (
          <View style={[styles.buttonContainer, styles.dark_sky]}>
            <Text style={[styles.buttonText, styles.whiteText]}>{title}</Text>
            {arrow === 'plus' && (
              <FontAwesome5
                name="plus"
                style={styles.arrow_right}
                size={15}
                color="#fff"
              />
            )}
            {arrow === 'left' && (
              <FontAwesome5
                name="arrow-left"
                size={15}
                color="#fff"
                style={styles.arrow_left}
              />
            )}
            {arrow === 'right' && (
              <FontAwesome5
                name="arrow-right"
                size={15}
                color="#fff"
                style={styles.arrow_right}
              />
            )}
          </View>
        ) : null}
        {theme === 'primary' ? (
          <View style={[styles.buttonContainer, styles.primaryButton]}>
            <Text style={[styles.buttonText, styles.whiteText]}>{title}</Text>
            {arrow === 'yes' && (
              <FontAwesome5
                name="check"
                size={15}
                color="#fff"
                style={styles.arrow_right}
              />
            )}
          </View>
        ) : null}
        {theme === 'negative' ? (
          <View style={[styles.buttonContainer, styles.redButton]}>
            <Text style={[styles.buttonText, styles.whiteText]}>{title}</Text>
            {arrow === 'no' && (
              <AntDesign
                name="close"
                size={15}
                color="#fff"
                style={styles.arrow_right}
              />
            )}
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 52,
    marginVertical: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  outlineButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },

  mainButton: {
    backgroundColor: Colors.appColor,
    borderWidth: 2,
    borderColor: Colors.appColor,
  },

  lightSky: {
    backgroundColor: Colors.lightSkyColor,
  },

  blueButton: {
    backgroundColor: '#2357f7',
    borderWidth: 2,
    borderColor: '#2357f7',
  },

  dark_lightSky: {
    backgroundColor: Colors.dark_lightSkyColor,
  },
  dark_sky: {
    backgroundColor: Colors.dark_skyColor,
  },
  redButton: {
    backgroundColor: 'red',
  },
  primaryButton: {
    backgroundColor: Colors.primaryColor,
  },

  whiteButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
  },

  orangeButton: {
    backgroundColor: '#F47731',
    borderWidth: 2,
    borderColor: '#F47731',
  },

  blackButton: {
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#000',
  },

  noBorderButton: {},

  buttonText: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },

  outlineText: {
    color: '#333',
  },

  whiteText: {
    color: 'white',
  },

  blackText: {
    color: '#101010',
  },

  grayText: {
    color: '#939393',
  },

  arrow_left: {
    position: 'absolute',
    left: 20,
  },

  arrow_right: {
    position: 'absolute',
    right: 20,
  },
});

import React from 'react';
import {Text} from 'react-native';
import Fonts from '../theme/Fonts';

export default class Label extends React.Component {
  render() {
    const {title, color, size, fontStyle, align = 'center'} = this.props;
    var textColor = 'black';
    var textSize = 16;
    var textFontstyle = Fonts.light;
    if (color) {
      textColor = color;
    }
    if (size) {
      textSize = size;
    }
    if (fontStyle) {
      textFontstyle = fontStyle;
    }
    return (
      <Text
        style={[
          {
            color: textColor,
            fontSize: textSize,
            fontFamily: textFontstyle,
            textAlign: align,
          },
          this.props.style,
        ]}>
        {title}
      </Text>
    );
  }
}

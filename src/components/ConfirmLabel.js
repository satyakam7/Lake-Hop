import React from 'react';
import {Text, View} from 'react-native';
import Fonts from '../theme/Fonts';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ConfirmLabel extends React.Component {
  render() {
    const {title} = this.props;

    return (
      <View
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <AntDesign name="checkcircle" size={40} color="#4DC3CC" />
        </View>
        <View style={{flex: 6}}>
          <Text style={{fontSize: 16, fontFamily: Fonts.regular}}>{title}</Text>
        </View>
      </View>
    );
  }
}

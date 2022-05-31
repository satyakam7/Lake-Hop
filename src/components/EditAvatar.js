/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Images from '../theme/Images';
import FastImage from 'react-native-fast-image';

class EditAvatar extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[this.props.style, styles.container]}
        onPress={() => this.props.onTakePhoto()}>
        <FastImage
          style={styles.avatarImage}
          source={
            this.props.avatar && this.props.avatar.length
              ? {uri: this.props.avatar}
              : Images.user_icon
          }
        />
      </TouchableOpacity>
    );
  }
}

export default EditAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    resizeMode: 'cover',
    backgroundColor: 'lightgray',
    marginTop: 20,
    marginBottom: 20,
  },
});

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Avatar from '../components/Avatar';

import Fonts from '../theme/Fonts';

const screenWidth = Dimensions.get('window').width;

export default class TopNavBar extends React.Component {
  render() {
    const {
      title,
      leftButton,
      rightButton,
      bg,
      like = false,
      type = 'title',
      avatar,
      onBack,
      onBell,
      onLike,
      onClose,
    } = this.props;

    var propStyle = {backgroundColor: '#1C394A'};

    if (bg === 'transparent') {
      propStyle = {backgroundColor: 'transparent'};
    }

    return (
      <View style={[styles.container, propStyle]}>
        <View style={[{position: 'relative', width: screenWidth}]}>
          {leftButton === 'back' && (
            <TouchableOpacity
              style={styles.leftButton}
              onPress={() => onBack()}>
              <Ionicons name="chevron-back" size={25} color="#fff" />
            </TouchableOpacity>
          )}
          {type === 'title' && (
            <Text numberOfLines={1} style={[styles.titleText]}>
              {title}
            </Text>
          )}
          {type === 'titleWithSign' && (
            <View>
              <Text numberOfLines={1} style={[styles.titleText]}>
                <AntDesign name="checkcircle" size={20} color="#fff" />
                {'   ' + title}
              </Text>
            </View>
          )}
          {type === 'profile' && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: leftButton ? 50 : 20,
                alignItems: 'center',
              }}>
              <Avatar src={avatar} size={35} />
              <Text numberOfLines={1} style={[styles.profileTitleText]}>
                {title}
              </Text>
            </View>
          )}
          {rightButton === 'bell' && (
            <TouchableOpacity
              style={styles.rightButton}
              onPress={() => onBell()}>
              <EvilIcons name="bell" size={30} color="#fff" />
            </TouchableOpacity>
          )}
          {rightButton === 'close' && (
            <TouchableOpacity
              style={styles.rightButton}
              onPress={() => onClose()}>
              <AntDesign name="close" size={30} color="#fff" />
            </TouchableOpacity>
          )}
          {rightButton === 'like' && (
            <TouchableOpacity
              style={styles.rightButton}
              onPress={() => onLike()}>
              {like ? (
                <AntDesign name="heart" size={25} color="#fff" />
              ) : (
                <AntDesign name="hearto" size={25} color="#fff" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...ifIphoneX(
      {
        paddingVertical: 20,
      },
      {
        paddingVertical: 20,
      },
    ),
  },

  titleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: Fonts.bold,
    marginHorizontal: 50,
  },

  profileTitleText: {
    color: 'white',
    fontSize: 20,
    fontFamily: Fonts.bold,
    marginHorizontal: 10,
  },

  leftButton: {
    position: 'absolute',
    left: 15,
    ...ifIphoneX(
      {
        top: 0,
      },
      {
        top: 3,
      },
    ),
  },

  rightButton: {
    position: 'absolute',
    right: 15,
    ...ifIphoneX(
      {
        top: 0,
      },
      {
        top: 3,
      },
    ),
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  bell_icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

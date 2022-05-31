import React from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import Label from '../components/Label';
import RoundButton from '../components/RoundButton';
import Avatar from '../components/Avatar';

import Fonts from '../theme/Fonts';
import Images from '../theme/Images';

const screenWidth = Dimensions.get('window').width;

const statusToString = status => {
  if (status === 'approved') return 'Confirmed';
  else if (status === 'declined') return 'Declined';
  else if (status === 'cancelled_by_guest') return 'Cancelled';
};

export default class TripCard extends React.Component {
  render() {
    const {
      type = 'one',
      isLike,
      title,
      hour,
      price,
      distance,
      position,
      status,
      avatar = '',
      name = '',
      image,
      review,
      onPress,
      onReview,
    } = this.props;
    return (
      //  type = "one"    normal
      //  type = "two"    travel home
      //  type = "three"  travel home
      //  type = "four"   my trips upcoming
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.buttonContainer}
          onPress={onPress}>
          <View
            style={[
              {
                alignItems: 'flex-start',
                marginHorizontal: type !== 'one' ? 5 : 0,
              },
              (type === 'two' || type === 'three') && {
                width: screenWidth * 0.8,
              },
            ]}>
            <Image
              style={{width: screenWidth - 40, height: 200}}
              source={{uri: image}}
            />
            {isLike === true ? (
              <Image style={styles.likeIco} source={Images.likeSelected_ico} />
            ) : isLike === undefined ? (
              <></>
            ) : (
              <Image style={styles.likeIco} source={Images.like_ico} />
            )}
            <Label title={title} fontStyle={Fonts.semibold} align="left" />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.label}>
                {type === 'one' && (
                  <Label title={'from $' + hour + '/hour'} size={14} />
                )}
                {type === 'two' && <Avatar src={avatar} size={25} />}
                {type === 'two' && (
                  <Label title={name} size={14} style={{marginLeft: 10}} />
                )}
                {type === 'four' && (
                  <Label title={hour + ' Hours - $' + price} size={14} />
                )}
              </View>
              {(type === 'one' || type === 'two') && (
                <View style={styles.label}>
                  <Label
                    title={distance + ' miles away'}
                    color="#F47731"
                    size={14}
                  />
                </View>
              )}
              {type === 'four' && (
                <View style={styles.label}>
                  <Label
                    title={statusToString(status)}
                    color="#1C394A"
                    size={14}
                  />
                </View>
              )}
            </View>
            {type !== 'three' && (
              <Label
                title={
                  position !== null && position.length > 100
                    ? position.slice(0, 100) + '...'
                    : position
                }
                size={14}
                align="left"
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        {review && (
          <RoundButton
            title="Review your trip"
            theme="main"
            style={styles.loginButton}
            onPress={onReview}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 15,
    flexDirection: 'column',
  },

  likeIco: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 20,
    right: 20,
  },

  label: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

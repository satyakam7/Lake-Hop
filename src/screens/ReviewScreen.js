import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';
import Avatar from '../components/Avatar';

import Images from '../theme/Images';
import Fonts from '../theme/Fonts';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const stars = [1, 2, 3, 4, 5];

class ReviewScreen extends Component {
  constructor() {
    super();
    this.state = {
      star: 0,
    };
  }

  onStarPress(star) {
    this.setState({star});
  }

  render() {
    const {full_name, profile_picture_url} = this.props.currentUser;
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            title="Review"
            leftButton="back"
            onBack={() => {
              this.props.navigation.navigate('MyTrip');
            }}
          />
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={styles.contentView}>
                <View style={{width: '100%', alignItems: 'flex-start'}}>
                  <Label title="Host Rating" align="left" />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 20,
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Avatar
                      src={profile_picture_url}
                      size={100}
                      withBorder
                      style={{
                        borderColor: '#B6B6B6',
                        borderWidth: 1,
                        marginBottom: 20,
                      }}
                    />
                    <Label title={full_name} fontStyle={Fonts.bold} />
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 10}}>
                    {stars.map(star => (
                      <TouchableOpacity
                        onPress={() => this.onStarPress(star)}
                        key={star}>
                        {this.state.star >= star ? (
                          <Image
                            style={styles.starIcon}
                            source={Images.StarFilled}
                          />
                        ) : (
                          <Image
                            style={styles.starIcon}
                            source={Images.StarEmpty}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={{width: '100%', alignItems: 'flex-start'}}>
                  <Label title="Write a Review" />
                </View>

                <View style={{width: '100%', marginTop: 10}}>
                  <CustomInput type="textarea" style={{height: 200}} />
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View style={{marginHorizontal: 20}}>
              <RoundButton
                title="Submit Review"
                theme="main"
                style={{marginTop: 50}}
                onPress={() => this.props.navigation.navigate('Review')}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  contentView: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },

  starIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    errorMessage: state.user.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);

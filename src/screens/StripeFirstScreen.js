import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  LogBox,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

import RoundButton from '../components/RoundButton';
import Button from '../components/Button';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';

import Images from '../theme/Images';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class StripeFirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
    };
  }

  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <Modal isVisible={this.state.confirm}>
            <View style={{backgroundColor: 'white'}}>
              <View style={{paddingVertical: 20}}>
                <Label title="Skip account creation?" size={20} />
                <Label title="You can create a Stripe account in Settings later." />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.setState({confirm: false})}
                  style={styles.cancelButton}>
                  <Label title="Cancel" color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({confirm: false});
                    this.props.navigation.navigate('Login');
                  }}
                  style={styles.skipButton}>
                  <Label title="Skip" color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TopNavBar title="Stripe" />
          <View style={styles.container}>
            <View style={[styles.flex, {alignItems: 'center'}]}>
              <Image source={Images.stripe_phone} style={styles.logoImage} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginTop: 20,
                }}>
                <Label title="Complete payments in the app using  " size={16} />
                <Label title="Stripe" size={24} fontStyle="bold" />
              </View>
            </View>
            <View>
              <View style={styles.centerView}>
                <RoundButton
                  title="Skip"
                  theme="dark_lightSky"
                  style={{flex: 1}}
                  onPress={() => this.setState({confirm: true})}
                />
                <View style={{width: 20}} />
                <RoundButton
                  title="Create Stripe Account"
                  theme="dark_sky"
                  arrow="right"
                  style={{flex: 2}}
                  onPress={() => this.props.navigation.navigate('StripeSecond')}
                />
              </View>
              <View style={styles.centerView}>
                <Label title="Already have an account?" />
                <Button
                  title="Login"
                  underline={true}
                  bold={true}
                  onPress={() => this.props.navigation.navigate('Login')}
                />
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  logoImage: {
    width: screenWidth / 2,
    height: screenHeight / 3,
    resizeMode: 'contain',
  },

  centerView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgotButton: {
    alignItems: 'flex-end',
  },

  skipButton: {
    flex: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#707070',
    padding: 10,
  },
  cancelButton: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#707070',
    padding: 10,
  },
});

export default StripeFirstScreen;

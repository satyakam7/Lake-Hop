import React, {Component} from 'react';
import {View, StyleSheet, LogBox, SafeAreaView, Image} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';

import Fonts from '../theme/Fonts';
import Images from '../theme/Images';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class StripeThirdScreen extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <TopNavBar title="Stripe" />
            <KeyboardAwareScrollView>
              <View style={styles.inputForm}>
                <View style={styles.flex}>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={Images.stripe_title}
                      style={{width: 300, height: 100}}
                    />
                  </View>
                  <View style={{marginVertical: 40}}>
                    <Label title="Please enter the verification code sent to" />
                    <Label title="j*****e@email.com" />
                  </View>
                  <View style={styles.centerView}>
                    <OTPInputView
                      style={{width: '80%', height: 200}}
                      pinCount={6}
                      // autoFocusOnLoad
                      // code=""
                      codeInputFieldStyle={styles.borderStyleBase}
                      // onCodeFilled={code => {
                      //   console.log(`Code is ${code}, you are good to go!`);
                      // }}
                    />
                    <Label
                      title="Resend Code (15s)"
                      fontStyle={Fonts.regular}
                      color="#6B6B6B"
                    />
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View style={{marginBottom: 20, paddingHorizontal: 20}}>
              <RoundButton
                title="Verify"
                theme="main"
                style={styles.loginButton}
                arrow="yes"
                onPress={() => this.props.navigation.navigate('Login')}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  inputForm: {
    paddingVertical: 60,
    flex: 1,
  },

  loginButton: {
    marginTop: 25,
    width: '100%',
  },

  centerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  borderStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    color: 'black',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

export default StripeThirdScreen;

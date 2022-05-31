import React, {Component} from 'react';
import {View, StyleSheet, LogBox, SafeAreaView} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import Fonts from '../theme/Fonts';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class VerificationScreen extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <TopNavBar
              leftButton="back"
              title="Verification"
              onBack={() => this.props.navigation.navigate('Signup')}
            />
            <View style={styles.contentView}>
              <View style={styles.formView}>
                <View style={styles.inputForm}>
                  <View style={styles.flex}>
                    <View style={{alignItems: 'center'}}>
                      <Label
                        title="Please enter the 6-digit code sent to"
                        fontStyle={Fonts.regular}
                      />
                      <Label
                        title="***   ***   5465"
                        fontStyle={Fonts.regular}
                        size={30}
                      />
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
                <View style={[]}>
                  <RoundButton
                    title="Verify"
                    theme="main"
                    style={styles.loginButton}
                    arrow="yes"
                    onPress={() =>
                      this.props.navigation.navigate('StripeFirst')
                    }
                  />
                </View>
              </View>
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

  contentView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 80,
  },

  formView: {
    flex: 1,
    width: '90%',
    overflow: 'hidden',
  },

  inputForm: {
    paddingVertical: 60,
    flex: 1,
    flexDirection: 'column',
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

export default VerificationScreen;

import React, {Component} from 'react';
import {View, StyleSheet, LogBox, SafeAreaView} from 'react-native';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class ForgotPasswordResetScreen extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <TopNavBar title="Reset Message Sent" />
            <View style={styles.contentView}>
              <View style={styles.formView}>
                <View style={styles.inputForm}>
                  <View style={styles.flex}>
                    <View style={{alignItems: 'center'}}>
                      <Label title="Password Reset Sent" />
                      <Label title="A password reset link was sent to your email." />
                      <Label title="If you don’t see it in a couple of minutes, check your spam forlder. It was sent from noreply@lakehopdomain.com." />
                    </View>
                  </View>
                </View>
                <View>
                  <RoundButton
                    title="Back To Login"
                    theme="main"
                    style={styles.loginButton}
                    arrow="left"
                    onPress={() => this.props.navigation.navigate('Login')}
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
});

export default ForgotPasswordResetScreen;

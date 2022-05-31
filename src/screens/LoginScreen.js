import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import Toast from 'react-native-toast-message';

import BackgroundImage from '../components/BackgroundImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RoundButton from '../components/RoundButton';
import Button from '../components/Button';
import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import LoadingOverlay from '../components/LoadingOverlay';

import {Status} from '../constants';

import actionTypes from '../actions/actionTypes';

import Images from '../theme/Images';
import Messages from '../theme/Messages';

import {isValidate} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // email: 'zhi@gad.ai',
      // password: 'Password123!@#',
      email: 'tree.blockchain.dev@gmail.com',
      password: '12345678aA!',
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loginUserStatus != this.props.loginUserStatus) {
      if (this.props.loginUserStatus == Status.SUCCESS) {
        this.loginSuccess();
      } else if (this.props.loginUserStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onLogin() {
    const {email, password} = this.state;
    let error = '';
    let validate = isValidate('email', email);
    if (!validate.validate) {
      error = validate.error;
    } else {
      validate = isValidate('password', password);
      if (!validate.validate) {
        error = validate.error;
      }
    }
    if (error.length) {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: error,
      });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch({
      type: actionTypes.LOGIN_USER,
      payload: {email, password},
    });
  }

  loginSuccess() {
    this.setState({loading: false});
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: Messages.LoginSuccess,
    });
    this.props.navigation.navigate('TravelTab', {
      pageName: 'Home',
    });
  }
  onFailure(errorMessage) {
    this.setState({loading: false});
    Toast.show({
      type: 'error',
      text1: 'Notification',
      text2: errorMessage,
    });
  }

  render() {
    return (
      <View style={styles.flex}>
        <BackgroundImage backgroundImage={Images.main_bg_login} />
        <SafeAreaView style={styles.flex}>
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={styles.contentView}>
                <View style={styles.flex}>
                  <Image
                    source={Images.main_logo_dark}
                    style={styles.logoImage}
                  />
                  <Label
                    title="Hop on any lake, anywhere, any time."
                    size={14}
                  />
                </View>
                <View style={styles.formView}>
                  <View style={styles.inputForm}>
                    <CustomInput
                      placeholder="Email"
                      type="email"
                      value={this.state.email}
                      onSubmitEditing={() => {
                        this.passwordInput.focus();
                      }}
                      onRefInput={input => {
                        this.emailInput = input;
                      }}
                      onChange={text =>
                        this.setState({
                          email: text,
                        })
                      }
                    />
                    <CustomInput
                      placeholder="Password"
                      type="password"
                      value={this.state.password}
                      onSubmitEditing={() => this.onLogin()}
                      onRefInput={input => {
                        this.passwordInput = input;
                      }}
                      onChange={text => this.setState({password: text})}
                    />
                    <View style={styles.forgotButton}>
                      <Button
                        title="I forgot my password"
                        onPress={() =>
                          this.props.navigation.navigate('ForgotPassword')
                        }
                      />
                    </View>
                    <View style={styles.centerView}>
                      <RoundButton
                        title="Login"
                        theme="main"
                        style={styles.loginButton}
                        onPress={() => this.onLogin()}
                      />
                    </View>
                    <View style={styles.centerView}>
                      <Label title="Don't have an account?" />
                      <Button
                        title="Sign Up"
                        underline={true}
                        bold={true}
                        onPress={() => this.props.navigation.navigate('Signup')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
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
  },

  contentView: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logoImage: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    marginTop: 100,
  },

  formView: {
    marginTop: 100,
  },

  inputForm: {
    paddingVertical: 30,
  },

  loginButton: {
    width: '100%',
  },

  centerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  forgotButton: {
    alignItems: 'flex-end',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    loginUserStatus: state.user.loginUserStatus,
    errorMessage: state.user.errorMessage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

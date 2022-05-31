import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, LogBox, SafeAreaView} from 'react-native';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';
import LoadingOverlay from '../components/LoadingOverlay';

import {Status} from '../constants';

import actionTypes from '../actions/actionTypes';

import {isValidate} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', loading: false};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resetPasswordStatus != this.props.resetPasswordStatus) {
      if (this.props.resetPasswordStatus == Status.SUCCESS) {
        this.resetSuccess();
      } else if (this.props.resetPasswordStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  resetSuccess() {
    this.setState({loading: false});
    this.props.navigation.navigate('ForgotPasswordReset');
  }

  onFailure(errorMessage) {
    this.setState({loading: false});
    Toast.show({
      type: 'error',
      text1: 'Notification',
      text2: errorMessage,
    });
  }

  onReset() {
    let validate = isValidate('email', this.state.email);
    if (validate.validate) {
      this.setState({loading: true});
      this.props.dispatch({
        type: actionTypes.RESET_PASSWORD,
        payload: {email: this.state.email},
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: validate.error,
      });
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <TopNavBar
              leftButton="back"
              title="Forgot Your Password"
              onBack={() => this.props.navigation.navigate('Login')}
            />
            <View style={styles.contentView}>
              <View style={styles.formView}>
                <View style={styles.inputForm}>
                  <Label title="Forgot your password?" />
                  <Label title="Please enter your account’s email address and we’ll send you a secure link to reset your password." />
                  <View style={{marginVertical: 20}}>
                    <CustomInput
                      type="email"
                      placeholder="Email"
                      onSubmitEditing={() => this.onReset()}
                      onChange={email =>
                        this.setState({
                          email,
                        })
                      }
                    />
                  </View>
                </View>
                <View>
                  <RoundButton
                    title="Reset"
                    theme="main"
                    style={styles.loginButton}
                    arrow="yes"
                    onPress={() => this.onReset()}
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
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  contentView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    resetPasswordStatus: state.user.resetPasswordStatus,
    errorMessage: state.user.errorMessage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';

import Fonts from '../theme/Fonts';
import Messages from '../theme/Messages';

import actionTypes from '../actions/actionTypes';

import {isValidate} from '../functions';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class StripeSecondScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      country: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.signUpUserStatus != this.props.signUpUserStatus) {
    //   if (this.props.signUpUserStatus == Status.SUCCESS) {
    //     this.signUpSuccess();
    //   } else if (this.props.signUpUserStatus == Status.FAILURE) {
    //     this.onFailure(this.props.errorMessage);
    //   }
    // }
  }

  onSignUp() {
    const {fullname, email, password} = this.state;
    let error = '';
    let validate = isValidate('fullname', fullname);
    if (!validate.validate) error = validate.error;
    else {
      validate = isValidate('email', email);
      if (!validate.validate) error = validate.error;
      else {
        validate = isValidate('password', password);
        if (!validate.validate) error = validate.error;
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
    // this.props.dispatch({
    //   type: actionTypes.SIGNUP_USER,
    //   payload: {
    //     user: {
    //       email,
    //       password,
    //       first_name: firstname,
    //       last_name: lastname,
    //       phone_number: phone,
    //     },
    //     ambassador: '',
    //   },
    // });
    this.props.navigation.navigate('StripeThird');
  }

  signUpSuccess() {
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: Messages.LoginSuccess,
    });
    this.props.navigation.navigate('StripeThird');
  }

  onFailure(errorMessage) {
    Toast.show({
      type: 'error',
      text1: 'Notification',
      text2: errorMessage,
    });
  }
  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar title="Stripe" />
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={{marginVertical: 40}}>
                <View style={{marginVertical: 20}}>
                  <Label title="Create a Stripe account below." />
                </View>
                <View style={styles.alignLeft}>
                  <Label title="Full Name" fontStyle={Fonts.regular} />
                  <CustomInput
                    onRefInput={input => {
                      this.phoneInput = input;
                    }}
                    value={this.state.phone}
                    onChange={text =>
                      this.setState({
                        phone: text,
                      })
                    }
                    onSubmitEditing={() => this.emailInput.focus()}
                  />
                </View>
                <View style={styles.alignLeft}>
                  <Label title="Email" fontStyle={Fonts.regular} />
                  <CustomInput
                    type="email"
                    onRefInput={input => {
                      this.emailInput = input;
                    }}
                    value={this.state.email}
                    onChange={text =>
                      this.setState({
                        email: text,
                      })
                    }
                    onSubmitEditing={() => this.passwordInput.focus()}
                  />
                </View>
                <View style={styles.alignLeft}>
                  <Label title="Country" fontStyle={Fonts.regular} />
                  <CustomInput
                    type="country"
                    onChange={country => this.setState({country})}
                  />
                </View>
                <View style={styles.alignLeft}>
                  <Label title="Password" fontStyle={Fonts.regular} />
                  <CustomInput
                    type="password"
                    onRefInput={input => {
                      this.passwordInput = input;
                    }}
                    value={this.state.password}
                    onChange={text =>
                      this.setState({
                        password: text,
                      })
                    }
                    onSubmitEditing={() => this.onSignUp()}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View>
              <RoundButton
                title="Sign Up"
                theme="main"
                arrow="yes"
                style={styles.loginButton}
                onPress={() => this.onSignUp()}
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
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  contentView: {
    flex: 1,
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#F6F6F6',
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DFE2E2',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },

  loginButton: {
    width: '100%',
  },

  centerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alignLeft: {
    alignItems: 'flex-start',
    marginVertical: 5,
    width: '100%',
  },

  alingCenter: {
    alignItems: 'center',
  },

  userIcon: {
    width: 150,
    height: 150,
    marginVertical: 5,
  },

  inputView: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  spaceView: {
    width: 20,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    signUpUserStatus: state.user.signUpUserStatus,
    errorMessage: state.user.errorMessage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StripeSecondScreen);

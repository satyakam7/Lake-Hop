import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, ScrollView, LogBox} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import EditAvatar from '../components/EditAvatar';
import CustomInput from '../components/CustomInput';

import Fonts from '../theme/Fonts';
import Messages from '../theme/Messages';

import actionTypes from '../actions/actionTypes';

import {isValidate} from '../functions';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: '',
      avatarFile: '',
      firstname: 'Johe',
      lastname: 'Cue',
      email: 'call9002@gmail.com',
      phone: '194323662',
      password: 'abcdabcd1A',
      cpassword: 'abcdabcd1A',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.signUpUserStatus != this.props.signUpUserStatus) {
      if (this.props.signUpUserStatus == Status.SUCCESS) {
        this.signUpSuccess();
      } else if (this.props.signUpUserStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onTakePicture() {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      this.setState({
        avatar: image.path,
        avatarFile: image.data,
      });
    });
  }

  onSignUp() {
    const {firstname, lastname, email, phone, password, cpassword} = this.state;
    let error = '';
    let validate = isValidate('firstname', firstname);
    if (!validate.validate) error = validate.error;
    else {
      validate = isValidate('lastname', lastname);
      if (!validate.validate) error = validate.error;
      else {
        validate = isValidate('email', email);
        if (!validate.validate) error = validate.error;
        else {
          validate = isValidate('phone', phone);
          if (!validate.validate) error = validate.error;
          else {
            validate = isValidate('pair-password', password, cpassword);
            if (!validate.validate) error = validate.error;
          }
        }
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
    this.props.navigation.navigate('Verification');
  }

  signUpSuccess() {
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: Messages.LoginSuccess,
    });
    this.props.navigation.navigate('Verification');
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
          <View style={styles.container}>
            <TopNavBar
              leftButton="back"
              title="Sign Up"
              onBack={() => this.props.navigation.navigate('Login')}
            />
            <View style={styles.contentView}>
              <KeyboardAwareScrollView>
                <ScrollView style={styles.inputForm}>
                  <View>
                    {/* <View style={styles.alingCenter}>
                      <EditAvatar
                        onTakePhoto={() => this.onTakePicture()}
                        avatar={this.state.avatar}
                      />
                      <Label
                        title="Add Profile Picture"
                        fontStyle={Fonts.regular}
                      />
                    </View> */}

                    <View style={styles.inputView}>
                      <View style={[styles.flex, styles.alignLeft]}>
                        <Label title="First Name" fontStyle={Fonts.regular} />
                        <CustomInput
                          placeholder="First Name"
                          onSubmitEditing={() => this.lastnameInput.focus()}
                          onChange={text => this.setState({firstname: text})}
                          value={this.state.firstname}
                        />
                      </View>
                      <View style={styles.spaceView} />
                      <View style={[styles.flex, styles.alignLeft]}>
                        <Label title="Last Name" fontStyle={Fonts.regular} />
                        <CustomInput
                          placeholder="Last Name"
                          onRefInput={input => {
                            this.lastnameInput = input;
                          }}
                          value={this.state.lastname}
                          onChange={text =>
                            this.setState({
                              lastname: text,
                            })
                          }
                          onSubmitEditing={() => this.emailInput.focus()}
                        />
                      </View>
                    </View>

                    <View style={styles.alignLeft}>
                      <Label title="Email" fontStyle={Fonts.regular} />
                      <CustomInput
                        placeholder="Email"
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
                        onSubmitEditing={() => this.phoneInput.focus()}
                      />
                    </View>

                    <View style={styles.alignLeft}>
                      <Label title="Contact Number" fontStyle={Fonts.regular} />
                      <CustomInput
                        placeholder="Phone"
                        type="phone"
                        onRefInput={input => {
                          this.phoneInput = input;
                        }}
                        value={this.state.phone}
                        onChange={text =>
                          this.setState({
                            phone: text,
                          })
                        }
                        onSubmitEditing={() => this.passwordInput.focus()}
                      />
                    </View>

                    <View style={styles.alignLeft}>
                      <Label title="Password" fontStyle={Fonts.regular} />
                      <CustomInput
                        placeholder="Password"
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
                        onSubmitEditing={() => this.cpasswordInput.focus()}
                      />
                      <CustomInput
                        placeholder="Confirm Password"
                        type="password"
                        onRefInput={input => {
                          this.cpasswordInput = input;
                        }}
                        value={this.state.cpassword}
                        onChange={text =>
                          this.setState({
                            cpassword: text,
                          })
                        }
                        onSubmitEditing={() => this.onSignUp()}
                      />
                    </View>
                  </View>
                  <View style={[styles.centerView]}>
                    <RoundButton
                      title="Sign Up"
                      theme="main"
                      arrow="yes"
                      style={styles.loginButton}
                      onPress={() => this.onSignUp()}
                    />
                  </View>
                </ScrollView>
              </KeyboardAwareScrollView>
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

  inputForm: {
    padding: 20,
  },

  loginButton: {
    marginTop: 25,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

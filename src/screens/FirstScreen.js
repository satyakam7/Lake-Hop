import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import BackgroundImage from '../components/BackgroundImage';
import RoundButton from '../components/RoundButton';

import Images from '../theme/Images';

import actionTypes from '../actions/actionTypes';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class FirstScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage backgroundImage={Images.main_bg_second} />
        <SafeAreaView style={styles.container}>
            <View style={styles.contentView}>
              <View style={styles.logoView}>
                <Image
                  source={Images.main_logo_bright}
                  style={styles.logoImage}
                />
              </View>
              <View style={styles.formView}>
                <RoundButton
                  title="Login"
                  theme="lightSky"
                  style={styles.loginButton}
                  onPress={() => {
                    this.props.dispatch({
                      type: actionTypes.SWITCH_CLIENT_GUEST,
                      payload: {
                        switch: 'client',
                      },
                    });
                    this.props.navigation.navigate('Login');
                  }}
                />
                <RoundButton
                  title="Continue as Guest"
                  theme="dark_lightSky"
                  style={styles.loginButton}
                  onPress={() => {
                    this.props.dispatch({
                      type: actionTypes.SWITCH_CLIENT_GUEST,
                      payload: {
                        switch: 'guest',
                      },
                    });
                    this.props.navigation.navigate('TravelTab', {
                      pageName: 'Home',
                    });
                  }}
                />
              </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentView: {
    flex: 1,
    alignItems: 'center',
  },

  logoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },

  logoImage: {
    width: 300,
    height: 132,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  formView: {
    flex: 1,
    justifyContent: "center",
    width: '90%',
  },

  loginButton: {
    width: '100%',
  },
});

function mapStateToProps(state) {
  return {
    switchClientGuest: state.global.switchClientGuest,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);

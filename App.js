/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Text, TextInput} from 'react-native';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {store, persistor} from './src/store';

import AppNavigator from './src/navigation/AppNavigator';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      text1Style={{
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  info: props => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

class Root extends Component {
  constructor() {
    super();
    Text.defaultProps = {allowFontScaling: false};
    TextInput.defaultProps = {allowFontScaling: false};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator screenProps={{}} />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    );
  }
}
export default Root;

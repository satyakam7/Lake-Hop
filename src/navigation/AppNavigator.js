import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import FirstScreen from '../screens/FirstScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ForgotPasswordResetScreen from '../screens/ForgotPasswordResetScreen';
import VerificationScreen from '../screens/VerificationScreen';
import StripeFirstScreen from '../screens/StripeFirstScreen';
import StripeSecondScreen from '../screens/StripeSecondScreen';
import StripeThirdScreen from '../screens/StripeThirdScreen';
import TravelTab from './TravelTab';
import HostTab from './HostTab';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="First"
          component={FirstScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ForgotPasswordReset"
          component={ForgotPasswordResetScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="StripeFirst"
          component={StripeFirstScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="StripeSecond"
          component={StripeSecondScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="StripeThird"
          component={StripeThirdScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="TravelTab"
          component={TravelTab}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="HostTab"
          component={HostTab}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

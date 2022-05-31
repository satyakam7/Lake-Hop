import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Images from '../theme/Images';

import TravelHomeScreen from '../screens/TravelHomeScreen';
import TravelSearchScreen from '../screens/TravelSearchScreen';
import TravelSearchOnMapScreen from '../screens/TravelSearchOnMapScreen';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyTripScreen from '../screens/MyTripScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ViewTripScreen from '../screens/ViewTripScreen';
import BoatScreen from '../screens/BoatScreen';

import TabBarItem from './TabBarItem';
import BookingFirstScreen from '../screens/BookingFirstScreen';
import BookingSecondScreen from '../screens/BookingSecondScreen';
import BookingThirdScreen from '../screens/BookingThirdScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CompletedReservationScreen from '../screens/CompletedReservationScreen';
import MessageScreen from '../screens/MessageScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TravelHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TravelHome"
        component={TravelHomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="TravelSearch"
        component={TravelSearchScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="TravelSearchOnMap"
        component={TravelSearchOnMapScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Boat"
        component={BoatScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="BookingFirst"
        component={BookingFirstScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="BookingSecond"
        component={BookingSecondScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="BookingThird"
        component={BookingThirdScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="CompletedReservation"
        component={CompletedReservationScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function TripScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTrip"
        component={MyTripScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ViewTrip"
        component={ViewTripScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}
function SavedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Saved"
        component={SavedScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Boat"
        component={BoatScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function MessageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

getTabBarVisibility = (route, switchClientGuest) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (switchClientGuest === 'client' && routeName === 'Boat') {
    return {
      tabBarStyle: {display: 'none'},
      headerShown: false,
      gestureEnabled: false,
    };
  } else if (switchClientGuest === 'guest') {
    return {
      tabBarStyle: {display: 'none'},
      headerShown: false,
      gestureEnabled: false,
    };
  }
  return {headerShown: false, gestureEnabled: false};
};

class TravelTab extends React.Component {
  render() {
    const {route} = this.props;
    const {stackname} = route.params;
    return (
      <Tab.Navigator
        initialRouteName={stackname ? stackname : 'TravelHomeStack'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            var icon;
            var selectedIcon;
            var name;

            if (route.name === 'TravelHomeStack') {
              icon = Images.home_ico;
              selectedIcon = Images.homeSelected_ico;
              name = 'Home';
            } else if (route.name === 'TripScreenStack') {
              icon = Images.calendar_ico;
              selectedIcon = Images.calendarSelected_ico;
              name = 'My Trips';
            } else if (route.name === 'SavedStack') {
              icon = Images.heart_ico;
              selectedIcon = Images.heartSelected_ico;
              name = 'Saved';
            } else if (route.name === 'MessageStack') {
              icon = Images.msg_ico;
              selectedIcon = Images.msgSelected_ico;
              name = 'Messages';
            } else if (route.name === 'ProfileStack') {
              icon = Images.profile_ico;
              selectedIcon = Images.profileSelected_ico;
              name = 'Account';
            }

            return (
              <TabBarItem
                page={route.name}
                icon={icon}
                selectedIcon={selectedIcon}
                focused={focused}
                name={name}
              />
            );
          },
          tabBarStyle: {
            height: 80 + getBottomSpace(),
            backgroundColor: '#F6F6F6',
            position: 'absolute',
            borderWidth: 1,
            borderTopWidth: 1,
            borderTopColor: '#6B6B6B',
            borderColor: '#6B6B6B',
          },
        })}
        tabBarOptions={{
          showLabel: false,
        }}>
        <Tab.Screen
          name="TravelHomeStack"
          component={TravelHomeStack}
          options={({route}) =>
            getTabBarVisibility(route, this.props.switchClientGuest)
          }
        />
        <Tab.Screen
          name="TripScreenStack"
          component={TripScreenStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="SavedStack"
          component={SavedStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="MessageStack"
          component={MessageStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Tab.Navigator>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TravelTab);

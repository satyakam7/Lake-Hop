import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {getBottomSpace, getStatusBarHeight} from "react-native-iphone-x-helper"

import HostDashboardScreen from '../screens/HostDashboardScreen';
import CalendarScreen from '../screens/CalendarScreen';
import HostBookingScreen from '../screens/HostBookingScreen';
import DetailAndPriceScreen from '../screens/DetailAndPriceScreen';
import LocationScreen from '../screens/LocationScreen';
// import IntroductionScreen from '../screens/IntroductionScreen';
import NameScreen from '../screens/NameScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ActivitiesDetailScreen from '../screens/ActivitiesDetailScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import RulesScreen from '../screens/RulesScreen';
import GuestsShouldBringScreen from '../screens/GuestsShouldBringScreen';
import PricingScreen from '../screens/PricingScreen';
import PhotosScreen from '../screens/PhotosScreen';
import ChatScreen from '../screens/ChatScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileHostScreen from '../screens/ProfileHostScreen';
import BoatScreen from '../screens/BoatScreen';
import ViewTripScreen from '../screens/ViewTripScreen';

import TabBarItem from './TabBarItem';

import Images from '../theme/Images';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HostHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HostDashboard"
        component={HostDashboardScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HostBooking"
        component={HostBookingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ViewTrip"
        component={ViewTripScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Boat"
        component={BoatScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="DetailAndPrice"
        component={DetailAndPriceScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* <Stack.Screen
        name="Introduction"
        component={IntroductionScreen}
        options={{headerShown: false, gestureEnabled: false}}
      /> */}
      <Stack.Screen
        name="Name"
        component={NameScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ActivitiesDetail"
        component={ActivitiesDetailScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Features"
        component={FeaturesScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Rules"
        component={RulesScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="GuestsShouldBring"
        component={GuestsShouldBringScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Pricing"
        component={PricingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Photos"
        component={PhotosScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}
function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function MessageHostStack() {
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

function ProfileHostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHost"
        component={ProfileHostScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}
class HostTab extends React.Component {
  render() {
    const {route} = this.props;
    const {stackname} = route.params;
    return (
      <Tab.Navigator
        initialRouteName={stackname}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            var icon;
            var selectedIcon;
            var name;

            if (route.name === 'HostHomeStack') {
              icon = Images.home_ico;
              selectedIcon = Images.homeSelected_ico;
              name = 'Home';
            } else if (route.name === 'ListStack') {
              icon = Images.list_ico;
              selectedIcon = Images.listSelected_ico;
              name = 'Listings';
            } else if (route.name === 'CalendarStack') {
              icon = Images.calendar_ico;
              selectedIcon = Images.calendarSelected_ico;
              name = 'Calendar';
            } else if (route.name === 'MessageHostStack') {
              icon = Images.msg_ico;
              selectedIcon = Images.msgSelected_ico;
              name = 'Messages';
            } else if (route.name === 'ProfileHostStack') {
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
            height: 70 + getBottomSpace(),
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
          name="HostHomeStack"
          component={HostHomeStack}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Tab.Screen
          name="ListStack"
          component={ListStack}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Tab.Screen
          name="CalendarStack"
          component={CalendarStack}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Tab.Screen
          name="MessageHostStack"
          component={MessageHostStack}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Tab.Screen
          name="ProfileHostStack"
          component={ProfileHostStack}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Tab.Navigator>
    );
  }
}

export default HostTab;

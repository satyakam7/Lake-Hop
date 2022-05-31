import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TopNavBar from '../components/TopNavBar';

import Fonts from '../theme/Fonts';

class ProfileHostScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {full_name, profile_picture_url} = this.props.currentUser;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TopNavBar
            type="profile"
            title={full_name}
            avatar={profile_picture_url}
          />
          <ScrollView>
            <View style={styles.contentView}>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.linkContainer}
                onPress={() =>
                  this.props.navigation.navigate('TravelTab', {
                    stackname: 'ProfileStack',
                  })
                }>
                <View style={{width: 60, alignItems: 'center'}}>
                  <FontAwesome5 name="exchange-alt" size={30} color="#000" />
                </View>
                <Text style={styles.link}>Switch to Traveling</Text>
              </TouchableOpacity>
              <View style={[styles.separator, {marginBottom: 50}]} />
              <View style={styles.separator} />
              <TouchableOpacity style={styles.linkContainer}>
                <View style={{width: 60, alignItems: 'center'}}>
                  <Feather name="edit" size={30} color="#000" />
                </View>
                <Text style={styles.link}>Edit Profile</Text>
                <View style={{width: 40, alignItems: 'center'}}>
                  <FontAwesome5 name="angle-right" size={30} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.linkContainer}>
                <View style={{width: 60, alignItems: 'center'}}>
                  <Ionicons name="location-sharp" size={30} color="#000" />
                </View>
                <Text style={styles.link}>Payment Settings</Text>
                <View style={{width: 40, alignItems: 'center'}}>
                  <FontAwesome5 name="angle-right" size={30} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.linkContainer}>
                <View style={{width: 60, alignItems: 'center'}}>
                  <FontAwesome name="credit-card" size={25} color="#000" />
                </View>
                <Text style={styles.link}>Location Settings</Text>
                <View style={{width: 40, alignItems: 'center'}}>
                  <FontAwesome5 name="angle-right" size={30} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.linkContainer}>
                <View style={{width: 60, alignItems: 'center'}}>
                  <FontAwesome name="bell-o" size={30} color="#000" />
                </View>
                <Text style={styles.link}>Notification Settings</Text>
                <View style={{width: 40, alignItems: 'center'}}>
                  <FontAwesome5 name="angle-right" size={30} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.linkContainer}>
                <View style={{width: 60, alignItems: 'center'}}>
                  <Feather name="phone" size={30} color="#000" />
                </View>
                <Text style={styles.link}>Contact Us</Text>
                <View style={{width: 40, alignItems: 'center'}}>
                  <FontAwesome5 name="angle-right" size={30} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.linkContainer}>
                <View style={{width: 60, alignItems: 'center'}}>
                  <FontAwesome name="sign-out" size={30} color="#DD3333" />
                </View>
                <Text style={[styles.link, {color: '#DD3333'}]}>Sign Out</Text>
              </TouchableOpacity>
              </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  contentView: {
    marginBottom: 70,
  },

  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    height: 90,
    backgroundColor: 'white',
  },

  link: {
    flex: 1,
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: 'black',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'grey',
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    errorMessage: state.user.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHostScreen);

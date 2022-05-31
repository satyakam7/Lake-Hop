import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Toast from 'react-native-toast-message';

import TripCard from '../components/TripCard';
import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';
import Avatar from '../components/Avatar';

import actionTypes from '../actions/actionTypes';

import {Status, fancyTimeOptions} from '../constants';

import {ToDate} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class HostBookingScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_MY_BOATS,
    });
    this.props.dispatch({
      type: actionTypes.GET_BOOKINGS,
      payload: {
        hosting: 1,
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getMyBoatsStatus != this.props.getMyBoatsStatus) {
      if (this.props.getMyBoatsStatus == Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.getMyBoatsStatus == Status.FAILURE) {
        this.onFailure(this.props.errorBoatMessage);
      }
    }
  }

  onSuccess() {
    this.setState({loading: false});
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
    let {bookings, myboats} = this.props;
    bookings = bookings.filter(booking => booking.status === 'approved');
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar title="Bookings" rightButton="bell" onPress={() => {}} />
          {this.state.loading ? (
            <LoadingOverlay />
          ) : (
            <View style={styles.container}>
              <View style={styles.contentView}>
                <ScrollableTabView
                  style={{marginTop: 20}}
                  initialPage={1}
                  renderTabBar={() => <DefaultTabBar />}
                  tabBarUnderlineStyle={{backgroundColor: '#4DC3CC'}}>
                  <View style={{paddingTop: 20}} tabLabel="Bookings">
                    <Label
                      title="Experience the best boat on the market"
                      align="left"
                    />
                    <ScrollView>
                      {bookings.map((booking, index) => (
                        <TouchableOpacity
                          onPress={() => {}}
                          style={{flexDirection: 'row', marginVertical: 20}}
                          key={index}>
                          <View style={styles.requestItem}>
                            <Avatar
                              size={50}
                              src={booking.user.profile_picture}
                            />
                            <Label
                              style={{marginLeft: 10}}
                              title={booking.user.full_name}
                            />
                          </View>
                          <View style={styles.requestItem}>
                            <Label title={ToDate(booking.date)} />
                            <Label
                              style={{marginLeft: 10}}
                              title={fancyTimeOptions[booking.start_time]}
                            />
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  <View style={{flex: 1}} tabLabel="Listings">
                    <ScrollView>
                      {myboats.map(listing => (
                        <TripCard
                          key={listing.id}
                          image={listing.cover_photo}
                          title={listing.title}
                          hour={listing.price}
                          distance={'3'}
                          position={listing.description}
                          onPress={() =>
                            this.props.navigation.navigate('Boat', {
                              boat_id: listing.id,
                            })
                          }
                        />
                      ))}
                    </ScrollView>
                    <View style={{width: '100%'}}>
                      <RoundButton
                        arrow="plus"
                        title="Add Boat"
                        theme="dark_sky"
                        onPress={() =>
                          this.props.navigation.navigate('DetailAndPrice')
                        }
                      />
                    </View>
                  </View>
                </ScrollableTabView>
              </View>
            </View>
          )}
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
    marginBottom: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  contentView: {
    width: '90%',
  },

  requestItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    getMyBoatsStatus: state.boat.getMyBoatsStatus,
    getBookingsStatus: state.booking.getBookingsStatus,

    myboats: state.boat.myboats,
    bookings: state.booking.bookings,

    errorBoatMessage: state.boat.errorMessage,
    errorBookingMessage: state.booking.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HostBookingScreen);

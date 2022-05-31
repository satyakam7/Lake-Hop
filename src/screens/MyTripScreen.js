import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, ScrollView, LogBox} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Toast from 'react-native-toast-message';

import TripCard from '../components/TripCard';
import TopNavBar from '../components/TopNavBar';
import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import LoadingOverlay from '../components/LoadingOverlay';

import actionTypes from '../actions/actionTypes';
import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class MyTripScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.getBookingsStatus !== this.props.getBookingsStatus) {
      if (this.props.getBookingsStatus === Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.getBookingsStatus === Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
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

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_BOOKINGS,
      payload: {hosting: 0},
    });
  }

  render() {
    //  Status = "upcoming"
    //  Status = "progressing"
    //  Status = "completed"
    const upcomingList = this.props.bookings.filter(
      booking => booking.status === 'approved',
    );
    const allList = this.props.bookings;
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar title="My Trips" />
          {this.state.loading ? (
            <LoadingOverlay />
          ) : (
            <View style={styles.container}>
              <View style={styles.contentView}>
                {this.state.noTrips ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Label title="You haven't booked any trips yet!" />
                    <RoundButton
                      title="Start Searching"
                      theme="main"
                      onPress={() =>
                        this.props.navigation.navigate('TravelSearch')
                      }
                    />
                  </View>
                ) : (
                  <ScrollableTabView
                    style={{marginTop: 20}}
                    initialPage={1}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={{backgroundColor: '#4DC3CC'}}>
                    <View tabLabel="Upcoming">
                      <ScrollView>
                        <View style={styles.flex}>
                          {upcomingList.map(booking => (
                            <TripCard
                              key={booking.id}
                              type="four"
                              image={booking.boat.cover_photo}
                              title={booking.boat.title}
                              hour={booking.duration_in_hours}
                              price={booking.amount}
                              distance={3}
                              position={''}
                              status={booking.status}
                              onPress={() =>
                                this.props.navigation.navigate('ViewTrip', {
                                  status: 'upcoming',
                                  booking_id: booking.id,
                                })
                              }
                            />
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                    <View tabLabel="All">
                      <ScrollView>
                        <View style={styles.flex}>
                          {allList.map(booking => (
                            <TripCard
                              key={booking.id}
                              type="four"
                              image={booking.boat.cover_photo}
                              title={booking.boat.title}
                              hour={booking.duration_in_hours}
                              price={booking.amount}
                              distance={3}
                              position={''}
                              status={booking.status}
                              onPress={() =>
                                this.props.navigation.navigate('ViewTrip', {
                                  status: 'completed',
                                  booking_id: booking.id,
                                })
                              }
                              // review
                              // onReview={() =>
                              //   this.props.navigation.navigate('Review')
                              // }
                            />
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                  </ScrollableTabView>
                )}
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
});

function mapStateToProps(state) {
  return {
    getBookingsStatus: state.booking.getBookingsStatus,
    bookings: state.booking.bookings,
    errorMessage: state.booking.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTripScreen);

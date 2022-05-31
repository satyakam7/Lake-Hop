import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  LogBox,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';
import Avatar from '../components/Avatar';

import Fonts from '../theme/Fonts';

import actionTypes from '../actions/actionTypes';

import {Status, fancyTimeOptions} from '../constants';

import {ToDate} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class HostDashboardScreen extends Component {
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
    if (prevProps.updateBookingStatus !== this.props.updateBookingStatus) {
      if (this.props.updateBookingStatus === Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.updateBookingStatus === Status.FAILURE) {
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
      payload: {hosting: 1},
    });
  }

  render() {
    const requestList = this.props.bookings.filter(
      booking => booking.status === 'requested',
    );
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            title="Host Dashboard"
            rightButton="bell"
            onPress={() => {}}
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <ScrollableTabView
                style={{marginTop: 20}}
                initialPage={1}
                renderTabBar={() => <DefaultTabBar />}
                tabBarUnderlineStyle={{backgroundColor: '#4DC3CC'}}>
                <View style={{paddingTop: 20}} tabLabel="Statistics">
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.item}>
                      <Label title="Overall Rating" />
                      <Label
                        title="0.0"
                        color="#4DC3CC"
                        size={50}
                        fontStyle={Fonts.bold}
                      />
                    </View>
                    <View style={styles.item}>
                      <Label title="Total Reviews" />
                      <Label
                        title="0"
                        color="#4DC3CC"
                        size={50}
                        fontStyle={Fonts.bold}
                      />
                    </View>
                    <View style={styles.item}>
                      <Label title="Total Bookings" />
                      <Label
                        title="0"
                        color="#4DC3CC"
                        size={50}
                        fontStyle={Fonts.bold}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.item}>
                      <Label title="Overall Rating" />
                      <Label title="$0" size={50} fontStyle={Fonts.bold} />
                    </View>
                    <View style={styles.item}>
                      <Label title="Total Bookings" />
                      <Label title="$0" size={50} fontStyle={Fonts.bold} />
                    </View>
                    <View style={styles.item} />
                  </View>
                </View>
                <View tabLabel="Requests" style={{paddingTop: 20}}>
                  <Label
                    title="Experience the best boat on the market"
                    align="left"
                  />
                  <ScrollView>
                    {requestList.map(booking => (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('ViewTrip', {
                              hosting: 1,
                              booking_id: booking.id,
                              status: 'requested',
                            });
                          }}
                          style={{flexDirection: 'row', marginVertical: 20}}
                          key={booking.id}>
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
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <RoundButton
                            title="Decline"
                            theme="negative"
                            style={styles.subBtn}
                            onPress={() => {
                              this.setState({
                                loading: true,
                              });
                              this.props.dispatch({
                                type: actionTypes.UPDATE_BOOKING,
                                payload: {
                                  booking_id: booking.id,
                                  booking: {
                                    status: 'declined',
                                    decline_message: '',
                                  },
                                },
                              });
                            }}
                          />
                          <RoundButton
                            title="Accept"
                            theme="primary"
                            style={styles.subBtn}
                            onPress={() => {
                              this.setState({loading: true});
                              this.props.dispatch({
                                type: actionTypes.UPDATE_BOOKING,
                                payload: {
                                  booking_id: booking.id,
                                  booking: {
                                    status: 'approved',
                                  },
                                },
                              });
                            }}
                          />
                        </View>
                      </>
                    ))}
                  </ScrollView>
                </View>
              </ScrollableTabView>
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
    marginBottom: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  contentView: {
    width: '90%',
  },
  subBtn: {
    width: '48%',
  },
  item: {
    flex: 1,
    alignItems: 'flex-start',
  },
  requestItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    getBookingsStatus: state.booking.getBookingsStatus,
    updateBookingStatus: state.booking.updateBookingStatus,
    bookings: state.booking.bookings,
    errorMessage: state.booking.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HostDashboardScreen);

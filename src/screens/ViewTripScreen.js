import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  LogBox,
  Image,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Label from '../components/Label';
import RoundButton from '../components/RoundButton';
import TopNavBar from '../components/TopNavBar';
import SeparatorLine from '../components/SeparatorLine';
import ConfirmLabel from '../components/ConfirmLabel';
import LoadingOverlay from '../components/LoadingOverlay';
import Avatar from '../components/Avatar';

import actionTypes from '../actions/actionTypes';

import {Status, fancyTimeOptions} from '../constants';

import {numberWithCommas, ToDateOne} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class ViewTripScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.getBookingStatus !== this.props.getBookingStatus) {
      if (this.props.getBookingStatus === Status.SUCCESS) {
        this.onGetSuccess();
      } else if (this.props.getBookingStatus === Status.FAILURE) {
        this.onGetFailure(this.props.errorMessage);
      }
    }
    if (prevProps.updateBookingStatus !== this.props.updateBookingStatus) {
      if (this.props.updateBookingStatus === Status.SUCCESS) {
        this.onUpdateSuccess();
      } else if (this.props.updateBookingStatus === Status.FAILURE) {
        this.onUpdateFailure(this.props.errorMessage);
      }
    }
  }

  onGetSuccess() {
    this.setState({loading: false});
  }

  onUpdateSuccess() {
    this.setState({loading: false});
    this.props.navigation.navigate('MyTrip');
  }

  onUpdateFailure(errorMessage) {
    this.setState({loading: false});
    Toast.show({
      type: 'error',
      text1: 'Notification',
      text2: errorMessage,
    });
  }

  onGetFailure(errorMessage) {
    this.setState({loading: false});
    Toast.show({
      type: 'error',
      text1: 'Notification',
      text2: errorMessage,
    });
  }

  onDestroy() {
    this.setState({loading: true});
    this.props.dispatch({
      type: actionTypes.UPDATE_BOOKING,
      payload: {
        hosting: 1,
        booking_id: this.props.booking.id,
        booking: {
          status: 'cancelled_by_guest',
        },
      },
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_BOOKING,
      payload: {hosting: 1, booking_id: this.props.route.params.booking_id},
    });
  }

  render() {
    const {hosting = 0} = this.props.route.params;
    const {booking} = this.props;
    let hold_date =
      booking !== null ? new Date(booking.date) - 60 * 60 * 24 * 1000 : '';
    let total =
      booking !== null
        ? booking.boat.price * booking.duration_in_hours + booking.service_fee
        : 0;
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {this.state.loading ? (
            <LoadingOverlay />
          ) : (
            <>
              {hosting === 0 && booking.status === 'approved' && (
                <TopNavBar
                  title="My Trip"
                  leftButton="back"
                  rightButton="close"
                  onBack={() => this.props.navigation.navigate('MyTrip')}
                  onClose={() => this.onDestroy()}
                />
              )}
              {hosting === 0 && booking.status === 'progressing' && (
                <TopNavBar
                  title="My Trip"
                  leftButton="back"
                  onBack={() => this.props.navigation.navigate('MyTrip')}
                />
              )}
              {hosting === 0 && booking.status === 'completed' && (
                <TopNavBar title="Trip Finished!" />
              )}
              {hosting === 1 && booking.status === 'approved' && (
                <TopNavBar
                  title="Booking Request"
                  leftButton="back"
                  onBack={() => this.props.navigation.navigate('HostBooking')}
                />
              )}
              {hosting === 1 && booking.status === 'completed' && (
                <TopNavBar
                  title="Trip Complete!"
                  leftButton="back"
                  onBack={() => this.props.navigation.navigate('HostBooking')}
                />
              )}
              <View style={styles.container}>
                <View style={styles.contentView}>
                  <ScrollView style={styles.flex}>
                    {hosting === 0 && booking.status !== 'completed' && (
                      <ConfirmLabel title="Thank you for trusting Lake Hop!" />
                    )}
                    <SeparatorLine margin={5} />
                    <View>
                      <View style={{flexDirection: 'row', marginVertical: 5}}>
                        <Image
                          style={{width: 80, height: 65}}
                          source={{
                            uri: booking.boat.cover_photo,
                          }}
                        />
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginLeft: 20,
                          }}>
                          <Label
                            title={booking.boat.make + ' ' + booking.boat.model}
                            size={14}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View style={{paddingRight: 10}}>
                              <Avatar
                                size={25}
                                src={booking.user.profile_picture}
                              />
                            </View>
                            <Label title={booking.user.full_name} size={14} />
                          </View>
                        </View>
                      </View>
                    </View>
                    <SeparatorLine margin={5} />
                    <View>
                      <View
                        style={{alignItems: 'flex-start', marginVertical: 5}}>
                        <Label title="Location" size={14} />
                        <Label title={booking.marina.full_name} size={14} />
                      </View>
                    </View>
                    <SeparatorLine margin={5} />
                    <View>
                      <View style={{flexDirection: 'row', marginVertical: 5}}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Date" size={14} />
                          <Label title={booking.date_string} size={14} />
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Time" size={14} />
                          <Label
                            title={fancyTimeOptions[booking.start_time]}
                            size={14}
                          />
                        </View>
                      </View>
                    </View>
                    <SeparatorLine margin={5} />
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'flex-start',
                        marginVertical: 5,
                      }}>
                      <Label
                        title="Payment"
                        size={14}
                        style={{marginVertical: 5}}
                      />
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Label
                          title={`$${numberWithCommas(booking.boat.price)} x ${
                            booking.duration_in_hours
                          } Hours`}
                          size={14}
                        />
                        <Label
                          title={`$${numberWithCommas(
                            booking.boat.price * booking.duration_in_hours,
                          )}`}
                          size={14}
                        />
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 5,
                        }}>
                        <Label title="Security Deposit" size={14} />
                        <View style={{alignItems: 'flex-end'}}>
                          <Label
                            title={`$${numberWithCommas(
                              booking.security_deposit,
                            )}`}
                            size={14}
                          />
                          <Text style={{fontSize: 10}}>
                            {`*placing hold until ${ToDateOne(hold_date)}`}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 5,
                        }}>
                        <Label title="Fuel" size={14} />
                        <Label title="Included" size={14} />
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 5,
                        }}>
                        <Label title="Captain" size={14} />
                        <Label title="Included" size={14} />
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 5,
                        }}>
                        <Label title="Insurance" size={14} />
                        <Label title="Included" size={14} />
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 5,
                        }}>
                        <Label title="Service Fee" size={14} />
                        <Label title={`$${booking.service_fee}`} size={14} />
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 20,
                          marginVertical: 5,
                        }}>
                        <View style={{alignItems: 'flex-start'}}>
                          <Label title="Total Due" size={14} />
                          <Text style={{fontSize: 10}}>
                            (when booking is approved)
                          </Text>
                        </View>
                        <Label
                          title={`$${numberWithCommas(total)}`}
                          size={14}
                        />
                      </View>
                    </View>
                  </ScrollView>
                  {hosting === 0 && booking.status === 'completed' && (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <RoundButton
                        title="Back to Home"
                        theme="dark_sky"
                        style={{marginTop: 20, flex: 1}}
                        onPress={() =>
                          this.props.navigation.navigate('TravelHome')
                        }
                      />
                      <View style={{width: 20}} />
                      <RoundButton
                        title="Share"
                        theme="orange"
                        style={{marginTop: 20, flex: 1}}
                        onPress={() => {}}
                      />
                    </View>
                  )}
                  {hosting === 0 && booking.status === 'completed' && (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <RoundButton
                        title="Review Your Trip"
                        theme="main"
                        style={{marginTop: 20, flex: 1}}
                        onPress={() => this.props.navigation.navigate('Review')}
                      />
                      <View style={{width: 20}} />
                      <RoundButton
                        title="Share"
                        theme="orange"
                        style={{marginTop: 20, flex: 1}}
                        onPress={() => {}}
                      />
                    </View>
                  )}
                  {hosting === 1 && booking.status === 'approved' && (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <RoundButton
                        title="Decline"
                        theme="negative"
                        style={styles.flex}
                        arrow="no"
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
                      <View style={{width: 20}} />
                      <RoundButton
                        title="Accept"
                        theme="primary"
                        style={styles.flex}
                        arrow="yes"
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
                  )}
                </View>
              </View>
            </>
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
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },

  contentView: {
    justifyContent: 'flex-start',
    marginBottom: 80,
    marginTop: 20,
    width: '90%',
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    getBookingStatus: state.booking.getBookingStatus,
    updateBookingStatus: state.booking.updateBookingStatus,
    booking: state.booking.booking,
    errorMessage: state.booking.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTripScreen);

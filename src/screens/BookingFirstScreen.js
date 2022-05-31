import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import RoundButton from '../components/RoundButton';
import TopNavBar from '../components/TopNavBar';
import SeparatorLine from '../components/SeparatorLine';
import LoadingOverlay from '../components/LoadingOverlay';

import {numberWithCommas, ToDateTwo} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status, timeOptions} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function available(timeIncrements, boat_times, date = undefined) {
  if (!date) {
    return timeIncrements.reduce((tis, inc) => {
      tis.push({duration: inc});
      return tis;
    }, []);
  } else {
    return timeIncrements.reduce((tis, inc) => {
      const btms = boat_times[inc];
      if (btms && btms.length > 0)
        tis.push({
          duration: inc,
          min: Math.min(...btms),
          max: Math.max(...btms),
        });
      return tis;
    }, []);
  }
}

function timeRange(min, max) {
  if (min == max) {
    return `Start Times: ${timeOptions[min]}`;
  } else {
    return `Start Times: ${timeOptions[min]} - ${timeOptions[max]}`;
  }
}

class BookingFirstScreen extends Component {
  constructor(props) {
    super(props);
    const {boat} = props;
    let times = Object.keys(boat.time_increments).filter(
      time => boat.time_increments[time] && time,
    );
    this.state = {
      date: new Date(),
      step: -1,
      location: 0,
      steps: times.map(time => ({hours: time, price: boat.price * time})),
      locations: boat.locations.map(
        location => location.lake_name + ' - ' + location.marina_name,
      ),
      filet_package: false,
      media_package: false,
      loading: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      this.props.dispatch({
        type: actionTypes.GET_BOAT_TIMES,
        payload: {
          boat_id: this.props.boat.id,
          date: ToDateTwo(this.state.date),
        },
      });
    }
    if (prevProps.getBoatTimesStatus !== this.props.getBoatTimesStatus) {
      if (this.props.getBoatTimesStatus === Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.getBoatTimesStatus === Status.FAILURE) {
        this.onFailure(this.props.errorBoatMessage);
      }
    }
    if (prevProps.createBookingStatus !== this.props.createBookingStatus) {
      if (this.props.createBookingStatus === Status.SUCCESS) {
        this.createBookingSuccess();
      } else if (this.props.createBookingStatus === Status.FAILURE) {
        this.createBookingFailure();
      }
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_BOAT_TIMES,
      payload: {
        boat_id: this.props.boat.id,
        date: ToDateTwo(this.state.date),
      },
    });
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

  createBookingSuccess() {
    this.setState({loading: false});
    this.props.navigation.navigate('BookingSecond', {
      duration_in_hours: this.state.duration_in_hours,
      filet_package: this.state.filet_package,
      media_package: this.state.media_package,
    });
  }

  createBookingFailure() {
    this.setState({loading: false});
    Toast.show({
      type: 'error',
      text1: 'Notification',
      text2: this.props.errorBookingMessage,
    });
  }

  onSelectDate(date) {
    this.setState({date, step: -1});
  }

  onSelectStep(step) {
    this.setState({step});
  }

  onSelectLocation(location) {
    this.setState({location});
  }

  onContinue() {
    if (this.state.step === -1) {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: 'Please select a duration.',
      });
      return;
    }

    const {boat, boat_times} = this.props;

    const timeIncrements = Object.keys(boat.time_increments).filter(
      key => boat.time_increments[key],
    );
    const steps = available(
      timeIncrements,
      boat_times,
      ToDateTwo(this.state.date),
    );
    this.setState({
      loading: true,
      duration_in_hours: steps[this.state.step].duration,
    });

    this.props.dispatch({
      type: actionTypes.CREATE_BOOKING,
      payload: {
        booking: {
          duration_in_hours: steps[this.state.step].duration,
          marina_id: boat.locations[this.state.location].marina_id,
          date: this.state.date,
          boat_id: boat.id,
        },
      },
    });
  }

  render() {
    const {boat, boat_times} = this.props;

    const timeIncrements = boat
      ? Object.keys(boat.time_increments).filter(
          key => boat.time_increments[key],
        )
      : {};
    const steps = boat_times
      ? available(timeIncrements, boat_times, ToDateTwo(this.state.date))
      : [];

    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            title="Booking"
            leftButton="back"
            onBack={() => {
              this.props.navigation.navigate('Boat');
            }}
          />
          {this.state.loading ? (
            <LoadingOverlay />
          ) : (
            <View style={styles.container}>
              <View style={styles.formView}>
                <View style={{width: '100%', alignItems: 'flex-start'}}>
                  <Label title="Date" />
                  <CustomInput
                    type="date"
                    value={this.state.date}
                    style={{width: '100%'}}
                    minimumDate={new Date()}
                    onChange={date => this.onSelectDate(date)}
                  />
                </View>
                <View style={{width: '100%', alignItems: 'flex-start'}}>
                  <Label title="Select Location" />
                  <CustomInput
                    type="select"
                    data={this.state.locations}
                    value={this.state.location}
                    onChange={index => this.onSelectLocation(index)}
                  />
                </View>
              </View>
              <SeparatorLine margin={5} />
              <View style={styles.contentView}>
                <ScrollView>
                  {steps.length ? (
                    steps.map((step, index) => (
                      <TouchableOpacity
                        key={step.duration}
                        style={[
                          styles.cardView,
                          this.state.step === index && styles.selected,
                        ]}
                        onPress={() => this.onSelectStep(index)}>
                        <View style={styles.cardSubView}>
                          <Label title={step.duration + ' hours'} />
                          <Label
                            title={
                              '$' + numberWithCommas(boat.price * step.duration)
                            }
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Label
                            title={timeRange(step.min, step.max)}
                            color="#6B6B6B"
                            size={12}
                          />
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Label title="No Schedule" />
                  )}
                </ScrollView>
              </View>
              <SeparatorLine margin={5} />
              <View>
                <Label title="Additional Services" align="left" />
                {boat.filet_package && (
                  <TouchableOpacity
                    style={[
                      styles.block,
                      this.state.filet_package && styles.blockchecked,
                    ]}
                    onPress={() =>
                      this.setState({filet_package: !this.state.filet_package})
                    }>
                    <Label
                      title={`Filet/Clean Fish Package - $${numberWithCommas(
                        boat.filet_package_price,
                      )}`}
                      align="left"
                    />
                    {this.state.filet_package && (
                      <View style={styles.checked} />
                    )}
                  </TouchableOpacity>
                )}
                {boat.media_package && (
                  <TouchableOpacity
                    style={[
                      styles.block,
                      this.state.media_package && styles.blockchecked,
                    ]}
                    onPress={() =>
                      this.setState({media_package: !this.state.media_package})
                    }>
                    <Label
                      title={`Photo/Video Package - $${numberWithCommas(
                        boat.media_package_price,
                      )}`}
                      align="left"
                    />
                    {this.state.media_package && (
                      <View style={styles.checked} />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <View style={{height: 100, width: '100%'}}>
                <RoundButton
                  title="Continue Booking"
                  arrow="right"
                  theme="main"
                  onPress={() => this.onContinue()}
                />
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  formView: {
    width: '100%',
    marginVertical: 10,
  },

  contentView: {
    flex: 1,
  },

  cardView: {
    marginHorizontal: 5,
    backgroundColor: 'white',
    padding: 15,
    elevation: 3,
    shadowColor: '#52006A',
    marginVertical: 10,
  },

  selected: {
    borderWidth: 2,
    borderColor: '#4DC3CC',
  },

  cardSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#F6F6F6',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  blockchecked: {
    borderColor: '#4DC3CC',
  },

  checked: {
    backgroundColor: '#4DC3CC',
    width: 15,
    height: 15,
    borderRadius: 10,
    position: 'absolute',
    right: 20,
  },
});

function mapStateToProps(state) {
  return {
    getBoatTimesStatus: state.boat.getBoatTimesStatus,
    createBookingStatus: state.booking.createBookingStatus,
    boat_times: state.boat.boat_times,
    boat: state.boat.boat,
    errorBoatMessage: state.boat.errorMessage,
    errorBookingMessage: state.booking.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingFirstScreen);

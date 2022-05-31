import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import RoundButton from '../components/RoundButton';
import TopNavBar from '../components/TopNavBar';
import SeparatorLine from '../components/SeparatorLine';

import {fancyTimeOptions} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class BookingSecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      guest: 0,
      goal: '',
    };
  }

  startTimeOptions() {
    const {boat_times} = this.props;
    const {duration_in_hours} = this.props.route.params;
    if (boat_times[duration_in_hours]) {
      return Object.keys(fancyTimeOptions).reduce((acc, key) => {
        if (boat_times[duration_in_hours].includes(parseInt(key)))
          acc[key] = fancyTimeOptions[key];
        return acc;
      }, {});
    } else {
      return {};
    }
  }

  onSelectTime(startTime) {
    this.setState({startTime});
  }

  onSelectGuest(guest) {
    this.setState({guest});
  }

  onGoalChange(goal) {
    this.setState({goal});
  }

  onContinue() {
    if (!this.state.goal.length) {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: 'Please fill the gap.',
      });
      return;
    }
    const newDate = new Date(this.props.route.params.date);
    newDate.setHours(this.state.startTime);
    this.props.navigation.navigate('BookingThird', {
      ...this.props.route.params,
      date: newDate,
      number_of_guests: this.state.guest + 1,
      goal_for_trip: this.state.goal,
    });
  }

  render() {
    const {boat} = this.props;
    const timeOptions = this.startTimeOptions();
    const tOptions = Object.keys(timeOptions).map(
      option => timeOptions[option],
    );
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            title="Booking"
            leftButton="back"
            onBack={() => {
              this.props.navigation.navigate('BookingFirst', {
                ...this.props.route.params,
              });
            }}
          />
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={styles.formView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Label title="Start Time" />
                    <CustomInput
                      type="select"
                      value={this.state.startTime}
                      data={tOptions}
                      onChange={startTime => this.onSelectTime(startTime)}
                    />
                  </View>
                  <View style={{width: 20}} />
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Label title="Number of Guests" />
                    <CustomInput
                      type="select"
                      data={Array.from(
                        {length: boat.guest_count},
                        (_, i) => i + 1,
                      )}
                      value={this.state.guest}
                      onChange={guest => this.onSelectGuest(guest)}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  paddingHorizontal: 20,
                }}>
                <Label title="Your goal for the trip" />
                <Label
                  color="#707070"
                  size={12}
                  align="left"
                  title="Write a short message explaining your goal for the trip, whether it’s a specific activity or something you’d like to learn. This is important for the host to make the right preparations to make this trip great!"
                />
                <CustomInput
                  type="textarea"
                  placeholder="Start writing here"
                  style={{height: 300}}
                  onChange={goal => this.onGoalChange(goal)}
                />
                <SeparatorLine />
              </View>

              <View style={styles.contentView}>
                <View style={{marginVertical: 10, alignItems: 'flex-start'}}>
                  <Label title="Guest Requirements" />
                  <Label
                    color="#707070"
                    size={13}
                    title="Up to 10 guests can attend."
                  />
                </View>
                <View style={{marginVertical: 10, alignItems: 'flex-start'}}>
                  <Label title="Cancellation Policy" />
                  <Label
                    color="#707070"
                    size={13}
                    align="left"
                    title="If confirmed, you are able to cancel for a full refund up to 24 hours before the experience."
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View
              style={{
                height: 100,
                width: '90%',
              }}>
              <RoundButton
                title="Continue Booking"
                theme="main"
                arrow="right"
                onPress={() => this.onContinue()}
              />
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  formView: {
    width: '100%',
    marginVertical: 30,
    paddingHorizontal: 20,
  },

  contentView: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },

  cardView: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 2,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#52006A',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

function mapStateToProps(state) {
  return {
    boat_times: state.boat.boat_times,
    boat: state.boat.boat,
    newBooking: state.booking.newBooking,
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
)(BookingSecondScreen);

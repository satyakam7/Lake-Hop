import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, LogBox, ScrollView} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import dateFormat from 'dateformat';

import TopNavBar from '../components/TopNavBar';
import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import CustomSwitch from '../components/CustomSwitch';
import RoundButton from '../components/RoundButton';
import LoadingOverlay from '../components/LoadingOverlay';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const times = [
  '12AM',
  '1AM',
  '2AM',
  '3AM',
  '4AM',
  '5AM',
  '6AM',
  '7AM',
  '8AM',
  '9AM',
  '10AM',
  '11AM',
  '12PM',
  '1PM',
  '2PM',
  '3PM',
  '4PM',
  '5PM',
  '6PM',
  '7PM',
  '8PM',
  '9PM',
  '10PM',
  '11PM',
];

function getDates(weekdays, weekends) {
  var dateArray = new Array();
  var startDate = new Date();
  var currentDate = new Date();
  while (currentDate.getMonth() === startDate.getMonth()) {
    if (
      weekdays === false &&
      1 <= currentDate.getDay() &&
      currentDate.getDay() <= 5
    )
      dateArray.push(new Date(currentDate));
    if (
      weekends === false &&
      (currentDate.getDay() === 0 || currentDate.getDay() === 6)
    )
      dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    const {
      weekday_start,
      weekday_end,
      weekend_start,
      weekend_end,
      available_weekdays,
      available_weekends,
    } = props.currentUser;
    this.state = {
      loading: false,
      weekday_start,
      weekday_end,
      weekend_start,
      weekend_end,
      available_weekdays,
      available_weekends,
    };

    LocaleConfig.locales['en'] = {
      monthNames: [
        'January',
        'Febrary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dev',
      ],
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    };
    LocaleConfig.defaultLocale = 'en';
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.updateBoatDatesStatus != this.props.updateBoatDatesStatus) {
      if (this.props.updateBoatDatesStatus == Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.updateBoatDatesStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onSave() {
    const {
      weekday_start,
      weekday_end,
      weekend_start,
      weekend_end,
      available_weekdays,
      available_weekends,
    } = this.state;
    this.setState({loading: true});
    this.props.dispatch({
      type: actionTypes.UPDATE_BOAT_DATES,
      payload: {
        user_id: this.props.currentUser.id,
        user: {
          weekday_start,
          weekday_end,
          weekend_start,
          weekend_end,
          available_weekdays,
          available_weekends,
          pro_hopper: false,
          dates: [],
        },
      },
    });
  }

  onSuccess() {
    this.setState({loading: false});
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: 'Timeslots is set.',
    });
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
    const {available_weekdays, available_weekends, loading} = this.state;
    let temp = getDates(available_weekdays, available_weekends);
    let markedDates = {};
    temp.map(date => {
      markedDates[dateFormat(date, 'yyyy-mm-dd')] = {textColor: '#d9e1e8'};
    });
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {loading && <LoadingOverlay />}
          <TopNavBar title="Calendar" />
          <View style={styles.container}>
            <View style={styles.contentView}>
              <ScrollableTabView
                style={{marginTop: 20}}
                initialPage={1}
                renderTabBar={() => <DefaultTabBar />}
                tabBarUnderlineStyle={{
                  backgroundColor: '#4DC3CC',
                }}>
                <View style={{paddingTop: 20}} tabLabel="Timeslots">
                  <ScrollView>
                    <Label
                      title="Editing your calendar is easy - select your default availabilities below and set the time windows for each. If you’d like to block certain days or months, you can do so by clicking on the day or month in the calendar."
                      align="left"
                    />
                    <Label
                      title="As a default, bookings cannot be made over a year in advance, so you’re calendar will be blocked out past then."
                      align="left"
                    />
                    <Label
                      title="You can always make changes after you publish."
                      align="left"
                    />
                    <View
                      style={{
                        width: '100%',
                        height: 120,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}>
                        <View style={{padding: 20}}>
                          <Label title={'1'} size={40} />
                        </View>
                        <Label title="Available" />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}>
                        <View
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 30,
                            borderWidth: 1,
                            borderColor: '#1C394A',
                            backgroundColor: '#909090',
                            borderRadius: 100,
                          }}>
                          <Label title={'1'} size={40} />
                        </View>
                        <Label title="Booked" />
                      </View>
                    </View>

                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 10,
                        }}>
                        <CustomSwitch
                          value={this.state.available_weekdays}
                          onChange={available_weekdays =>
                            this.setState({available_weekdays})
                          }
                        />
                        <Label
                          title="I'm available on weekdays"
                          style={{marginLeft: 20}}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <CustomInput
                          type="select"
                          style={styles.flex}
                          data={times}
                          value={this.state.weekday_start}
                          onChange={weekday_start =>
                            this.setState({weekday_start})
                          }
                        />
                        <Label title="to" style={{width: 40}} />
                        <CustomInput
                          type="select"
                          style={styles.flex}
                          data={times}
                          value={this.state.weekday_end}
                          onChange={weekday_end => this.setState({weekday_end})}
                        />
                      </View>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 10,
                        }}>
                        <CustomSwitch
                          value={this.state.available_weekends}
                          onChange={available_weekends =>
                            this.setState({available_weekends})
                          }
                        />
                        <Label
                          title="I'm available on weekends"
                          style={{marginLeft: 20}}
                        />
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CustomInput
                          type="select"
                          style={styles.flex}
                          data={times}
                          value={this.state.weekend_start}
                          onChange={weekend_start =>
                            this.setState({weekend_start})
                          }
                        />
                        <Label title="to" style={{width: 40}} />
                        <CustomInput
                          type="select"
                          style={styles.flex}
                          data={times}
                          value={this.state.weekend_end}
                          onChange={weekend_end => this.setState({weekend_end})}
                        />
                      </View>
                    </View>
                    <View>
                      <RoundButton
                        theme="main"
                        style={styles.flex}
                        title="Save"
                        onPress={() => this.onSave()}
                      />
                    </View>
                  </ScrollView>
                </View>
                <View style={{paddingTop: 20}} tabLabel="Calendar">
                  <Calendar
                    minDate={new Date().toString()}
                    markingType={'period'}
                    markedDates={markedDates}
                    hideArrows={true}
                    hideExtraDays={true}
                  />
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
});

function mapStateToProps(state) {
  return {
    updateBoatDatesStatus: state.user.updateBoatDatesStatus,
    currentUser: state.user.currentUser,
    errorMessage: state.user.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);

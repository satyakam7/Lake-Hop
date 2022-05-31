import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  LogBox,
  Image,
} from 'react-native';

import Label from '../components/Label';
import RoundButton from '../components/RoundButton';
import TopNavBar from '../components/TopNavBar';
import SeparatorLine from '../components/SeparatorLine';
import Avatar from '../components/Avatar';

import {ToDate, ToTime, numberWithCommas, ToDateOne} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {boat, date, hourly, location, filet_service, media_service} =
      this.props.route.params;
    let total_amount =
      hourly.price * hourly.hours + boat.security_deposit_amount;
    if (filet_service) total_amount += boat.filet_package_price;
    if (media_service) total_amount += boat.media_package_price;
    let service_fee = total_amount / 10;
    total_amount += service_fee;

    let hold_date = date.getTime() - 60 * 60 * 24 * 1000;
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            title="Payment"
            leftButton="back"
            onBack={() => {
              this.props.navigation.navigate('BookingThird', {
                ...this.props.route.params,
              });
            }}
          />
          <View style={styles.container}>
            <View style={styles.contentView}>
              <View>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <Image
                    style={{width: 80, height: 65}}
                    source={{
                      uri: boat.cover_photo,
                    }}
                  />
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginLeft: 20,
                    }}>
                    <Label title={boat.make + ' ' + boat.model} size={14} />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View style={{paddingRight: 10}}>
                        <Avatar size={25} src={boat.user.profile_picture_url} />
                      </View>
                      <Label title={boat.user.full_name} size={14} />
                    </View>
                  </View>
                </View>
              </View>
              <SeparatorLine margin={5} />
              <View>
                <View style={{alignItems: 'flex-start', marginVertical: 5}}>
                  <Label title="Location" size={14} />
                  <Label
                    title={
                      boat.locations[location].marina_name +
                      ', ' +
                      boat.locations[location].lake_name +
                      ', ' +
                      boat.locations[location].city +
                      ', ' +
                      boat.locations[location].state
                    }
                    size={14}
                  />
                </View>
              </View>
              <SeparatorLine margin={5} />
              <View>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Label title="Date" size={14} />
                    <Label title={ToDate(date)} size={14} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Label title="Time" size={14} />
                    <Label title={ToTime(date)} size={14} />
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
                <Label title="Payment" size={14} style={{marginVertical: 5}} />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Label
                    title={`$${numberWithCommas(hourly.price)} x ${
                      hourly.hours
                    } Hours`}
                    size={14}
                  />
                  <Label
                    title={`$${numberWithCommas(hourly.price * hourly.hours)}`}
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
                        boat.security_deposit_amount,
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
                  <Label
                    title={`$${numberWithCommas(service_fee)}`}
                    size={14}
                  />
                </View>
                {filet_service && (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                    }}>
                    <Label title="Filet/Clean Fish Package" size={14} />
                    <Label title={`$${boat.filet_package_price}`} size={14} />
                  </View>
                )}
                {media_service && (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                    }}>
                    <Label title="Photo/Video Package" size={14} />
                    <Label title={`$${boat.media_package_price}`} size={14} />
                  </View>
                )}

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Label title="Discount" size={14} />
                  <Label title="5% - $56.25" size={14} />
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
                    title={`$${numberWithCommas(total_amount)}`}
                    size={14}
                  />
                </View>
              </View>
              <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                <RoundButton
                  title="Confirm and Pay"
                  theme="orange"
                  arrow="right"
                  style={{marginTop: 20}}
                  onPress={() =>
                    this.props.navigation.navigate('CompletedReservation', {
                      ...this.props.route.params,
                    })
                  }
                />
              </View>
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

  fixedView: {
    height: 150,
    alignItems: 'center',
    borderTopColor: '#E2E2E2',
    backgroundColor: 'white',
    width: '100%',
    borderTopWidth: 1,
  },
});

export default PaymentScreen;

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
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';
import SeparatorLine from '../components/SeparatorLine';
import LoadingOverlay from '../components/LoadingOverlay';

import {ConstantStore, numberWithCommas} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const security_deposit_amounts = [100, 200, 300, 400, 500];
class PricingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time_increments: {
        2: false,
        3: false,
        4: false,
        6: false,
        8: false,
      },
      price: 0,
      security_deposit_amount: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    const {time_increments, price} = JSON.parse(
      await ConstantStore.getItem('newBoat'),
    );
    if (time_increments !== undefined) {
      this.setState({time_increments});
    }
    this.setState({
      price: price === undefined ? 0 : price,
    });
  }

  async onSave() {
    let newBoat = JSON.parse(await ConstantStore.getItem('newBoat'));
    newBoat = {...newBoat, ...this.state};
    await ConstantStore.setItem('newBoat', JSON.stringify(newBoat));
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: 'Successful Save!',
    });
  }

  async onContinue() {
    if (this.state.price <= 0) {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: 'Please input the price.',
      });
      return;
    } else {
      const {time_increments} = this.state;
      if (
        Object.keys(time_increments).some(
          time => time_increments[time] === true,
        ) === false
      ) {
        Toast.show({
          type: 'info',
          text1: 'Notification',
          text2: 'Please select at least one time increment.',
        });
        return;
      }
    }

    this.setState({loading: true});
    const {time_increments, price, security_deposit_amount} = this.state;
    this.props.dispatch({
      type: actionTypes.UPDATE_BOAT,
      payload: {
        boat_id: await ConstantStore.getItem('new_boat_id'),
        boat: {
          time_increments,
          price,
          security_deposit_amount:
            security_deposit_amounts[security_deposit_amount],
        },
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updateBoatStatus !== this.props.updateBoatStatus) {
      if (this.props.updateBoatStatus === Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.updateBoatStatus === Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onSuccess() {
    this.setState({loading: false});
    this.onSave();
    this.props.navigation.navigate('Photos');
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
    const {time_increments} = this.state;
    let items = Object.keys(time_increments);
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - Pricing"
            onBack={() => this.props.navigation.navigate('GuestsShouldBring')}
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <Label title="Base price per hour" align="left" />
              <Label
                title="A 15% listing fee is deducted from every host's price—but sometime_increments the amount will vary, depending on the length of the trip."
                align="left"
                size={12}
              />
              <View style={styles.rowView}>
                <CustomInput
                  type="price"
                  style={styles.flex}
                  value={this.state.price.toString()}
                  onChange={price => this.setState({price})}
                />
                <View style={{width: 40}} />
                <Label
                  title={`You earn: $${numberWithCommas(
                    Math.floor(this.state.price * 0.85),
                  )}`}
                />
              </View>
              <SeparatorLine />
              <Label
                title="Select which time increments you’d like to offer:"
                align="left"
              />
              <ScrollView>
                <View style={styles.blockGroup}>
                  {items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.block,
                        time_increments[item] ? styles.blockchecked : {},
                      ]}
                      onPress={() => {
                        time_increments[item] = !time_increments[item];
                        this.setState({time_increments});
                      }}>
                      <Label title={item + ' Hours'} align="left" />
                      {time_increments[item] && <View style={styles.checked} />}
                    </TouchableOpacity>
                  ))}
                </View>
                <View>
                  <Label title="Security Deposit" align="left" />
                  <Label
                    title="Please select a security deposit amount that you will be eligible for in case of damage. For best practices and to provide the best experiences to guests, we recommend choosing a security deposit less than your booking price. The amount below will be held on the guest's card until the trip is complete."
                    align="left"
                    size={14}
                  />
                  <CustomInput
                    type="select"
                    data={security_deposit_amounts.map(amount => '$' + amount)}
                    value={this.state.security_deposit_amount}
                    onChange={security_deposit_amounts =>
                      this.setState({security_deposit_amounts})
                    }
                  />
                </View>
              </ScrollView>
              <View style={styles.buttonGroup}>
                <RoundButton
                  title="Save"
                  theme="dark_sky"
                  style={styles.flex}
                  onPress={() => this.onSave()}
                />
                <View style={styles.space} />
                <RoundButton
                  title="Continue"
                  theme="main"
                  arrow="right"
                  style={styles.flex}
                  onPress={() => this.onContinue()}
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
    marginBottom: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  contentView: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  blockGroup: {
    flex: 1,
    marginVertical: 10,
  },

  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#F6F6F6',
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  blockchecked: {
    borderColor: '#4DC3CC',
  },

  image: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },

  checked: {
    backgroundColor: '#4DC3CC',
    width: 15,
    height: 15,
    borderRadius: 10,
    position: 'absolute',
    right: 20,
  },

  space: {
    width: 20,
  },

  rowView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    updateBoatStatus: state.boat.updateBoatStatus,
    errorMessage: state.boat.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingScreen);

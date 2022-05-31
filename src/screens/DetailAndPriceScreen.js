import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';

import {ConstantStore} from '../functions';

import {boatTypes, Status} from '../constants';

import actionTypes from '../actions/actionTypes';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class DetailAndPriceScreen extends Component {
  constructor() {
    super();
    this.state = {
      year: '',
      length: '',
      guest_count: '',
      make: '',
      model: '',
      boat_type: 0,
      rental: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    let newBoat = await ConstantStore.getItem('newBoat');
    if (newBoat === undefined || newBoat === null) {
      newBoat = '{}';
    }
    const {year, length, guest_count, make, model, boat_type, rental} =
      JSON.parse(newBoat);
    this.setState({
      year: year === undefined ? '' : year,
      length: length === undefined ? '' : length,
      guest_count: guest_count === undefined ? '' : guest_count,
      make: make === undefined ? '' : make,
      model: model === undefined ? '' : model,
      boat_type: boat_type === undefined ? 0 : boat_type,
      rental: rental === undefined ? 0 : rental,
    });
  }

  async onSave() {
    let newBoat = await ConstantStore.getItem('newBoat');
    newBoat = newBoat === undefined ? {} : JSON.parse(newBoat);
    const {boat_type, year, length, guest_count, make, model, rental} =
      this.state;
    await ConstantStore.setItem(
      'newBoat',
      JSON.stringify({
        ...newBoat,
        boat_type: boatTypes[Object.keys(boatTypes)[boat_type]],
        year,
        length,
        guest_count,
        make,
        model,
        rental,
      }),
    );
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: 'Successful Save!',
    });
  }

  async onContinue() {
    const new_boat_id = await ConstantStore.getItem('new_boat_id');
    if (new_boat_id === undefined || new_boat_id === null) {
      this.setState({loading: true});
      const {year, length, guest_count, make, model, boat_type, rental} =
        this.state;
      this.props.dispatch({
        type: actionTypes.CREATE_BOAT,
        payload: {
          boat: {
            year,
            length,
            guest_count,
            make,
            model,
            boat_type: boatTypes[Object.keys(boatTypes)[boat_type]],
            rental,
          },
        },
      });
    } else {
      this.setState({loading: true});
      const {year, length, guest_count, make, model, boat_type, rental} =
        this.state;
      this.props.dispatch({
        type: actionTypes.UPDATE_BOAT,
        payload: {
          boat_id: new_boat_id,
          boat: {
            year,
            length,
            guest_count,
            make,
            model,
            boat_type: boatTypes[Object.keys(boatTypes)[boat_type]],
            rental,
          },
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.createBoatStatus !== this.props.createBoatStatus) {
      if (this.props.createBoatStatus === Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.createBoatStatus === Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
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
    this.props.navigation.navigate('Location');
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
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - Details and Price"
            onBack={() => this.props.navigation.navigate('HostBooking')}
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <KeyboardAwareScrollView>
                <View style={styles.flex}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.input}>
                      <Label title="Year" />
                      <CustomInput
                        onChange={year => this.setState({year})}
                        type="number"
                        value={this.state.year}
                        onSubmitEditing={() => {
                          this.lengthInput.focus();
                        }}
                      />
                    </View>
                    <View style={{width: 20}} />
                    <View style={styles.input}>
                      <Label title="Length (ft.)" />
                      <CustomInput
                        type="number"
                        onChange={length => this.setState({length})}
                        value={this.state.length}
                        onSubmitEditing={() => {
                          this.guestInput.focus();
                        }}
                        onRefInput={input => {
                          this.lengthInput = input;
                        }}
                      />
                    </View>
                    <View style={{width: 20}} />
                    <View style={styles.input}>
                      <Label title="Guest Count" />
                      <CustomInput
                        type="number"
                        onChange={guest_count => this.setState({guest_count})}
                        value={this.state.guest_count}
                        onSubmitEditing={() => {
                          this.makeInput.focus();
                        }}
                        onRefInput={input => {
                          this.guestInput = input;
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.input}>
                    <Label title="Make" />
                    <CustomInput
                      onChange={make => this.setState({make})}
                      value={this.state.make}
                      onSubmitEditing={() => {
                        this.modelInput.focus();
                      }}
                      onRefInput={input => {
                        this.makeInput = input;
                      }}
                    />
                  </View>
                  <View style={styles.input}>
                    <Label title="Model" />
                    <CustomInput
                      onChange={model => this.setState({model})}
                      value={this.state.model}
                      onRefInput={input => {
                        this.modelInput = input;
                      }}
                    />
                  </View>
                  <View style={styles.input}>
                    <Label title="Boat Type" />
                    <CustomInput
                      type="select"
                      data={Object.keys(boatTypes)}
                      onChange={boat_type => this.setState({boat_type})}
                      value={this.state.boat_type}
                    />
                  </View>
                  <View style={styles.input}>
                    <Label title="Rideshare or Rental?" />
                    <CustomInput
                      type="select"
                      data={['Rideshare', 'Rental']}
                      onChange={rental => this.setState({rental})}
                      value={this.state.rental}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
              <View style={styles.buttonGroup}>
                <RoundButton
                  title="Save"
                  theme="dark_sky"
                  style={styles.flex}
                  onPress={() => this.onSave()}
                />
                <View style={{width: 20}} />
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
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  contentView: {
    flex: 1,
    margin: 20,
  },

  input: {
    flex: 1,
    alignItems: 'flex-start',
  },

  buttonGroup: {
    marginBottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function mapStateToProps(state) {
  return {
    createBoatStatus: state.boat.createBoatStatus,
    updateBoatStatus: state.boat.updateBoatStatus,
    errorMessage: state.boat.errorMessage,
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
)(DetailAndPriceScreen);

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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';
import SeparatorLine from '../components/SeparatorLine';
import LoadingOverlay from '../components/LoadingOverlay';

import {ConstantStore} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const names = {
  air_conditioning: 'Air conditioning',
  anchor: 'Anchor',
  aux_input: 'Stereo Aux Input',
  bathroom: 'Bathroom',
  bluetooth_radio: 'Bluetooth Radio',
  bow_thruster: 'Bow thruster',
  cooler: 'Cooler / Ice chest',
  depth_finder: 'Depth finder',
  fish_finder: 'Fish Finder',
  gps: 'GPS',
  livewell: 'Livewell / Baitwell',
  refridgerator: 'Refridgerator',
  rod_holders: 'Rod holders',
  shower: 'Shower',
  sonar: 'Sonar',
  stereo: 'Stereo',
  swim_ladder: 'Swim Ladder',
  wifi: 'WiFi',
};

class FeaturesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {
        air_conditioning: false,
        anchor: false,
        aux_input: false,
        bathroom: false,
        bluetooth_radio: false,
        bow_thruster: false,
        cooler: false,
        depth_finder: false,
        fish_finder: false,
        gps: false,
        livewell: false,
        refridgerator: false,
        rod_holders: false,
        shower: false,
        sonar: false,
        stereo: false,
        swim_ladder: false,
        wifi: false,
      },
      filet_package: false,
      media_package: false,
      filet_package_price: 0,
      media_package_price: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    const {
      features,
      filet_package,
      media_package,
      filet_package_price,
      media_package_price,
    } = JSON.parse(await ConstantStore.getItem('newBoat'));
    this.setState({
      filet_package: filet_package === undefined ? false : filet_package,
      media_package: media_package === undefined ? false : media_package,
      filet_package_price:
        filet_package_price === undefined ? 0 : filet_package_price,
      media_package_price:
        media_package_price === undefined ? 0 : media_package_price,
    });
    if (features !== undefined && features !== null) {
      this.setState({features});
    }
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
    const {
      features,
      filet_package,
      filet_package_price,
      media_package,
      media_package_price,
    } = this.state;
    let result = {features};
    if (filet_package) {
      result['filet_package'] = '1';
      result['filet_pacakge_price'] = filet_package_price;
    } else result['filet_package'] = '0';
    if (media_package) {
      result['media_package'] = '1';
      result['media_package_price'] = media_package_price;
    } else result['media_package'] = '0';

    result['extra_features'] = '';
    this.setState({loading: true});
    this.props.dispatch({
      type: actionTypes.UPDATE_BOAT,
      payload: {
        boat_id: await ConstantStore.getItem('new_boat_id'),
        boat: result,
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
    this.props.navigation.navigate('Rules');
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
    const {features, filet_package, media_package} = this.state;
    let items = Object.keys(features);
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - Features"
            onBack={() => this.props.navigation.navigate('ActivitiesDetail')}
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <Label title="Features" align="left" />
              <ScrollView style={{marginVertical: 5}}>
                <View style={styles.blockGroup}>
                  {items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.block,
                        features[item] ? styles.blockchecked : {},
                      ]}
                      onPress={() => {
                        features[item] = !features[item];
                        this.setState({features});
                      }}>
                      <Label title={names[item]} align="left" />
                      {features[item] && <View style={styles.checked} />}
                    </TouchableOpacity>
                  ))}

                  <TouchableOpacity
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <Label title="Add Feature" style={{marginRight: 10}} />
                    <FontAwesome5 name="plus" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <SeparatorLine />
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <Label title="Extras (tap to toggle)" />
                  </View>
                  <View style={{width: 20}} />
                  <View style={{flex: 1}}>
                    <Label title="Cost" />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 2}}>
                    <TouchableOpacity
                      style={[
                        styles.block,
                        filet_package ? styles.blockchecked : {},
                      ]}
                      onPress={() => {
                        this.setState({
                          filet_package: !filet_package,
                        });
                      }}>
                      <Label title="Clean/Filet Fish" align="left" />
                      {filet_package && <View style={styles.checked} />}
                    </TouchableOpacity>
                  </View>
                  <View style={{width: 20}} />
                  <View style={{flex: 1}}>
                    <CustomInput
                      type="number"
                      value={this.state.filet_package_price.toString()}
                      onChange={filet_package_price =>
                        this.setState({filet_package_price})
                      }
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 2}}>
                    <TouchableOpacity
                      style={[
                        styles.block,
                        media_package ? styles.blockchecked : {},
                      ]}
                      onPress={() => {
                        this.setState({
                          media_package: !media_package,
                        });
                      }}>
                      <Label title="Photo/Video Package" align="left" />
                      {media_package && <View style={styles.checked} />}
                    </TouchableOpacity>
                  </View>
                  <View style={{width: 20}} />
                  <View style={styles.flex}>
                    <CustomInput
                      type="number"
                      value={this.state.media_package_price.toString()}
                      onChange={media_package_price =>
                        this.setState({media_package_price})
                      }
                    />
                  </View>
                </View>
              </View>
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
    marginVertical: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesScreen);

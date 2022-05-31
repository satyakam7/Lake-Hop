import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  LogBox,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';

import Images from '../theme/Images';

import {ConstantStore} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const names = {
  alcohol: 'Alcohol',
  glass_bottles: 'Glass bottles',
  kids_under_12: 'Kids under 12',
  pets: 'Pets',
  shoes: 'Shoes',
  smoking: 'Smoking',
  swimming: 'Swimming',
};

class RulesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: {
        alcohol: false,
        glass_bottles: false,
        kids_under_12: false,
        pets: false,
        shoes: false,
        smoking: false,
        swimming: false,
      },
      loading: false,
    };
  }

  async componentDidMount() {
    const {rules} = JSON.parse(await ConstantStore.getItem('newBoat'));
    if (rules !== undefined && rules !== null) {
      this.setState({rules});
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
    let result = {extra_rules: {}};
    result['rules'] = this.state.rules;
    result['extra_rules'] = {};
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
    this.props.navigation.navigate('GuestsShouldBring');
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
    const {rules} = this.state;
    let items = Object.keys(rules);
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - Rules"
            onBack={() => this.props.navigation.navigate('Features')}
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <Label
                title="Select Rules (Tap to toggle between Allowed / Not Allowed)"
                align="left"
                size={14}
              />
              <ScrollView>
                <View style={styles.blockGroup}>
                  {items.map((item, index) => (
                    <View style={[styles.block]} key={index}>
                      <Label title={names[item]} align="left" />
                      <View style={{flexDirection: 'row'}}>
                        {!rules[item] ? (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                rules[item] = !rules[item];
                                this.setState({rules});
                              }}>
                              <Image
                                source={Images.boat_rule_positive_gray}
                                style={styles.image}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Image
                                source={Images.boat_rule_negative}
                                style={styles.image}
                              />
                            </TouchableOpacity>
                          </>
                        ) : (
                          <>
                            <TouchableOpacity>
                              <Image
                                source={Images.boat_rule_positive}
                                style={styles.image}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                rules[item] = !rules[item];
                                this.setState({
                                  rules,
                                });
                              }}>
                              <Image
                                source={Images.boat_rule_negative_gray}
                                style={styles.image}
                              />
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </View>
                  ))}

                  {/* Add Rule Button */}
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <Label title="Add Rule" style={{marginRight: 10}} />
                    <FontAwesome5 name="plus" size={20} color="#000" />
                  </TouchableOpacity>
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
    marginVertical: 20,
  },

  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#F6F6F6',
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(RulesScreen);

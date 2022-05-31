import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  LogBox,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';
import SeperatorLine from '../components/SeparatorLine';
import LoadingOverlay from '../components/LoadingOverlay';

import {ConstantStore} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const names = {
  bachelor: 'Bachelor / Bachelorette Party',
  bass: 'Bass Fishing',
  bow: 'Bow Fishing',
  catfish: 'Catfish Fishing',
  celebrity_fishing: 'Fishing',
  celebrity_watersports: 'Watersports',
  crappie: 'Crappie Fishing',
  cruising: 'Cruising',
  floating: 'Floating',
  foiling: 'Foiling',
  skiing: 'Skiing',
  special_moments: 'Special Moments',
  striper: 'Striper Fishing',
  sunset_cruise: 'Sunset Cruise',
  swimming: 'Swimming',
  trout: 'Trout Fishing',
  tubing: 'Tubing',
  wake_surfing: 'Wake Surfing',
  wakeboarding: 'Wakeboarding',
  walleye: 'Walleye Fishing',
  fishing: 'Fishing',
  leisure: 'Leisure',
  celebrity_requested: 'Pro-athlete',
  watersports: 'Watersports',
};

class ActivitiesDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        fishing: {
          bass: false,
          walleye: false,
          catfish: false,
          bow: false,
          crappie: false,
          trout: false,
          striper: false,
        },
        leisure: {
          tubing: false,
          floating: false,
          sunset_cruise: false,
          bachelor: false,
          swimming: false,
          cruising: false,
          special_moments: false,
        },
        watersports: {
          wake_surfing: false,
          foiling: false,
          wakeboarding: false,
          skiing: false,
        },
        celebrity_requested: {
          celebrity_fishing: false,
          celebrity_watersports: false,
        },
      },
      categories: this.props.route.params.options,
      select: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    const {activities} = JSON.parse(await ConstantStore.getItem('newBoat'));
    if (activities !== undefined && activities !== null) {
      this.setState({data: activities});
    }
  }

  async onSave() {
    let newBoat = JSON.parse(await ConstantStore.getItem('newBoat'));
    newBoat['activities'] = {...this.state.data};
    await ConstantStore.setItem('newBoat', JSON.stringify(newBoat));
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: 'Successful Save!',
    });
  }

  async onContinue() {
    let result = {};
    const {data, categories} = this.state;
    Object.keys(categories).map(category => {
      if (categories[category]) {
        result[category] = true;
        result = {...result, ...data[category]};
      }
    });
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
    this.props.navigation.navigate('Features');
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
    let {data, categories, select} = this.state;
    categories = Object.keys(categories).filter(
      category => categories[category],
    );
    let category = categories[select];
    let items = Object.keys(data[category]);
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - Activities"
            onBack={() =>
              this.props.navigation.navigate('Activities', {
                ...this.props.route.params,
              })
            }
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <Label title="Category" align="left" />
              <CustomInput
                type="select"
                data={categories.map(category => names[category])}
                value={select}
                onChange={select => this.setState({select})}
              />
              <SeperatorLine />
              <ScrollView>
                <View style={styles.blockGroup}>
                  {items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.block,
                        data[category][item] ? styles.blockchecked : {},
                      ]}
                      onPress={() => {
                        data[category][item] = !data[category][item];
                        this.setState({data});
                      }}>
                      <Label title={names[item]} align="left" />
                      {data[category][item] && <View style={styles.checked} />}
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
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
    marginVertical: 10,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivitiesDetailScreen);

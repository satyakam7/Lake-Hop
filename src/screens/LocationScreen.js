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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

import {ConstantStore} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Location = ({thisObj, index, location, onChange, lakes, marinas}) => (
  <View>
    <View style={styles.rowPart}>
      <Label title={`Location ${index + 1}`} />
      <TouchableOpacity onPress={() => onChange(thisObj, index, 'delete')}>
        <AntDesign name="close" size={20} color="#C30101" />
      </TouchableOpacity>
    </View>

    <View style={styles.select}>
      <Label title="Select a lake" />
      <CustomInput
        type="select"
        data={lakes}
        value={location.lake}
        onChange={i => {
          onChange(thisObj, index, 'lake', i);
        }}
      />
    </View>
    <View style={styles.select}>
      <Label title="Select a marina/boat ramp" />
      <CustomInput
        type="select"
        data={marinas[lakes[location.lake]]}
        value={location.marina}
        onChange={i => {
          onChange(thisObj, index, 'marina', i);
        }}
      />
    </View>
  </View>
);

class LocationScreen extends Component {
  constructor() {
    super();
    this.state = {
      locations: [{lake: 0, marina: 0}],
      loading: true,
    };
  }

  onAddAnotherLocation() {
    this.setState({
      locations: [...this.state.locations, {lake: 0, marina: 0}],
    });
  }

  onChange(thisObj, index, key, value) {
    if (key === 'lake' || key === 'marina') {
      let temp = [...thisObj.state.locations];
      temp[index][key] = value;
      thisObj.setState({locations: temp});
    } else if (key === 'delete') {
      let temp = [...thisObj.state.locations];
      temp.splice(index, 1);
      thisObj.setState({locations: temp});
    }
  }

  componentDidMount() {
    this.props.dispatch({type: actionTypes.GET_MARINAS});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getMarinasStatus !== this.props.getMarinasStatus) {
      if (this.props.getMarinasStatus === Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.getMarinasStatus === Status.FAILURE) {
        this.onFailure(this.props.errorMarinaMessage);
      }
    }
    if (
      prevProps.updateBoatLocationsStatus !==
      this.props.updateBoatLocationsStatus
    ) {
      if (this.props.updateBoatLocationsStatus === Status.SUCCESS) {
        this.onBoatSuccess();
      } else if (this.props.updateBoatLocationsStatus === Status.FAILURE) {
        this.onFailure(this.props.errorBoatMessage);
      }
    }
  }

  async onSuccess() {
    let {locations} = JSON.parse(await ConstantStore.getItem('newBoat'));
    this.setState({
      loading: false,
      locations: locations === undefined ? [{lake: 0, marina: 0}] : locations,
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

  onBoatSuccess() {
    this.setState({loading: false});
    this.onSave();
    this.props.navigation.navigate('Name');
  }

  async onSave() {
    let newBoat = JSON.parse(await ConstantStore.getItem('newBoat'));
    const {locations} = this.state;
    newBoat['locations'] = locations;
    await ConstantStore.setItem('newBoat', JSON.stringify(newBoat));
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: 'Successful Save!',
    });
  }

  render() {
    let lakes = Object.keys(this.props.lakes).map(key => this.props.lakes[key]);
    let marianList = {};
    let marinas = {};
    for (let lake_id of Object.keys(this.props.lakes)) {
      marinas[this.props.lakes[lake_id]] = [];
      for (let marina_id of Object.keys(this.props.marinas[lake_id])) {
        marianList[this.props.marinas[lake_id][marina_id]] = marina_id;
        marinas[this.props.lakes[lake_id]].push(
          this.props.marinas[lake_id][marina_id],
        );
      }
    }
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - Location"
            onBack={() => this.props.navigation.navigate('DetailAndPrice')}
          />
          {this.state.loading ? (
            <LoadingOverlay />
          ) : (
            <View style={styles.container}>
              <View style={styles.contentView}>
                <View style={styles.flex}>
                  <ScrollView>
                    {this.state.locations.map((location, index) => (
                      <Location
                        location={location}
                        index={index}
                        key={index}
                        thisObj={this}
                        onChange={this.onChange}
                        lakes={lakes}
                        marinas={marinas}
                      />
                    ))}
                    <View style={styles.separator} />
                    <TouchableOpacity
                      style={styles.addAnotherLocation}
                      onPress={() => this.onAddAnotherLocation()}>
                      <Label
                        title="Add Another Location"
                        style={{marginRight: 10}}
                        size={14}
                      />
                      <FontAwesome5 name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.rowPart}>
                      <Label
                        title="Don't see the lake or marina you are looking for?"
                        size={14}
                      />
                      <Label title="Add a new one" size={14} color="#4DC3CC" />
                    </View>
                  </ScrollView>
                </View>
                <View style={styles.rowPart}>
                  <RoundButton
                    title="Save"
                    theme="dark_sky"
                    style={styles.subBtn}
                    onPress={() => this.onSave()}
                  />
                  <RoundButton
                    title="Continue"
                    theme="main"
                    style={styles.subBtn}
                    arrow="right"
                    onPress={async () => {
                      let result = this.state.locations.map(
                        location =>
                          marianList[
                            marinas[lakes[location.lake]][location.marina]
                          ],
                      );
                      const new_boat_id = await ConstantStore.getItem(
                        'new_boat_id',
                      );
                      this.setState({loading: true});
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_LOCATIONS,
                        payload: {
                          boat_id: new_boat_id,
                          marinas: result,
                        },
                      });
                    }}
                  />
                </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },

  contentView: {
    marginTop: 20,
    width: '90%',
  },
  subBtn: {
    width: '48%',
  },
  separator: {
    marginVertical: 10,
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'grey',
  },

  select: {
    marginVertical: 5,
    alignItems: 'flex-start',
  },

  addAnotherLocation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

function mapStateToProps(state) {
  return {
    getMarinasStatus: state.marina.getMarinasStatus,
    lakes: state.marina.lakes,
    marinas: state.marina.marinas,
    updateBoatLocationsStatus: state.boat.updateBoatLocationsStatus,
    errorMarinaMessage: state.marina.errorMessage,
    errorBoatMessage: state.boat.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);

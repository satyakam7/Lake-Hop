import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';
import LoadingOverlay from '../components/LoadingOverlay';

import {ConstantStore} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class GuestsShouldBringScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {guests_should_bring: '', loading: false};
  }

  async componentDidMount() {
    const {guests_should_bring} = JSON.parse(
      await ConstantStore.getItem('newBoat'),
    );
    this.setState({
      guests_should_bring:
        guests_should_bring === undefined ? '' : guests_should_bring,
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
    this.setState({loading: true});
    const {guests_should_bring} = this.state;
    this.props.dispatch({
      type: actionTypes.UPDATE_BOAT,
      payload: {
        boat_id: await ConstantStore.getItem('new_boat_id'),
        boat: {guests_should_bring},
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
    this.props.navigation.navigate('Pricing');
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
            title="Add Boat - Guests Should Bring"
            onBack={() => this.props.navigation.navigate('Rules')}
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <View style={styles.flex}>
                <Label
                  title="What should guests bring?"
                  align="left"
                  size={14}
                />
                <CustomInput
                  type="textarea"
                  placeholder="If guests need anything in order to enjoy your experience, this is the place to tell them. This list will be emailed to guests when they book your experience to help them prepare."
                  style={{height: 300}}
                  value={this.state.guests_should_bring}
                  onChange={guests_should_bring =>
                    this.setState({guests_should_bring})
                  }
                />
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
    backgroundColor: 'white',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestsShouldBringScreen);

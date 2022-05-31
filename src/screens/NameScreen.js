import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';

import {ConstantStore} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class NameScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      loading: false,
    };
  }

  async componentDidMount() {
    const {title, description} = JSON.parse(
      await ConstantStore.getItem('newBoat'),
    );
    this.setState({
      title: title === undefined ? '' : title,
      description: description === undefined ? '' : description,
    });
  }

  async onSave() {
    let newBoat = JSON.parse(await ConstantStore.getItem('newBoat'));
    const {title, description} = this.state;
    newBoat['title'] = title;
    newBoat['description'] = description;
    await ConstantStore.setItem('newBoat', JSON.stringify(newBoat));
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: 'Successful Save!',
    });
  }

  async onContinue() {
    const {title, description} = this.state;
    if (title.length === 0 || description.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: 'Please fill the gaps.',
      });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch({
      type: actionTypes.UPDATE_BOAT,
      payload: {
        boat_id: await ConstantStore.getItem('new_boat_id'),
        boat: {title, description},
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
    this.props.navigation.navigate('Activities');
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
            title="Add Boat - Name"
            onBack={() => this.props.navigation.navigate('Location')}
          />
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <View style={styles.contentView}>
              <KeyboardAwareScrollView>
                <View>
                  <View style={styles.part}>
                    <Label title="Listing Title" />
                    <CustomInput
                      placeholder="Experience the best boat on the market"
                      onSubmitEditing={() => {
                        this.descriptionInput.focus();
                      }}
                      value={this.state.title}
                      onChange={title => this.setState({title})}
                    />
                  </View>
                  <View style={styles.part}>
                    <Label title="Your description" />
                    <CustomInput
                      type="textarea"
                      placeholder="We will supply everything you need"
                      onRefInput={input => {
                        this.descriptionInput = input;
                      }}
                      value={this.state.description}
                      style={{height: 300}}
                      onChange={description => this.setState({description})}
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

  separator: {
    marginVertical: 20,
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'grey',
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  part: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
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

export default connect(mapStateToProps, mapDispatchToProps)(NameScreen);

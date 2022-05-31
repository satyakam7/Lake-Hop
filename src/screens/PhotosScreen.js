import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  LogBox,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';

import {ConstantStore} from '../functions';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenWidth = Dimensions.get('window').width;

const Avatar = props => {
  const {avatar, onTakePicture} = props;
  return (
    <TouchableOpacity
      style={styles.block}
      onPress={() => {
        ImagePicker.openPicker({
          width: 512,
          height: 512,
          cropping: true,
          includeBase64: true,
        }).then(image => {
          onTakePicture(`data:${image.mime};base64,${image.data}`);
        });
      }}>
      {avatar !== null ? (
        <Image
          source={{uri: avatar}}
          style={{width: screenWidth / 2 - 30, height: 150}}
        />
      ) : (
        <FontAwesome5 name="plus" size={60} color="#707070" />
      )}
    </TouchableOpacity>
  );
};

class PhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover_photo: null,
      preview_photo_1: null,
      preview_photo_2: null,
      misc_photo_1: null,
      misc_photo_2: null,
      misc_photo_3: null,
      misc_photo_4: null,
      misc_photo_5: null,
      misc_photo_6: null,
    };
  }

  async componentDidMount() {
    const {
      cover_photo,
      preview_photo_1,
      preview_photo_2,
      misc_photo_1,
      misc_photo_2,
      misc_photo_3,
      misc_photo_4,
      misc_photo_5,
      misc_photo_6,
    } = JSON.parse(await ConstantStore.getItem('newBoat'));
    this.setState({
      cover_photo: cover_photo === undefined ? null : cover_photo,
      preview_photo_1: preview_photo_1 === undefined ? null : preview_photo_1,
      preview_photo_2: preview_photo_2 === undefined ? null : preview_photo_2,
      misc_photo_1: misc_photo_1 === undefined ? null : misc_photo_1,
      misc_photo_2: misc_photo_2 === undefined ? null : misc_photo_2,
      misc_photo_3: misc_photo_3 === undefined ? null : misc_photo_3,
      misc_photo_4: misc_photo_4 === undefined ? null : misc_photo_4,
      misc_photo_5: misc_photo_5 === undefined ? null : misc_photo_5,
      misc_photo_6: misc_photo_6 === undefined ? null : misc_photo_6,
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
    const {cover_photo, preview_photo_1, preview_photo_2} = this.state;
    if (
      cover_photo === null ||
      preview_photo_1 === null ||
      preview_photo_2 === null
    ) {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: 'Please upload a cover photo and two preview photos',
      });
      return;
    }
    await ConstantStore.setItem('new_boat_id', null);
    await ConstantStore.setItem('newBoat', null);
    this.props.navigation.navigate('Boat', {
      boat_id: await ConstantStore.getItem('new_boat_id'),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updateBoatImageStatus !== this.props.updateBoatImageStatus) {
      if (this.props.updateBoatImageStatus === Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.updateBoatImageStatus === Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onSuccess() {}

  onFailure(errorMessage) {
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
            title="Add Boat - Photos"
            onBack={() => this.props.navigation.navigate('Pricing')}
          />
          <View style={styles.container}>
            <View style={styles.contentView}>
              <ScrollView>
                <Label title="Cover Photo" align="left" />
                <View>
                  <Avatar
                    avatar={this.state.cover_photo}
                    onTakePicture={async data => {
                      this.setState({
                        cover_photo: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'cover_photo',
                        },
                      });
                    }}
                  />
                </View>
                <Label title="Preview Photo" align="left" />
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    },
                  ]}>
                  <Avatar
                    avatar={this.state.preview_photo_1}
                    onTakePicture={async data => {
                      this.setState({
                        preview_photo_1: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'preview_photo_1',
                        },
                      });
                    }}
                  />
                  <Avatar
                    avatar={this.state.preview_photo_2}
                    onTakePicture={async data => {
                      this.setState({
                        preview_photo_2: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'preview_photo_2',
                        },
                      });
                    }}
                  />
                </View>
                <Label title="Miscellaneous Photos" align="left" />
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    },
                  ]}>
                  <Avatar
                    avatar={this.state.misc_photo_1}
                    onTakePicture={async data => {
                      this.setState({
                        misc_photo_1: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'misc_photo_1',
                        },
                      });
                    }}
                  />
                  <Avatar
                    avatar={this.state.misc_photo_2}
                    onTakePicture={async data => {
                      this.setState({
                        misc_photo_2: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'misc_photo_2',
                        },
                      });
                    }}
                  />
                  <Avatar
                    avatar={this.state.misc_photo_3}
                    onTakePicture={async data => {
                      this.setState({
                        misc_photo_3: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'misc_photo_3',
                        },
                      });
                    }}
                  />
                  <Avatar
                    avatar={this.state.misc_photo_4}
                    onTakePicture={async data => {
                      this.setState({
                        misc_photo_4: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'misc_photo_4',
                        },
                      });
                    }}
                  />
                  <Avatar
                    avatar={this.state.misc_photo_5}
                    onTakePicture={async data => {
                      this.setState({
                        misc_photo_5: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'misc_photo_5',
                        },
                      });
                    }}
                  />
                  <Avatar
                    avatar={this.state.misc_photo_6}
                    onTakePicture={async data => {
                      this.setState({
                        misc_photo_6: data,
                      });
                      this.props.dispatch({
                        type: actionTypes.UPDATE_BOAT_IMAGE,
                        payload: {
                          boat_id: await ConstantStore.getItem('new_boat_id'),
                          image: data,
                          image_type: 'misc_photo_6',
                        },
                      });
                    }}
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
    backgroundColor: 'white',
  },

  blockGroup: {
    flex: 1,
    marginVertical: 20,
  },

  block: {
    width: screenWidth / 2 - 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#F6F6F6',
    marginVertical: 5,
    // paddingVertical: 30,
    height: 150,
    borderRadius: 5,
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
    updateBoatImageStatus: state.boat.updateBoatImageStatus,
    errorMessage: state.boat.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosScreen);

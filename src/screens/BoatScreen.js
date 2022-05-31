import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  LogBox,
  Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Toast from 'react-native-toast-message';

import Label from '../components/Label';
import RoundButton from '../components/RoundButton';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';
import Avatar from '../components/Avatar';

import Images from '../theme/Images';
import Fonts from '../theme/Fonts';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

const screenWidth = Dimensions.get('window').width;

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function capitalizeFirstLetter(string) {
  if (string === null) return '';
  if (string.includes('_')) {
    let words = string.split('_');
    return (
      words[0].charAt(0).toUpperCase() +
      words[0].slice(1) +
      ' ' +
      words[1].charAt(0).toUpperCase() +
      words[1].slice(1)
    );
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class BoatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fishing: [],
      leisure: [],
      watersports: [],
      celebrity: [],
      features: [],
      rules: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_BOAT,
      payload: {
        boat_id: this.props.route.params.boat_id,
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getBoatStatus != this.props.getBoatStatus) {
      if (this.props.getBoatStatus == Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.getBoatStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
    if (prevProps.createBookmarkStatus != this.props.createBookmarkStatus) {
      if (this.props.createBookmarkStatus == Status.SUCCESS) {
        this.props.dispatch({
          type: actionTypes.GET_BOAT,
          payload: {
            boat_id: this.props.route.params.boat_id,
          },
        });
      } else if (this.props.createBookmarkStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
    if (prevProps.destroyBookmarkStatus != this.props.destroyBookmarkStatus) {
      if (this.props.destroyBookmarkStatus == Status.SUCCESS) {
        this.props.dispatch({
          type: actionTypes.GET_BOAT,
          payload: {
            boat_id: this.props.route.params.boat_id,
          },
        });
      } else if (this.props.destroyBookmarkStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onSuccess() {
    this.setState({
      loading: false,
    });
    const {fishing, celebrity, leisure, watersports} =
      this.props.boat.sub_activities;
    const {features, rules} = this.props.boat;
    this.props.boat.activities.fishing &&
      this.setState({
        fishing: Object.keys(fishing).filter(key => fishing[key]),
      });
    this.props.boat.activities.celebrity &&
      this.setState({
        celebrity: Object.keys(celebrity).filter(key => celebrity[key]),
      });
    this.props.boat.activities.leisure &&
      this.setState({
        leisure: Object.keys(leisure).filter(key => leisure[key]),
      });
    this.props.boat.activities.watersports &&
      this.setState({
        watersports: Object.keys(watersports).filter(key => watersports[key]),
      });
    this.setState({
      features: Object.keys(features).filter(key => features[key]),
    });
    this.setState({
      rules: Object.keys(rules),
    });
  }
  onFailure(errorMessage) {
    this.setState({
      loading: false,
    });
    Toast.show({
      type: 'error',
      text1: 'Notification',
      text2: errorMessage,
    });
  }
  render() {
    const {switchClientGuest, boat} = this.props;

    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {this.state.loading && <LoadingOverlay />}
          {switchClientGuest === 'client' && boat ? (
            <TopNavBar
              title="View Boat"
              leftButton="back"
              rightButton="like"
              onBack={() => this.props.navigation.goBack()}
              onLike={() => {
                this.setState({
                  loading: true,
                });
                boat.bookmarked
                  ? this.props.dispatch({
                      type: actionTypes.DESTROY_BOOKMARK,
                      payload: {
                        boat_id: boat.id,
                      },
                    })
                  : this.props.dispatch({
                      type: actionTypes.CREATE_BOOKMARK,
                      payload: {
                        boat_id: boat.id,
                      },
                    });
              }}
              like={boat.bookmarked}
            />
          ) : (
            <TopNavBar
              title="View Boat"
              leftButton="back"
              onBack={() => this.props.navigation.navigate('TravelHome')}
            />
          )}
          {!this.state.loading && boat && (
            <View style={styles.container}>
              <ScrollView>
                <View style={{height: 300}}>
                  <SliderBox
                    sliderBoxHeight={300}
                    images={[
                      boat.cover_photo,
                      boat.preview_photo_1,
                      boat.preview_photo_2,
                      ...boat.misc_photos,
                    ]}
                  />
                </View>
                <View style={styles.contentView}>
                  <View style={styles.titleView}>
                    <Label title={boat.title} size={16} align="left" />
                    <Label
                      title={
                        boat.rental === 0
                          ? 'Rideshare - Driver included'
                          : 'Rental - Boat only'
                      }
                      size={14}
                    />
                    <View style={styles.separatorLine} />
                  </View>
                  <View style={styles.titleView}>
                    <Label title="Location" size={16} />
                    {boat.locations.map((location, index) => (
                      <Label
                        key={index}
                        title={
                          location.marina_name +
                          ', ' +
                          location.lake_name +
                          ', ' +
                          location.city +
                          ', ' +
                          location.state
                        }
                        size={14}
                        align="left"
                      />
                    ))}
                    <View style={styles.separatorLine} />
                  </View>
                  <View style={styles.titleView}>
                    <Label title="Overview" size={16} />
                    <Label title={boat.description} size={14} align="left" />
                    <View style={styles.separatorLine} />
                  </View>
                  <View style={styles.titleView}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Label title="Host" size={16} />
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Image
                          source={Images.msg_ico}
                          style={{width: 15, height: 15, marginHorizontal: 10}}
                        />
                        <Label title="Message Host" size={14} />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        alignItems: 'center',
                      }}>
                      <Avatar size={50} src={boat.user.profile_picture_url} />
                      <View
                        style={{
                          marginLeft: 10,
                          marginRight: 20,
                          alignItems: 'flex-start',
                          justifyContent: 'space-around',
                        }}>
                        <Label title={boat.user.full_name} size={14} />
                        <Label
                          title={boat.user.headline}
                          size={12}
                          align="left"
                        />
                      </View>
                    </View>
                    <View style={styles.separatorLine} />
                    <View style={styles.titleView}>
                      <Label title="Boat Details" size={16} />
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginVertical: 5,
                        }}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Year" size={14} />
                          <Label title={boat.year} size={14} />
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Length" size={14} />
                          <Label title={boat.length + ' ft.'} size={14} />
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Capacity" size={14} />
                          <Label
                            title={'Up to ' + boat.guest_count + ' people'}
                            size={14}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginVertical: 5,
                        }}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Make" size={14} />
                          <Label title={boat.make} size={14} />
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Model" size={14} />
                          <Label title={boat.model} size={14} />
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Label title="Boat Type" size={14} />
                          <Label
                            title={capitalizeFirstLetter(boat.boat_type)}
                            size={14}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.separatorLine} />
                    <View style={styles.titleView}>
                      <Label title="Activities" size={16} />
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          padding: 5,
                        }}>
                        {boat.activities.fishing && (
                          <View
                            style={{
                              width: '50%',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={Images.fishing}
                                style={{width: 50, height: 50, marginRight: 10}}
                              />
                              <Label title="Fishing" size={14} />
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                marginVertical: 5,
                              }}>
                              {this.state.fishing.map(fish => (
                                <Label title={fish} size={14} key={fish} />
                              ))}
                            </View>
                          </View>
                        )}
                        {boat.activities.leisure && (
                          <View
                            style={{
                              width: '50%',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={Images.leisure}
                                style={{width: 50, height: 50, marginRight: 10}}
                              />
                              <Label title="Leisure" size={14} />
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                marginVertical: 5,
                              }}>
                              {this.state.leisure.map(leis => (
                                <Label title={leis} size={14} key={leis} />
                              ))}
                            </View>
                          </View>
                        )}
                        {boat.activities.watersports && (
                          <View style={{width: '50%'}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={Images.watersports}
                                style={{width: 50, height: 50, marginRight: 10}}
                              />
                              <Label title="Watersports" size={14} />
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                marginVertical: 5,
                              }}>
                              {this.state.watersports.map(watersport => (
                                <Label
                                  title={watersport}
                                  size={14}
                                  key={watersport}
                                />
                              ))}
                            </View>
                          </View>
                        )}
                        {boat.activities.celebrity && (
                          <View
                            style={{
                              width: '50%',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={Images.pro_athlete}
                                style={{width: 50, height: 50, marginRight: 10}}
                              />
                              <Label title="Celebrity" size={14} />
                            </View>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                marginVertical: 5,
                              }}>
                              {this.state.celebrity.map(cele => (
                                <Label title={cele} size={14} key={cele} />
                              ))}
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.separatorLine} />
                    <View style={styles.titleView}>
                      <Label title="Boat Features" size={16} />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginVertical: 5,
                        }}>
                        {this.state.features.map((feature, index) => (
                          <View
                            key={index}
                            style={{
                              width: screenWidth / 2 - 20,
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}>
                            <Image
                              source={Images.boat_feature_ico}
                              style={{width: 20, height: 20, marginRight: 5}}
                            />
                            <Label title={feature} size={12} />
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={styles.separatorLine} />
                    <View style={styles.titleView}>
                      <Label title="Boat Rules" size={16} />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginVertical: 5,
                        }}>
                        {this.state.rules.map((rule, index) => (
                          <View
                            key={index}
                            style={{
                              width: screenWidth / 2 - 20,
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}>
                            <Image
                              source={
                                boat.rules[rule]
                                  ? Images.boat_rule_positive
                                  : Images.boat_rule_negative
                              }
                              style={{width: 20, height: 20, marginRight: 5}}
                            />
                            <Label title={rule} size={12} />
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={styles.separatorLine} />
                    <View style={[styles.titleView]}>
                      <Label title="Cancellation Policy" />
                      <Label
                        title="All bookings abide by our Lake Hop cancellation policy:"
                        size={12}
                        align="left"
                      />
                      <Label
                        title="• If a guest makes a cancellation before 24 hours of the booking start time, they are granted a full refund for the trip."
                        size={12}
                        align="left"
                      />
                      <Label
                        title="• If a guest makes a cancellation within 24 hours of the booking start time, they are granted a partial refund of 50% for the trip."
                        size={12}
                        align="left"
                      />
                      <Label
                        title="• If a host makes a cancellation, the guest is always given a full refund."
                        size={12}
                        align="left"
                      />
                    </View>
                    <View style={styles.separatorLine} />
                    <View style={[styles.titleView]}>
                      <Label title="Security Deposit" />
                      <Label
                        title="A security deposit hold (not a charge) will be placed on your credit card 48 hours before your booking starts to cover any incidental damage that may occur during your rental. This hold is released 48 hours after the booking is complete, if no claims are made. The security deposit amount for the boat you are booking will be outlined during the check-out process."
                        size={12}
                        align="left"
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          )}

          {!this.state.loading && boat && (
            <View style={styles.footerView}>
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Label
                  title={'from $' + boat?.price + ' '}
                  fontStyle={Fonts.regular}
                />
                <Label
                  title="/ hour"
                  fontStyle={Fonts.regular}
                  color="#6B6B6B"
                />
              </View>
              {switchClientGuest === 'client' && (
                <View style={{width: '90%'}}>
                  <RoundButton
                    title="Check Availability"
                    theme="main"
                    onPress={async () => {
                      this.props.navigation.navigate('BookingFirst');
                    }}
                  />
                </View>
              )}
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
    backgroundColor: 'white',
    flexDirection: 'column',
  },

  contentView: {
    marginVertical: 5,
    marginHorizontal: 20,
  },

  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 5,
  },

  footerView: {
    alignItems: 'center',
    borderTopColor: '#E2E2E2',
    backgroundColor: 'white',
    borderTopWidth: 1,
  },
  titleView: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
});

function mapStateToProps(state) {
  return {
    switchClientGuest: state.global.switchClientGuest,
    getBoatStatus: state.boat.getBoatStatus,
    createBookmarkStatus: state.boat.createBookmarkStatus,
    destroyBookmarkStatus: state.boat.destroyBookmarkStatus,
    boat: state.boat.boat,
    errorMessage: state.boat.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoatScreen);

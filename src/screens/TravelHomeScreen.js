import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  LogBox,
  Dimensions,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RoundSearch from '../components/RoundSearch';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import SeparatorLine from '../components/SeparatorLine';
import TripCard from '../components/TripCard';
import RoundButton from '../components/RoundButton';
import CustomInput from '../components/CustomInput';
import LoadingOverlay from '../components/LoadingOverlay';

import Images from '../theme/Images';
import Fonts from '../theme/Fonts';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenWidth = Dimensions.get('window').width;
class TravelHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      exit: false,
      purchaseGiftCardVisible: false,
      step: 1,
      lake_id: '',
      gift_amount: 0,
      gift_quantity: 1,
      gift_card_number: '',
      gift_expired: '',
      gift_cvc: '',
      gift_card_name: '',
    };
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  // componentWillMount() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // handleBackButtonClick() {
  //   if (this.props.switchClientGuest === 'client') {
  //     // BackHandler.exitApp();
  //   } else if (this.props.switchClientGuest === 'guest')
  //     this.props.navigation.goBack();
  //   return true;
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.getBoatsStatus != this.props.getBoatsStatus) {
      if (this.props.getBoatsStatus == Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.getBoatsStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onSuccess() {
    this.setState({
      loading: false,
    });
  }

  onFailure(errorMessage) {
    this.setState({
      loading: false,
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_BOATS,
      payload: {},
    });
  }

  render() {
    const {switchClientGuest, boats} = this.props;
    let boats1 = boats.slice(0, 2);
    let boats2 = boats.slice(2, 4);
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {this.state.loading && <LoadingOverlay />}
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <ScrollView style={styles.flex}>
                <TopNavBar
                  rightButton="bell"
                  title="Home"
                  bg="transparent"
                  onBell={() => {}}
                />
                <Image style={styles.sceneImage} source={Images.travelScene} />
                <View
                  style={[
                    styles.contentView,
                    switchClientGuest === 'client' &&
                      styles.contentViewMarginBottom,
                  ]}>
                  <RoundSearch
                    onChange={lake_id => {
                      this.setState({lake_id});
                    }}
                    onPress={lake_id => {
                      if (typeof lake_id == 'string')
                        this.props.navigation.navigate('TravelSearch', {
                          lake_id,
                        });
                      else {
                        this.props.navigation.navigate('TravelSearch');
                      }
                    }}
                  />
                  <Label
                    title="What are you interested in?"
                    fontStyle={Fonts.regular}
                  />
                  <View style={styles.cardContainer}>
                    <View style={styles.cardPartial}>
                      <View style={styles.cardView}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('TravelSearch', {
                              watersports: true,
                            })
                          }>
                          <Image
                            style={styles.cardImage}
                            source={Images.watersports_ico}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.cardView}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('TravelSearch', {
                              fishing: true,
                            })
                          }>
                          <Image
                            style={styles.cardImage}
                            source={Images.fishing_ico}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.cardPartial}>
                      <View style={styles.cardView}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('TravelSearch', {
                              leisure: true,
                            })
                          }>
                          <Image
                            style={styles.cardImage}
                            source={Images.leisure_ico}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.lastCardView}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('TravelSearch', {
                              celebrity: true,
                            })
                          }>
                          <Image
                            style={styles.lastCardImage}
                            source={Images.experience_ico}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <SeparatorLine />
                  <View style={styles.flex}>
                    <Label title="Discover your next Lake Hop experience." />

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{flexDirection: 'row'}}>
                      {boats1.map(boat => (
                        <TripCard
                          key={boat.title}
                          type="two"
                          image={boat.cover_photo}
                          avatar={boat.user.profile_picture_url}
                          name={boat.user.first_name}
                          title={boat.title}
                          distance={'3'}
                          position={boat.description}
                          onPress={() =>
                            this.props.navigation.navigate('Boat', {
                              boat_id: boat.id,
                            })
                          }
                        />
                      ))}
                    </ScrollView>
                  </View>
                  <SeparatorLine />
                  <View style={styles.flex}>
                    <Label title="Want to level up on the water?" />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{flexDirection: 'row'}}>
                      {boats2.map(boat => (
                        <TripCard
                          key={boat.title}
                          type="three"
                          image={boat.cover_photo}
                          title={boat.user.first_name}
                          onPress={() =>
                            this.props.navigation.navigate('Boat', {
                              boat_id: boat.id,
                            })
                          }
                        />
                      ))}
                    </ScrollView>
                  </View>
                  <SeparatorLine />
                  <View style={styles.flex}>
                    <Label title="Become a Lake Hop Host" />
                    <Image
                      source={Images.bg_host}
                      style={{
                        width: screenWidth,
                        height: 200,
                        marginVertical: 20,
                      }}
                    />
                    <RoundButton
                      title="Become a Host"
                      theme="orange"
                      style={[styles.flex, {marginHorizontal: 20}]}
                      onPress={() =>
                        this.props.navigation.navigate('HostTab', {
                          stackname: 'ProfileHostStack',
                        })
                      }
                    />
                  </View>
                  <SeparatorLine />
                  <View style={styles.flex}>
                    <Label title="Give the gift of an experience." />
                    <Image
                      source={Images.bg_gift_card}
                      style={{
                        width: screenWidth,
                        height: 200,
                        marginVertical: 20,
                      }}
                    />
                    <RoundButton
                      title="Buy a Gift Card"
                      theme="orange"
                      style={[styles.flex, {marginHorizontal: 20}]}
                      arrow="gift"
                      onPress={() =>
                        this.setState({purchaseGiftCardVisible: true, step: 1})
                      }
                    />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
            <Modal
              isVisible={this.state.purchaseGiftCardVisible}
              swipeDirection="down"
              style={{justifyContent: 'flex-end', margin: 0}}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Label title="Purchase Gift Card" />
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({purchaseGiftCardVisible: false})
                    }
                    style={{
                      padding: 10,
                      borderRadius: 30,
                      backgroundColor: '#ACACAC',
                    }}>
                    <AntDesign name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Image
                    source={Images.purchase_gift_carde}
                    style={{width: 150, height: 90}}
                  />
                  <View
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginLeft: 15,
                      flex: 1,
                    }}>
                    <Label title="Lake Hop Gift Card" />
                    <View style={{height: 20}} />
                    <Label title="$25.00" />
                  </View>
                </View>
                {this.state.step === 1 ? (
                  <>
                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                      <View style={{flex: 2}}>
                        <Label title="Select Amount" align="left" />
                        <CustomInput
                          type="select"
                          data={['$25.00']}
                          value={this.state.gift_amount}
                        />
                      </View>
                      <View style={{width: 20}} />
                      <View style={{flex: 1}}>
                        <Label title="Quantity" align="left" />
                        <CustomInput
                          type="number"
                          onChange={gift_quantity =>
                            this.setState({gift_quantity})
                          }
                          value={this.state.gift_quantity.toString()}
                        />
                      </View>
                    </View>
                    <View>
                      <RoundButton
                        theme="main"
                        title="Continue"
                        arrow="right"
                        onPress={() => this.setState({step: 2})}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={{marginVertical: 10}}>
                      <Label title="Card Information" align="left" />
                      <CustomInput
                        placeholder="Card Number"
                        value={this.state.gift_card_number}
                        onChange={gift_card_number =>
                          this.setState({gift_card_number})
                        }
                      />
                      <View style={{flexDirection: 'row'}}>
                        <CustomInput
                          placeholder="MM/YY"
                          style={styles.flex}
                          value={this.state.gift_expired}
                          onChange={gift_expired =>
                            this.setState({gift_expired})
                          }
                        />
                        <View style={{width: 20}} />
                        <CustomInput
                          placeholder="CVC"
                          style={styles.flex}
                          value={this.state.gift_cvc}
                          onChange={gift_cvc => this.setState({gift_cvc})}
                        />
                      </View>
                    </View>
                    <View style={{marginVertical: 10}}>
                      <Label
                        title="Name on Card"
                        align="left"
                        value={this.state.gift_card_name}
                        onChange={gift_card_name =>
                          this.setState({gift_card_name})
                        }
                      />
                      <CustomInput />
                    </View>
                    <RoundButton
                      theme="main"
                      title="Checkout"
                      arrow="yes"
                      onPress={() => {}}
                    />
                  </>
                )}
              </View>
            </Modal>
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
  },

  contentView: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 250,
  },

  contentViewMarginBottom: {
    marginBottom: 90,
  },

  cardContainer: {
    flex: 1,
    marginVertical: 10,
  },

  cardPartial: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 50,
    elevation: 5,
    shadowColor: '#52006A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImage: {
    width: 112,
    height: 80,
    resizeMode: 'contain',
  },

  lastCardView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 40,
    elevation: 5,
    shadowColor: '#52006A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lastCardImage: {
    width: 132,
    height: 100,
    resizeMode: 'contain',
  },

  sceneImage: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 300,
  },

  bellImage: {
    position: 'absolute',
    right: 10,
    top: 40,
    width: 25,
    height: 25,
  },

  centerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    switchClientGuest: state.global.switchClientGuest,
    getBoatsStatus: state.boat.getBoatsStatus,
    boats: state.boat.boats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelHomeScreen);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  LogBox,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import TripCard from '../components/TripCard';
import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import TopNavBar from '../components/TopNavBar';
import SortArrow from '../components/SortArrow';
import LoadingOverlay from '../components/LoadingOverlay';
import RoundButton from '../components/RoundButton';
import SeparatorLine from '../components/SeparatorLine';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

import Images from '../theme/Images';

import dateFormat from 'dateformat';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const names = {
  'Crappie Fishing': 'crapple',
  'Trout Fishing': 'trout',
  'Striper Fishing': 'striper',
  'Bass Fishing': 'bass',
  'Walleye Fishing': 'walleye',
  'Catfish Fishing': 'catfish',
  'Bow Fishing': 'bow',
  Swimming: 'swimming',
  Cruising: 'curising',
  'Special Moments': 'special_moments',
  Tubing: 'tubing',
  Floating: 'floating',
  'Sunset Cruise': 'sunset_cruise',
  'Bachelor / Bachelorette Party': 'bachelor',
  Wakeboarding: 'wakeboarding',
  Skiing: 'skiing',
  'Wake Surfing': 'water_surfing',
  Foiling: 'foiling',
  Fishing: 'celebrity_fishing',
  Watersports: 'celebrity_watersports',
  'Wake Boat': 'wake_boat',
  'Cabin Cruiser': 'cabin_cruiser',
  'Ski Boat': 'ski_boat',
  'Jet Boat': 'jet_boat',
  'Bow Rider Boat': 'bow_rider_boat',
  'Air Boat': 'air_boat',
  'Performance Boat': 'performance_boat',
  Pontoon: 'pontoon',
  'Fishing Boat': 'fishing_boat',
  'Deck Boat': 'deck_boat',
  'Personal Watercraft': 'personal_watercraft',
  'House Boat': 'house_boat',
  Yacht: 'yacht',
};

class TravelSearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      loading: true,
      filterVisible: false,
      lake_id: null,
      fishing: {
        'Crappie Fishing': false,
        'Trout Fishing': false,
        'Striper Fishing': false,
        'Bass Fishing': false,
        'Walleye Fishing': false,
        'Catfish Fishing': false,
        'Bow Fishing': false,
      },
      fishingAll: false,
      leisure: {
        Swimming: false,
        Cruising: false,
        'Special Moments': false,
        Tubing: false,
        Floating: false,
        'Sunset Cruise': false,
        'Bachelor / Bachelorette Party': false,
      },
      leisureAll: false,
      watersports: {
        Wakeboarding: false,
        Skiing: false,
        'Wake Surfing': false,
        Foiling: false,
      },
      watersportsAll: false,
      proAthlete: {
        Fishing: false,
        Watersports: false,
      },
      proAthleteAll: false,
      boatType: {
        'Wake Boat': false,
        'Cabin Cruiser': false,
        'Ski Boat': false,
        'Jet Boat': false,
        'Bow Rider Boat': false,
        'Air Boat': false,
        'Performance Boat': false,
        Pontoon: false,
        'Fishing Boat': false,
        'Deck Boat': false,
        'Personal Watercraft': false,
        'House Boat': false,
        Yacht: false,
      },
      boatTypeAll: false,
      passengers: null,
      priceMin: null,
      priceMax: null,
      sortVisible: false,
      priceSort: -1,
      ratingSort: -1,
      guestCountSort: -1,
      tripCountSort: -1,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_BOATS,
      payload:
        this.props.route.params === undefined ? {} : this.props.route.params,
    });
  }

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
      lake_id: this.props.lake_id,
      loading: false,
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

  onFilter() {
    this.setState({filterVisible: false});

    const {
      fishing,
      leisure,
      watersports,
      proAthlete,
      boatType,
      priceMin,
      priceMax,
      passengers,
      date,
      lake_id,
      priceSort,
      ratingSort,
      guestCountSort,
      tripCountSort,
    } = this.state;

    let params = {
      date: dateFormat(date, 'ddd mmm dd yyyy'),
    };

    if (priceMin !== null) params['min_price'] = priceMin;
    if (priceMax !== null) params['max_price'] = priceMax;
    if (passengers !== null) params['guest_count'] = passengers;
    if (lake_id !== null) params['lake'] = lake_id;

    Object.keys(fishing).map(item => {
      if (fishing[item]) {
        params[names[item]] = true;
      }
    });
    Object.keys(leisure).map(item => {
      if (leisure[item]) {
        params[names[item]] = true;
      }
    });
    Object.keys(watersports).map(item => {
      if (watersports[item]) {
        params[names[item]] = true;
      }
    });
    Object.keys(proAthlete).map(item => {
      if (proAthlete[item]) {
        params[names[item]] = true;
      }
    });
    let boatTypeStr = '';
    Object.keys(boatType).map(item => (boatTypeStr += names[item] + ','));
    params['boat_type'] = boatTypeStr.slice(0, boatTypeStr.length - 1);

    if (priceSort !== -1)
      params['sort_by.price'] = priceSort === 0 ? 'ASC' : 'DESC';
    if (ratingSort !== -1)
      params['sort_by.rating'] = ratingSort === 0 ? 'ASC' : 'DESC';
    if (guestCountSort !== -1)
      params['sort_by.guest_count'] = guestCountSort === 0 ? 'ASC' : 'DESC';
    if (tripCountSort !== -1)
      params['sort_by.trip_count'] = tripCountSort === 0 ? 'ASC' : 'DESC';

    this.setState({loading: true});
    this.props.dispatch({
      type: actionTypes.GET_BOATS,
      payload: params,
    });
  }

  render() {
    const {switchClientGuest} = this.props;
    const {
      fishing,
      leisure,
      watersports,
      proAthlete,
      boatType,
      fishingAll,
      leisureAll,
      watersportsAll,
      proAthleteAll,
      boatTypeAll,
    } = this.state;
    let fishingItems = Object.keys(fishing);
    let leisureItems = Object.keys(leisure);
    let watersportsItems = Object.keys(watersports);
    let proAthleteItems = Object.keys(proAthlete);
    let boatTypeItems = Object.keys(boatType);
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {this.state.loading && <LoadingOverlay />}
          {this.state.filterVisible && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                zIndex: 10,
                paddingTop: getStatusBarHeight()
              }}>
              <ScrollView>
                <View
                  style={[
                    styles.modalContainer,
                    switchClientGuest === 'client' && {marginBottom: 80},
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Label title="Filters" size={24} />
                    <TouchableOpacity
                      onPress={() => this.setState({filterVisible: false})}
                      style={{
                        padding: 10,
                        borderRadius: 30,
                        backgroundColor: '#ACACAC',
                      }}>
                      <AntDesign name="close" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <SeparatorLine />
                  <View>
                    <Label title="Price Range" align="left" />
                    <View style={{flexDirection: 'row'}}>
                      <CustomInput
                        placeholder="Min"
                        style={styles.flex}
                        type="price"
                        onChange={priceMin => this.setState({priceMin})}
                      />
                      <View style={{width: 20}} />
                      <CustomInput
                        placeholder="Max"
                        style={styles.flex}
                        type="price"
                        onChange={priceMax => this.setState({priceMax})}
                      />
                    </View>
                  </View>
                  <View>
                    <Label title="Activities" align="left" />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={Images.fishing}
                        style={{width: 40, height: 40}}
                      />
                      <Label title="Fishing" style={{marginLeft: 10}} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={[
                          !fishingAll
                            ? styles.modalItem
                            : styles.modalItemSelected,
                        ]}
                        onPress={() => {
                          fishingItems.map(fi => (fishing[fi] = !fishingAll));
                          this.setState({fishing, fishingAll: !fishingAll});
                        }}>
                        <Label title="All" />
                      </TouchableOpacity>
                      {fishingItems.map(item => (
                        <TouchableOpacity
                          style={[
                            !fishing[item]
                              ? styles.modalItem
                              : styles.modalItemSelected,
                          ]}
                          key={item}
                          onPress={() => {
                            fishing[item] = !fishing[item];
                            this.setState({fishing});
                          }}>
                          <Label title={item} />
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={Images.leisure}
                        style={{width: 40, height: 40}}
                      />
                      <Label title="Leisure" style={{marginLeft: 10}} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={[
                          !leisureAll
                            ? styles.modalItem
                            : styles.modalItemSelected,
                        ]}
                        onPress={() => {
                          leisureItems.map(li => (leisure[li] = !leisureAll));
                          this.setState({leisure, leisureAll: !leisureAll});
                        }}>
                        <Label title="All" />
                      </TouchableOpacity>
                      {leisureItems.map(item => (
                        <TouchableOpacity
                          style={[
                            !leisure[item]
                              ? styles.modalItem
                              : styles.modalItemSelected,
                          ]}
                          key={item}
                          onPress={() => {
                            leisure[item] = !leisure[item];
                            this.setState({leisure});
                          }}>
                          <Label title={item} />
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={Images.watersports}
                        style={{width: 40, height: 40}}
                      />
                      <Label title="Watersports" style={{marginLeft: 10}} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={[
                          !watersportsAll
                            ? styles.modalItem
                            : styles.modalItemSelected,
                        ]}
                        onPress={() => {
                          watersportsItems.map(
                            li => (watersports[li] = !watersportsAll),
                          );
                          this.setState({
                            watersports,
                            watersportsAll: !watersportsAll,
                          });
                        }}>
                        <Label title="All" />
                      </TouchableOpacity>
                      {watersportsItems.map(item => (
                        <TouchableOpacity
                          style={[
                            !watersports[item]
                              ? styles.modalItem
                              : styles.modalItemSelected,
                          ]}
                          key={item}
                          onPress={() => {
                            watersports[item] = !watersports[item];
                            this.setState({watersports});
                          }}>
                          <Label title={item} />
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={Images.pro_athlete}
                        style={{width: 40, height: 40}}
                      />
                      <Label title="Pro-athlete" style={{marginLeft: 10}} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={[
                          !proAthleteAll
                            ? styles.modalItem
                            : styles.modalItemSelected,
                        ]}
                        onPress={() => {
                          proAthleteItems.map(
                            li => (proAthlete[li] = !proAthleteAll),
                          );
                          this.setState({
                            proAthlete,
                            proAthleteAll: !proAthleteAll,
                          });
                        }}>
                        <Label title="All" />
                      </TouchableOpacity>
                      {proAthleteItems.map(item => (
                        <TouchableOpacity
                          style={[
                            !proAthlete[item]
                              ? styles.modalItem
                              : styles.modalItemSelected,
                          ]}
                          key={item}
                          onPress={() => {
                            proAthlete[item] = !proAthlete[item];
                            this.setState({proAthlete});
                          }}>
                          <Label title={item} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View>
                    <Label title="Passengers" align="left" />
                    <CustomInput
                      type="number"
                      onChange={passengers => this.setState({passengers})}
                    />
                  </View>
                  <View>
                    <Label title="Type of Boat" align="left" />
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={[
                          !boatTypeAll
                            ? styles.modalItem
                            : styles.modalItemSelected,
                        ]}
                        onPress={() => {
                          boatTypeItems.map(
                            li => (boatType[li] = !boatTypeAll),
                          );
                          this.setState({
                            boatType,
                            boatTypeAll: !boatTypeAll,
                          });
                        }}>
                        <Label title="All" />
                      </TouchableOpacity>
                      {boatTypeItems.map(item => (
                        <TouchableOpacity
                          style={[
                            !boatType[item]
                              ? styles.modalItem
                              : styles.modalItemSelected,
                          ]}
                          key={item}
                          onPress={() => {
                            boatType[item] = !boatType[item];
                            this.setState({boatType});
                          }}>
                          <Label title={item} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <RoundButton
                      theme="main"
                      title="Cancel"
                      style={styles.flex}
                      onPress={() => this.setState({filterVisible: false})}
                    />
                    <View style={{width: 20}} />
                    <RoundButton
                      theme="main"
                      title="Filter"
                      style={styles.flex}
                      onPress={() => this.onFilter()}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
          <Modal isVisible={this.state.sortVisible}>
            <View style={{backgroundColor: '#fff', padding: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Label title="Price" size={20} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.setState({priceSort: 0})}>
                    {this.state.priceSort === 0 ? (
                      <AntDesign name="upcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="upcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                  <View style={{width: 20}} />
                  <TouchableOpacity
                    onPress={() => this.setState({priceSort: 1})}>
                    {this.state.priceSort === 1 ? (
                      <AntDesign name="downcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="downcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Label title="Rating" size={20} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.setState({ratingSort: 0})}>
                    {this.state.ratingSort === 0 ? (
                      <AntDesign name="upcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="upcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                  <View style={{width: 20}} />
                  <TouchableOpacity
                    onPress={() => this.setState({ratingSort: 1})}>
                    {this.state.ratingSort === 1 ? (
                      <AntDesign name="downcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="downcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Label title="Guest Count" size={20} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.setState({guestCountSort: 0})}>
                    {this.state.guestCountSort === 0 ? (
                      <AntDesign name="upcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="upcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                  <View style={{width: 20}} />
                  <TouchableOpacity
                    onPress={() => this.setState({guestCountSort: 1})}>
                    {this.state.guestCountSort === 1 ? (
                      <AntDesign name="downcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="downcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Label title="Number of Trips" size={20} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.setState({tripCountSort: 0})}>
                    {this.state.tripCountSort === 0 ? (
                      <AntDesign name="upcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="upcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                  <View style={{width: 20}} />
                  <TouchableOpacity
                    onPress={() => this.setState({tripCountSort: 1})}>
                    {this.state.tripCountSort === 1 ? (
                      <AntDesign name="downcircleo" size={40} color="#4DC3CC" />
                    ) : (
                      <AntDesign name="downcircleo" size={40} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RoundButton
                  theme="main"
                  style={styles.flex}
                  onPress={() => {
                    this.setState({sortVisible: false});
                  }}
                  title="Cancel"
                />
                <View style={{width: 20}} />
                <RoundButton
                  theme="main"
                  style={styles.flex}
                  onPress={() => {
                    this.setState({sortVisible: false});
                    this.onFilter();
                  }}
                  title="Sort"
                />
              </View>
            </View>
          </Modal>
          <View
            style={[
              styles.container,
              switchClientGuest === 'client' && styles.containerPaddingBotton,
            ]}>
            <TopNavBar
              leftButton="back"
              title="Search"
              onBack={() => this.props.navigation.navigate('TravelHome')}
            />
            <View style={styles.content}>
              <View style={styles.formView}>
                <View style={styles.leftView}>
                  <Label title="Location" />
                  <View style={styles.componentView}>
                    <CustomInput
                      placeholder="Search"
                      type="search"
                      style={[styles.flex, {marginRight: 10}]}
                      onChange={value => {
                        this.props.dispatch({
                          type: actionTypes.SEARCH_LAKES,
                          payload: {term: value},
                        });
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 60,
                      }}>
                      <View style={{backgroundColor: 'white'}}></View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('TravelSearchOnMap', {
                          boats: this.props.boats,
                        })
                      }>
                      <Ionicons
                        name="location-outline"
                        size={40}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.leftView}>
                  <Label title="Date" />
                  <View style={styles.componentView}>
                    <CustomInput
                      type="date"
                      placeholder="Select Date"
                      style={[styles.flex]}
                      value={this.state.date}
                      onChange={date => {
                        this.setState({date});
                        this.onFilter();
                      }}
                    />
                    <View style={styles.space} />
                    <CustomInput
                      placeholder="Filter"
                      type="filter"
                      style={[styles.flex]}
                      onChange={() => this.setState({filterVisible: true})}
                    />
                  </View>
                </View>
              </View>
              <SeparatorLine margin={5} />
              <SortArrow
                onPress={() => {
                  this.setState({sortVisible: true});
                }}
              />
              <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.contentView}>
                {!this.state.loading &&
                  this.props.boats.map(boat => (
                    <TripCard
                      key={boat.id}
                      isLike={boat.bookmarked}
                      image={boat.cover_photo}
                      title={boat.title}
                      hour={boat.price}
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

  containerPaddingBotton: {
    paddingBottom: 70,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  formView: {
    marginVertical: 10,
  },

  contentView: {
    alignItems: 'center',
  },

  leftView: {
    width: '100%',
    alignItems: 'flex-start',
  },
  componentView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map_ico: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },

  space: {width: 20},

  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  modalItem: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#fff',
    marginVertical: 5,
  },

  modalItemSelected: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderColor: '#4DC3CC',
  },
});

function mapStateToProps(state) {
  return {
    switchClientGuest: state.global.switchClientGuest,
    getBoatsStatus: state.boat.getBoatsStatus,
    boats: state.boat.boats,
    lakes: state.lake.lakes,
    lake_id: state.boat.lake_id,
    errorMessage: state.boat.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelSearchScreen);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, SafeAreaView, ScrollView, LogBox} from 'react-native';

import TripCard from '../components/TripCard';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay';

import actionTypes from '../actions/actionTypes';

import {Status} from '../constants';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: actionTypes.GET_BOOKMARKS,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getBookmarksStatus != this.props.getBookmarksStatus) {
      if (this.props.getBookmarksStatus == Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.getBookmarksStatus == Status.FAILURE) {
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

  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {this.state.loading && <LoadingOverlay />}
          <TopNavBar title="Saved" />
          <View style={styles.container}>
            <ScrollView
              style={styles.flex}
              contentContainerStyle={styles.contentView}>
              {!this.state.loading &&
                this.props.bookmarks.map(boat => (
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
    paddingHorizontal: 15,
  },

  contentView: {
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    getBookmarksStatus: state.boat.getBookmarksStatus,
    bookmarks: state.boat.bookmarks,
    errorMessage: state.user.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);

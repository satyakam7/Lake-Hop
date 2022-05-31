import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {connect} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Fonts from '../theme/Fonts';

import {Status} from '../constants';

import actionTypes from '../actions/actionTypes';

class RoundSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchVisible: false, lakes: []};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchLakesStatus != this.props.searchLakesStatus) {
      if (this.props.searchLakesStatus == Status.SUCCESS) {
        this.onSuccess();
      } else if (this.props.searchLakesStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onSuccess() {
    this.setState({lakes: this.props.lakes});
  }
  onFailure(errorMessage) {}

  render() {
    const {searchVisible, lakes} = this.state;
    return (
      <View>
        <View style={[styles.buttonContainer, styles.mainButton]}>
          <TextInput
            style={styles.input}
            placeholder={'Search by lake or state'}
            onChangeText={value => {
              this.props.dispatch({
                type: actionTypes.SEARCH_LAKES,
                payload: {term: value},
              });
            }}
            onFocus={() => {
              this.setState({searchVisible: true});
            }}
          />
          <TouchableOpacity onPress={this.props.onPress}>
            <Ionicons name="search-circle-sharp" size={40} color="#4DC3CC" />
          </TouchableOpacity>
        </View>
        {searchVisible && (
          <View
            style={
              lakes.length
                ? {
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#aaa',
                    borderRadius: 25,
                    marginVertical: 5,
                  }
                : {}
            }>
            {lakes.map(lake => (
              <TouchableOpacity
                key={lake.id}
                onPress={() => {
                  this.setState({searchVisible: false});
                  this.props.onPress(lake.id);
                }}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 18,
                  }}>
                  {lake.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 15,
    paddingRight: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 25,
    height: 52,
    width: '100%',
  },

  mainButton: {
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#707070',
  },

  input: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#393939',
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
});

function mapStateToProps(state) {
  return {
    searchLakesStatus: state.lake.searchLakesStatus,
    lakes: state.lake.lakes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundSearch);

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Label from '../components/Label';

class SortArrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: false, //  down
    };
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.setState({sort: !this.state.sort});
          this.props.onPress();
        }}>
        <Label title="Sort" size={20} style={styles.label} />
        {!this.state.sort ? (
          <FontAwesome5 name="sort-amount-down" size={20} color="#000" />
        ) : (
          <FontAwesome5 name="sort-amount-up" size={20} color="#000" />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  label: {
    marginRight: 10,
  },
});

export default SortArrow;

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  LogBox,
  TouchableOpacity,
} from 'react-native';

import SeparatorLine from '../components/SeparatorLine';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import Avatar from '../components/Avatar';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class MessageScreen extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar title="Messages" />
          <View style={styles.container}>
            <ScrollView
              style={styles.flex}
              contentContainerStyle={styles.contentView}>
              <TouchableOpacity
                style={styles.fullwidth}
                onPress={() => this.props.navigation.navigate('Chat')}>
                <View style={{flexDirection: 'row', margin: 15}}>
                  <View style={{marginRight: 20}}>
                    <Avatar
                      src={
                        'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80'
                      }
                      size={50}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}>
                    <Label title="Jack Doe" size={14} />
                    <Label
                      title="You: It was nice, Thank you!"
                      size={14}
                      color="#6B6B6B"
                    />
                  </View>
                  <View>
                    <Label title="11:00" size={14} color="#949494" />
                  </View>
                </View>
                <SeparatorLine margin={5} />
              </TouchableOpacity>
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
  },

  contentView: {
    alignItems: 'center',
  },

  fullwidth: {
    width: '100%',
  },
});

export default MessageScreen;

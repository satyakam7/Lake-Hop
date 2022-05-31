import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, LogBox} from 'react-native';

import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';
import CustomInput from '../components/CustomInput';
import Avatar from '../components/Avatar';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Request = text => (
  <View
    style={{
      flexDirection: 'row',
      marginHorizontal: 20,
      marginVertical: 5,
      alignItems: 'center',
    }}>
    <Avatar size={30} />
    <View
      style={{
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#6B6B6B',
        borderRadius: 10,
        marginLeft: 10,
      }}>
      <Label title="Hello! How was your experience?" color="white" />
    </View>
  </View>
);
const Response = text => (
  <View
    style={{
      flexDirection: 'row',
      marginHorizontal: 20,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }}>
    <View
      style={{
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#E3E3E3',
        borderRadius: 10,
        marginLeft: 10,
      }}>
      <Label title="It was nice, Thank you!" />
    </View>
  </View>
);

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onMessageChange(message) {
    this.setState({message});
  }

  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            type="profile"
            title={'John Doe'}
            leftButton="back"
            onBack={() => this.props.navigation.navigate('Message')}
          />
          <View style={styles.container}>
            <ScrollView
              style={styles.flex}
              contentContainerStyle={styles.contentView}
              ref={ref => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({animated: true})
              }>
              <Label title="Friday 11:00" style={{marginVertical: 10}} />
              <Request />
              <Response />
              <Request />
              <Response />
              <Request />
              <Response />
              <Request />
              <Response />
              {/* <Request />
              <Response />
              <Request />
              <Response />
              <Request />
              <Response /> */}
            </ScrollView>
            <View
              style={{
                marginBottom: 10,
                marginHorizontal: 10,
              }}>
              <CustomInput
                type="chat"
                onChange={message => this.onMessageChange(message)}
              />
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
  },

  contentView: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },

  fullwidth: {
    width: '100%',
  },
});

export default ChatScreen;
